import { Injectable } from '@angular/core';
import {ApiService} from '../../api.service';
import {IMessage} from '../../../interfaces/message/message.interface';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends ApiService {
  sendMessage(messageData: IMessage) {
    return this.sendPost(this.getEndpoint('message'), messageData);
  }
}
