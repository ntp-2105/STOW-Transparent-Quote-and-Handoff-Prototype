export type Locale = "vi" | "en";

export type ConversationStep =
  | "welcome"
  | "requirements"
  | "recommendation"
  | "quoteReview"
  | "customerReview"
  | "submitting"
  | "submitted"
  | "failed";

export type SubmissionStatus = "idle" | "submitting" | "submitted" | "failed";

export type ChargeStatus = "confirmed" | "calculated" | "pending" | "excluded";

export interface Charge {
  id: "storage" | "handling" | "distance" | "delivery";
  amount?: number;
  status: ChargeStatus;
}

export interface Quote {
  serviceType: "valet";
  volumeM3: number;
  durationMonths: number;
  currency: "VND";
  vatIncluded: boolean;
  charges: Charge[];
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  pickupAddress: string;
  preferredContact: "email" | "phone" | "zalo";
}

export type ChatMessageKey =
  | "aboutPrompt"
  | "aboutAnswer"
  | "servicesPrompt"
  | "servicesAnswer"
  | "quotePrompt"
  | "askInventory"
  | "inventoryReply"
  | "recommendation"
  | "chooseValet"
  | "quoteReady"
  | "contactIntro"
  | "submitSuccess"
  | "submitFailure";

export interface Message {
  id: string;
  role: "user" | "assistant";
  contentKey?: ChatMessageKey;
  text?: string;
}

export interface ConversationState {
  step: ConversationStep;
  submissionStatus: SubmissionStatus;
  messages: Message[];
}
