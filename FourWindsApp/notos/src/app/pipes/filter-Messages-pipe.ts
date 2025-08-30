import { Pipe, PipeTransform } from '@angular/core';
import { Message } from '../model/MessageModel';

@Pipe({
  name: 'filterMessages',
  standalone: true,
})
export class FilterMessagesPipe implements PipeTransform {
  transform(Messages: Message[], searchTerm: string): Message[] {
    if (!searchTerm) {
      return Messages;
    }
    const text = searchTerm.toLowerCase();
    return Messages.filter((Message) => {
      return Message.title.toLowerCase().includes(text);
    });
  }
}