

/**
 * Simple message classes
 */

export enum MessageCategory {
  ERROR,
  VALIDATION
}

export function messageCategoryToSeverity(messageCategory: MessageCategory): "error" | "success" {
  switch (messageCategory) {
    case (MessageCategory.ERROR):
      return "error";
    case (MessageCategory.VALIDATION):
      return "success";
  }
}

export interface Message {
  category: MessageCategory;
  message: String;
}