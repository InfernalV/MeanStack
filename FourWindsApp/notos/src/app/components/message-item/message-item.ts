import { Component, input, output } from '@angular/core';
import { Message } from '../../model/MessageModel';
import { UpperCasePipe} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-message-item',
  standalone: true,
  imports: [UpperCasePipe,  FormsModule],
  templateUrl: './message-item.html',
  styleUrl: './message-item.scss',
})
export class MessageItemComponent {
  message = input.required<Message>();
  MessageToggled = output<Message>();
  MessageUpdated = output<Message>();
  MessageDeleted = output<Message>();

  todoClicked() {
    this.MessageToggled.emit(this.message());
  }

  updateMessage(title: string, text: string, img: string | undefined) {
    const msg = this.message();
    // Only include img if it is a non-empty string
    const updatedMsg = { ...msg, title, text } as any;
    if (img && img.trim() !== '') {
      updatedMsg.img = img;
    } else {
      delete updatedMsg.img;
    }
    this.MessageUpdated.emit(updatedMsg);
  }

  deleteMessage() {
    this.MessageDeleted.emit(this.message());
  }
}