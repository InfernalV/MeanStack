import { Component, inject, OnInit, signal } from '@angular/core';
import { MessagesService } from '../services/MessagesService';
import { Message } from '../model/MessageModel';
import { catchError } from 'rxjs';
import { MessageItemComponent} from '../components/message-item/message-item';
import { FormsModule } from '@angular/forms';
import { FilterMessagesPipe } from '../pipes/filter-Messages-pipe';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [MessageItemComponent, FormsModule, FilterMessagesPipe],
  templateUrl: './messages-view.html', // fixed case sensitivity
  styleUrl: './messages-view.scss',
})
export class MessagesComponent implements OnInit {
  messagesService = inject(MessagesService);
  messages = signal<Array<Message>>([]);
  searchTerm = signal('');
  loading = signal(true);
  

  ngOnInit(): void {
    this.messagesService
      .getMessages()
      .pipe(
        catchError((err) => {
          console.log(err);
          this.loading.set(false);
          throw err;
        })
      )
      .subscribe((messages) => {
        this.messages.set(messages);
        this.loading.set(false);
      });
  }

  updateMessageItem(messageItem: Message) {
    // Use _id if present, otherwise id
    const id = (messageItem as any)._id || messageItem.id;
    if (!id) return;
    // Always send the id as 'id' for the API
    const updatePayload = { ...messageItem, id };
    this.messagesService.updateMessage(updatePayload).subscribe((updated) => {
      this.messages.update((messages) =>
        messages.map((msg) => ((msg.id === id || (msg as any)._id === id) ? updated : msg))
      );
    });
  }

  onMessageUpdated(messageItem: Message) {
    this.updateMessageItem(messageItem);
  }

  onMessageDeleted(messageItem: Message) {
    // Use _id if present, otherwise id
    const id = (messageItem as any)._id || messageItem.id;
    if (!id) return;
    this.messagesService.deleteMessage(id).subscribe(() => {
      this.messages.update((messages) =>
        messages.filter((msg) => (msg.id !== id && (msg as any)._id !== id))
      );
    });
  }

  createMessage(newMessage: Message) {
    // Remove id if present, to avoid sending it to the API
    const { id, ...msg } = newMessage;
    this.messagesService.createMessage(msg).subscribe((created) => {
      this.messages.update((messages) => [...messages, created]);
    });
  }

  onCreate(title: string, text: string, img: string) {
    const message: any = { title, text };
    if (img && img.trim() !== '') {
      message.img = img;
    }
    this.createMessage(message);
  }
}