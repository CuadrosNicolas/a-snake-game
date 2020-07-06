import { Message, MessageCategory } from "../models/message";



/**
 * Defines all possible actions for the envrionment context
 */
export interface MessagingEvent {
  action(message: any): Message;
}

export class ErrorMessageEvent implements MessagingEvent {
  constructor(public message: string) { }
  action(message: any): Message {
    return { category: MessageCategory.ERROR, message: this.message }
  }

}

export class ValidationMessageEvent implements MessagingEvent {
  constructor(public message: string) { }
  action(message: any): Message {
    return { category: MessageCategory.VALIDATION, message: this.message }
  }

}