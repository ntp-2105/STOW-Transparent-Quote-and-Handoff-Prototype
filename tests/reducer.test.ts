import { describe, expect, it } from "vitest";
import { conversationReducer, initialConversationState } from "@/lib/reducer";

describe("conversation state machine", () => {
  it("follows the guided quote journey", () => {
    let state = conversationReducer(initialConversationState, { type: "START_QUOTE" });
    expect(state.step).toBe("requirements");
    state = conversationReducer(state, { type: "CONFIRM_INVENTORY" });
    expect(state.step).toBe("recommendation");
    state = conversationReducer(state, { type: "SELECT_VALET" });
    expect(state.step).toBe("quoteReview");
    state = conversationReducer(state, { type: "SHOW_CONTACT" });
    expect(state.step).toBe("customerReview");
    state = conversationReducer(state, { type: "SUBMIT" });
    expect(state).toMatchObject({ step: "submitting", submissionStatus: "submitting" });
    state = conversationReducer(state, { type: "SUCCESS" });
    expect(state).toMatchObject({ step: "submitted", submissionStatus: "submitted" });
  });

  it("supports failure, retry, and reset", () => {
    let state = conversationReducer(
      { ...initialConversationState, step: "submitting", submissionStatus: "submitting" },
      { type: "FAIL" },
    );
    expect(state.step).toBe("failed");
    state = conversationReducer(state, { type: "RETRY" });
    expect(state).toMatchObject({ step: "customerReview", submissionStatus: "idle" });
    state = conversationReducer(state, { type: "RESET" });
    expect(state).toEqual(initialConversationState);
  });
});
