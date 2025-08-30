import { inject, Injectable } from '@angular/core';
import { Message } from '../model/MessageModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  http = inject(HttpClient);
  private baseUrl = 'http://localhost:5000/api/messages';

  getMessages() {
    return this.http.get<Array<Message>>(this.baseUrl);
  }

  getMessageById(id: string) {
    return this.http.get<Message>(`${this.baseUrl}/${id}`);
  }

  createMessage(message: Message) {
    return this.http.post<Message>(this.baseUrl, message);
  }

  updateMessage(message: Message) {
    return this.http.put<Message>(`${this.baseUrl}/${message.id}`, message);
  }

  deleteMessage(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}