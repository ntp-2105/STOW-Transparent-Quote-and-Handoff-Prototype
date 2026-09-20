import type { ChatMessageKey, ConversationState, Message } from "./types";

export type ConversationAction =
  | { type: "SHOW_INFO"; kind: "about" | "services" }
  | { type: "START_QUOTE"; text?: string }
  | { type: "CONFIRM_INVENTORY"; text?: string }
  | { type: "SELECT_VALET"; text?: string }
  | { type: "SHOW_CONTACT" }
  | { type: "SUBMIT" }
  | { type: "SUCCESS" }
  | { type: "FAIL" }
  | { type: "RETRY" }
  | { type: "RESET" };

export const initialConversationState: ConversationState = {
  step: "welcome",
  submissionStatus: "idle",
  messages: [],
};

function message(
  messages: Message[],
  role: Message["role"],
  contentKey: ChatMessageKey,
  text?: string,
): Message {
  return {
    id: `${messages.length}-${role}-${contentKey}`,
    role,
    contentKey: text ? undefined : contentKey,
    text,
  };
}

function appendPair(
  state: ConversationState,
  userKey: ChatMessageKey,
  assistantKey: ChatMessageKey,
  text?: string,
): Message[] {
  const messages = [...state.messages];
  messages.push(message(messages, "user", userKey, text));
  messages.push(message(messages, "assistant", assistantKey));
  return messages;
}

export function conversationReducer(
  state: ConversationState,
  action: ConversationAction,
): ConversationState {
  switch (action.type) {
    case "SHOW_INFO": {
      const prompt = action.kind === "about" ? "aboutPrompt" : "servicesPrompt";
      const answer = action.kind === "about" ? "aboutAnswer" : "servicesAnswer";
      return {
        ...state,
        messages: appendPair(state, prompt, answer),
      };
    }
    case "START_QUOTE":
      return {
        ...state,
        step: "requirements",
        messages: appendPair(state, "quotePrompt", "askInventory", action.text),
      };
    case "CONFIRM_INVENTORY":
      return {
        ...state,
        step: "recommendation",
        messages: appendPair(state, "inventoryReply", "recommendation", action.text),
      };
    case "SELECT_VALET":
      return {
        ...state,
        step: "quoteReview",
        messages: appendPair(state, "chooseValet", "quoteReady", action.text),
      };
    case "SHOW_CONTACT":
      return {
        ...state,
        step: "customerReview",
        messages: [...state.messages, message(state.messages, "assistant", "contactIntro")],
      };
    case "SUBMIT":
      return { ...state, step: "submitting", submissionStatus: "submitting" };
    case "SUCCESS":
      return {
        ...state,
        step: "submitted",
        submissionStatus: "submitted",
        messages: [...state.messages, message(state.messages, "assistant", "submitSuccess")],
      };
    case "FAIL":
      return {
        ...state,
        step: "failed",
        submissionStatus: "failed",
        messages: [...state.messages, message(state.messages, "assistant", "submitFailure")],
      };
    case "RETRY":
      return { ...state, step: "customerReview", submissionStatus: "idle" };
    case "RESET":
      return initialConversationState;
    default:
      return state;
  }
}
