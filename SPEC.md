# SPEC.md — Transparent Quote & Handoff Demo

## 1. Overview

### 1.1 Purpose

This specification defines a **standalone prototype page** that demonstrates an improved quotation and handoff experience for the MyStorage/STOW customer journey.

The prototype addresses three related UX problems observed during the audit:

1. STOW communicates that it can generate an official quotation directly in chat, but the tested flow ultimately hands the customer off to the business team for a later quotation.
2. The customer cannot determine the expected total cost because some charges are known while other charges are deferred.
3. After submitting the requested customer information, the customer does not receive a clear request status, reference number, or explicit next step.

The page is **not a replacement for STOW** and is not intended to implement a real booking or payment system. It is a focused demonstration of how the quotation and handoff stage could be made more transparent.

### 1.2 Prototype goal

The prototype should let a customer answer, at a glance:

- What service did I select?
- What do I know about the price?
- Which costs are already included?
- Which costs are still pending?
- What is the current known subtotal?
- What information has already been submitted?
- What happens next?
- Who will contact me and through which channel?
- Is this a confirmed booking, a quotation request, or only a pending handoff?

The central design principle is:

> **Never present an incomplete price or an unconfirmed booking as if it were final.**

---

## 2. Scope

### 2.1 In scope

The standalone page contains:

- Selected storage service summary.
- Storage volume and duration.
- Storage price calculation.
- VAT inclusion/exclusion state.
- Known pickup/handling charges.
- Pending distance-based charges.
- Delivery-charge disclosure.
- Known subtotal / estimated total presentation.
- Customer information confirmation.
- Quote/request submission state.
- Handoff status.
- Next-step explanation.
- Responsive desktop/mobile layouts.
- Clear visual distinction between confirmed, calculated, pending, and excluded information.

### 2.2 Out of scope

The prototype must not attempt to implement:

- Real payment processing.
- Real booking creation.
- Real dispatch creation.
- Real quotation generation by MyStorage.
- Real map/geocoding.
- Real distance calculation.
- Real-time storage inventory.
- Real CRM synchronization.
- Real Zalo/email sending.
- Authentication.
- Customer account management.
- Production database persistence.
- Automated communication with MyStorage staff.

If a backend is not available, all values are explicitly prototype/demo data.

---

## 3. Target User

The primary user is a prospective MyStorage customer who has already discussed their storage requirements with STOW and is now at the quotation / booking handoff stage.

Example scenario:

- Service: Valet Storage
- Volume: 3 m³
- Duration: 3 months
- Storage fee: approximately 3,102,000 VND including 8% VAT
- Handling: 195,000 VND/m³
- Pickup handling for 3 m³: 585,000 VND
- Pickup distance charge: pending
- Delivery: quoted later based on actual delivery requirements

The values above are **demonstration data derived from the audited conversation**, not a claim that the prototype is connected to or authorized to represent MyStorage's live pricing system.

---

# 4. Page Concept

## 4.1 Page name

Suggested title:

**Your Storage Quote**

Alternative:

**Quote & Next Steps**

The page should immediately communicate that the user is reviewing a quotation/request rather than completing a confirmed booking.

## 4.2 Recommended URL

For a standalone prototype:

```text
/quote-demo
```

Example:

```text
https://<prototype-domain>/quote-demo
```

The page should be directly accessible without requiring authentication.

## 4.3 Core layout

The page uses a centered content container with two major areas on desktop:

```text
┌─────────────────────────────────────────────────────────────┐
│ Header                                                      │
│ Prototype identity                 Quote & Next Steps       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Your storage plan                 Price summary            │
│  ┌─────────────────────────┐       ┌─────────────────────┐  │
│  │ Valet Storage           │       │ Storage             │  │
│  │ 3 m³ · 3 months         │       │ 3,102,000 VND       │  │
│  │                         │       │                     │  │
│  │ Pickup information      │       │ Pickup handling     │  │
│  │ Customer information    │       │ 585,000 VND         │  │
│  └─────────────────────────┘       │                     │  │
│                                    │ Distance    Pending │  │
│  Request status                    │                     │  │
│  ✓ Information submitted           │ Known subtotal      │  │
│  ● Awaiting quote verification     │ 3,687,000 VND +     │  │
│                                    │ distance fee        │  │
│                                    └─────────────────────┘  │
│                                                             │
│  What happens next?                                         │
│  1. Verify pickup distance                                  │
│  2. Prepare detailed quotation                              │
│  3. Contact customer                                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

On mobile, the two-column layout becomes a single vertical flow:

```text
Header
↓
Storage plan
↓
Price summary
↓
Pending charges
↓
Request status
↓
Customer information
↓
What happens next?
```

---

# 5. Visual Design

## 5.1 General visual direction

The design should feel:

- clean,
- trustworthy,
- lightweight,
- professional,
- customer-service oriented,
- easy to scan.

It should avoid looking like an accounting dashboard or internal admin system.

The customer should feel that they are reviewing a service request, not debugging a pricing formula.

## 5.2 Design language

Recommended characteristics:

- White or very light page background.
- Rounded cards.
- Subtle borders.
- Moderate spacing.
- Clear typography hierarchy.
- One primary accent color.
- Neutral colors for informational content.
- Green/check indicators for completed states.
- Amber/orange indicators for pending information.
- Red reserved for actual errors.

Avoid excessive gradients, animations, decorative illustrations, or large hero sections.

## 5.3 Typography hierarchy

Recommended hierarchy:

```text
Page title
  ↓
Section title
  ↓
Primary value
  ↓
Supporting value
  ↓
Helper text
```

Example:

```text
Your storage quote

Valet Storage
3 m³ · 3 months

3,102,000 VND
Storage fee · VAT included
```

The price should be visually prominent but must not imply that it represents the final payable amount if charges are still pending.

---

# 6. Main Components

## 6.1 Header

The header should contain:

- Prototype/product context.
- Page title.
- Optional small label such as `Quote request` or `Demo`.

Example:

```text
Storage Assistant
Quote & Next Steps
```

The header should remain visually lightweight.

Do not use a fake MyStorage logo unless the prototype is explicitly allowed to reproduce it. If branding is not appropriate, use a neutral prototype identity.

---

## 6.2 Storage Plan Card

Purpose:

Show exactly what the customer selected.

Content:

```text
Valet Storage

3 m³
3 months

Pickup
Customer-provided address
```

The card should make the selected service clearly visible.

If the prototype allows editing the service selection, use an explicit `Edit` action.

---

# 7. Price Summary

## 7.1 Price breakdown

The price section should separate charges by their certainty.

Example:

```text
Price summary

Storage
3,102,000 VND
3 m³ × 3 months · VAT included

Pickup handling
585,000 VND
3 m³ × 195,000 VND

Pickup distance
Pending
20,000 VND/km · exact distance not yet verified

Delivery
Not included
Quoted separately when delivery is requested

────────────────────────

Known subtotal
3,687,000 VND
+ pickup distance fee
```

## 7.2 Critical distinction

The page must **not** label `3,687,000 VND` as:

- Final price
- Total price
- Amount to pay
- Booking price

because the pickup distance fee is still unknown.

Use:

- `Known subtotal`
- `Current estimate`
- `Confirmed charges so far`

instead.

## 7.3 Pricing states

Every charge should belong to one of these states:

### Confirmed

The amount is known.

```text
Storage
3,102,000 VND
✓ Confirmed
```

### Calculated

The amount can be calculated from known inputs.

```text
Pickup handling
585,000 VND
3 m³ × 195,000 VND
```

### Pending

The required input is not yet verified.

```text
Pickup distance
Pending
Distance will be verified before final quotation
```

### Excluded

The charge is intentionally outside the current quote.

```text
Delivery
Not included
Quoted separately at delivery time
```

These states must not be visually interchangeable.

---

# 8. Quote Status

## 8.1 Purpose

The status section solves the ambiguity that occurs after customer information has been submitted.

Recommended state:

```text
Request submitted

✓ Your information has been received

● Awaiting quotation verification

The business team will verify the pickup distance
and prepare the detailed quotation.
```

## 8.2 Status model

The prototype should support the following conceptual states:

```text
DRAFT
  ↓
CUSTOMER_INFO_CONFIRMED
  ↓
QUOTE_PENDING
  ↓
QUOTE_READY
```

Optional future states:

```text
QUOTE_READY
  ↓
CUSTOMER_CONFIRMED
  ↓
BOOKING_CONFIRMED
```

The prototype does not need to implement every state, but its UI should make the distinction clear.

## 8.3 Important terminology

Do not use:

```text
Booking confirmed
```

unless a real booking has actually been confirmed.

For this prototype, the preferred status is:

```text
Quotation request submitted
```

or:

```text
Awaiting final quotation
```

---

# 9. Request Reference

If the real backend provides a request identifier, display it:

```text
Request ID
MS-2026-000123
```

If no real identifier exists, the prototype must not invent an identifier that looks like a production transaction ID.

Instead use:

```text
Demo request
```

or omit the ID entirely.

A fake production-looking booking/reference number could incorrectly imply that the request exists in MyStorage's actual system.

---

# 10. Customer Information Confirmation

Before submitting a quote request, show the information that will be handed off.

Example:

```text
Contact information

Name
Customer Name

Phone
09xx xxx xxx

Email
example@email.com

Pickup address
[customer-provided address]

Preferred contact
Email
```

The prototype should provide:

```text
Edit information
```

and:

```text
Submit quotation request
```

The submit action should require deliberate user interaction.

Do not automatically submit personal information when the page loads.

---

# 11. Next Steps

The page should explain the handoff in plain language.

Recommended component:

```text
What happens next?

1  We verify your pickup distance
   The exact distance and pickup charge are confirmed.

2  We prepare your detailed quotation
   The quotation includes the storage fee and applicable
   pickup charges.

3  We contact you
   The quotation is sent through your selected contact channel.

4  You decide whether to continue
   Receiving a quotation does not mean the booking is confirmed.
```

The last step is important because it preserves customer agency and prevents the UI from implying an automatic booking.

---

# 12. Interaction Behavior

## 12.1 Initial load

When the page loads:

1. Render the selected storage plan.
2. Render all known prices.
3. Mark unresolved charges as `Pending`.
4. Show the known subtotal.
5. Show request/handoff status.
6. Do not perform external API calls unless explicitly configured.

The page should be usable even with JavaScript disabled only if technically practical; otherwise the application should fail gracefully.

## 12.2 Submit quotation request

When the user clicks:

```text
Submit quotation request
```

the prototype should:

1. Validate required customer information.
2. Disable the button while processing.
3. Show a progress state.
4. Display a success state after the simulated request.
5. Update the status to `Awaiting final quotation`.
6. Explain what happens next.

Example:

```text
Quotation request submitted

We have received your information.

Status:
Awaiting final quotation

Next:
Pickup distance verification → Detailed quotation → Customer confirmation
```

## 12.3 Failure state

If a request fails:

```text
We couldn't submit your request.

Your information has not been confirmed as submitted.

Please try again.
```

Actions:

```text
Try again
```

Optionally:

```text
Review information
```

Do not display a fake successful status after an error.

---

# 13. Loading and Empty States

## 13.1 Loading

Use a small inline loading indicator:

```text
Submitting your quotation request...
```

Avoid blocking the entire page with a full-screen spinner.

## 13.2 Pending pricing

Pending prices should use explicit copy:

```text
Pending verification
```

rather than:

```text
0 VND
```

or:

```text
—
```

because those values are ambiguous.

## 13.3 Missing customer information

If required data is missing:

```text
Please provide your phone number before submitting the request.
```

The relevant field should receive focus.

---

# 14. Responsive Design

## 14.1 Desktop

For viewport widths approximately >= 1024px:

- Use a centered container.
- Use two-column content.
- Keep the price summary visible alongside the storage plan.
- Limit line length for readability.

Suggested:

```text
max-width: 1100–1200px
```

## 14.2 Tablet

For approximately 768–1023px:

- Maintain cards.
- Reduce horizontal padding.
- Allow columns to become narrower.
- Collapse to one column if content becomes cramped.

## 14.3 Mobile

For widths below approximately 768px:

- Single-column layout.
- Full-width cards.
- Large touch targets.
- Price summary remains easy to scan.
- No horizontal scrolling.
- Buttons should be full-width where appropriate.

Recommended minimum touch target:

```text
44 × 44 px
```

---

# 15. Accessibility

The prototype should follow basic WCAG-oriented practices.

Requirements:

- Use semantic HTML.
- Every input has a visible label.
- Do not rely only on color to communicate status.
- Provide text labels for `Confirmed`, `Pending`, and `Not included`.
- Ensure sufficient text/background contrast.
- Keyboard navigation must work.
- Focus state must be visible.
- Buttons must have descriptive labels.
- Error messages must be associated with relevant fields.
- Avoid unnecessary animation.
- Respect reduced-motion preferences where animation is introduced.

Example:

Bad:

```text
●
```

Good:

```text
● Pending verification
```

---

# 16. Data Model

A minimal frontend model can be:

```ts
type QuoteStatus =
  | "draft"
  | "submitted"
  | "awaiting_verification"
  | "ready";

type ChargeStatus =
  | "confirmed"
  | "calculated"
  | "pending"
  | "excluded";

interface Charge {
  id: string;
  name: string;
  amount?: number;
  status: ChargeStatus;
  description: string;
}

interface Quote {
  serviceType: "valet";
  volumeM3: number;
  durationMonths: number;
  currency: "VND";
  charges: Charge[];
  vatIncluded: boolean;
  status: QuoteStatus;
}

interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  pickupAddress: string;
  preferredContact: "email" | "phone" | "zalo";
}
```

The model should keep `pending` and `excluded` charges distinct from zero-valued charges.

---

# 17. Calculation Rules

For the demonstration scenario:

### Storage

```text
Storage = 3,102,000 VND
```

This represents approximately:

```text
3,102,000 VND including 8% VAT
```

### Handling

```text
Handling = volume × 195,000 VND
         = 3 × 195,000
         = 585,000 VND
```

### Known subtotal

```text
Known subtotal
= storage + handling
= 3,102,000 + 585,000
= 3,687,000 VND
```

### Distance

```text
Distance charge = actual distance × 20,000 VND/km
```

The actual distance must remain pending unless it is supplied by a trusted backend/source.

Therefore:

```text
Current known amount
= 3,687,000 VND
+ pending distance charge
```

Do not fabricate the distance.

---

# 18. Important Pricing Constraints

The prototype must clearly communicate:

1. Storage price and transportation price are separate.
2. Pickup distance is not known until the actual distance is verified.
3. Delivery is not included in the current known subtotal.
4. Additional conditions may affect transportation pricing.
5. VAT treatment must be explicitly displayed.
6. A known subtotal is not a final payable amount when pending charges remain.
7. The prototype is not authorized to claim that a real booking has been created.

Any pricing data should be treated as demonstration data unless obtained from a live, trusted source.

---

# 19. Error Prevention

The UI should prevent misleading states.

### Never do this

```text
Total
3,687,000 VND
```

when another mandatory charge is pending.

### Prefer

```text
Known subtotal
3,687,000 VND

+ pickup distance fee
Pending verification
```

---

### Never do this

```text
Booking confirmed
```

after merely submitting contact information.

### Prefer

```text
Quotation request submitted
Awaiting final quotation
```

---
---

# 20. Prototype Architecture

A small React/Next.js application is sufficient.

Suggested structure:

```text
app/
└── quote-demo/
    ├── page.tsx
    └── components/
        ├── QuoteHeader.tsx
        ├── StoragePlanCard.tsx
        ├── PriceSummary.tsx
        ├── ChargeRow.tsx
        ├── QuoteStatus.tsx
        ├── CustomerInfoCard.tsx
        ├── NextSteps.tsx
        └── SubmitQuoteButton.tsx
```

Optional:

```text
lib/
└── quote.ts
```

for calculation and demo data.

---

# 21. Backend Strategy

For the challenge prototype, a backend is optional.

## Option A — Frontend-only prototype

Recommended for the 4–8 hour challenge.

Use local mock data:

```ts
const demoQuote = {
  ...
};
```

Submission can simulate a request with a short delay.

Advantages:

- Fast to implement.
- Easy to deploy.
- No external credentials.
- No risk of accidentally creating real bookings.
- Clear demonstration of the UX improvement.

## Option B — Mock API

A small route can simulate:

```text
POST /api/quote-request
```

Response:

```json
{
  "status": "awaiting_verification"
}
```

This is still a prototype and must not be presented as a real MyStorage API.

---

# 22. Security and Privacy

The prototype should minimize use of personal data.

Recommended demo mode:

- Use masked or fictional customer information.
- Do not commit real phone numbers or email addresses.
- Do not log personal information to the browser console.
- Do not store customer data in localStorage unless necessary.
- Do not send customer information to third-party analytics.
- Do not include real customer data in screenshots committed to Git.

If real customer information is used during a local demonstration, remove it before publishing the repository.

---

# 23. Performance

The page should be intentionally lightweight.

Requirements:

- No large image assets unless necessary.
- No unnecessary animation libraries.
- No map SDK.
- No external analytics.
- No unnecessary API requests.
- Initial page should render quickly on a normal desktop/mobile connection.

The prototype is a UX demonstration, so complexity should be kept low.

---

# 24. Design Constraints

## 24.1 Do not rebuild STOW

The prototype should focus on the specific failure point:

```text
Conversation
    ↓
Customer chooses service
    ↓
Customer provides information
    ↓
Quotation / handoff  ← prototype improvement
    ↓
Booking
```

Only the quotation/handoff stage needs to be demonstrated.

## 24.2 Do not invent backend capabilities

The prototype must distinguish:

```text
What the UI can demonstrate
```

from:

```text
What MyStorage's production backend actually supports
```

The prototype must not claim that a real quotation, dispatch request, booking, payment, or contract has been created.

## 24.3 Do not fabricate unresolved values

If the exact transportation distance is unavailable:

```text
Pending verification
```

is preferable to inventing a number.

## 24.4 Preserve customer agency

The interface should not pressure the user into booking.

The customer should be able to understand the quotation before deciding whether to continue.

---

# 25. Success Criteria

The prototype is successful if a user can answer all of these without contacting support:

- What storage service did I select?
- How much storage am I paying for?
- How long is the storage period?
- Is VAT included?
- Which charges are confirmed?
- Which charges are pending?
- What is the current known subtotal?
- Why isn't the price final yet?
- Has my quotation request been submitted?
- Is my booking confirmed?
- What happens next?
- How will I receive the final quotation?

The prototype should make these answers visually obvious within a few seconds of opening the page.

---

# 26. Acceptance Criteria

### Functional

- [ ] Selected service is displayed.
- [ ] Volume and duration are displayed.
- [ ] Storage charge is displayed.
- [ ] VAT status is displayed.
- [ ] Handling charge is calculated correctly.
- [ ] Distance charge is explicitly marked pending.
- [ ] Delivery is explicitly marked excluded/not included.
- [ ] Known subtotal is calculated.
- [ ] Customer information can be reviewed.
- [ ] Customer information can be edited before submission.
- [ ] Submit action has loading, success, and error states.
- [ ] Request status is displayed after submission.
- [ ] Next steps are displayed.

### UX

- [ ] The page does not imply that a booking is confirmed.
- [ ] Pending charges cannot be mistaken for zero charges.
- [ ] The final price is not presented as known when mandatory costs remain unresolved.
- [ ] The customer can understand the handoff without reading implementation details.

### Responsive

- [ ] Desktop layout works.
- [ ] Tablet layout works.
- [ ] Mobile layout works.
- [ ] No horizontal scrolling is required.
- [ ] Touch targets are usable on mobile.

### Accessibility

- [ ] Inputs have labels.
- [ ] Keyboard navigation works.
- [ ] Focus states are visible.
- [ ] Status is communicated using text as well as visual indicators.
- [ ] Error messages are understandable.

### Privacy

- [ ] No real customer information is committed to the repository.
- [ ] No unnecessary third-party tracking is used.
- [ ] No real MyStorage transaction is created.

---

# 27. Recommended Demo Flow

The prototype demonstration should take approximately 1–2 minutes.

### Step 1 — Show the selected service

```text
Valet Storage
3 m³ · 3 months
```

### Step 2 — Show price transparency

Point out:

```text
Storage: 3,102,000 VND
Handling: 585,000 VND
Distance: Pending
```

Then:

```text
Known subtotal: 3,687,000 VND + distance fee
```

### Step 3 — Show the status

```text
Quotation request submitted
Awaiting final quotation
```

### Step 4 — Explain the handoff

```text
Distance verification
        ↓
Detailed quotation
        ↓
Customer confirmation
```

### Step 5 — Explain the improvement

The prototype makes the uncertainty explicit instead of making the customer wait without knowing:

- what has been confirmed,
- what remains unknown,
- whether their request was actually submitted,
- and what happens next.

---

# 28. Relationship to the Audit Finding

This prototype directly addresses the audit findings around:

### Finding: Quotation capability mismatch

The UI makes the actual state explicit:

```text
Quotation request submitted
Awaiting final quotation
```

rather than suggesting that a final quotation already exists.

### Finding: Unclear total cost

The UI separates:

```text
Confirmed
Calculated
Pending
Excluded
```

charges.

### Finding: Ambiguous handoff status

The UI provides:

```text
Current status
Next step
Expected action
Contact channel
```

instead of ending with a generic statement that the business team has received the information.

---

# 29. Non-goals for the Challenge

To keep the implementation within the intended challenge scope, do not spend significant time on:

- authentication,
- account systems,
- production database design,
- real payment gateways,
- real logistics integrations,
- complex animations,
- pixel-perfect recreation of MyStorage,
- full STOW conversation UI,
- complete booking workflows,
- load testing,
- production-grade infrastructure.

The value of this prototype is the **interaction and information design**, not backend completeness.

---

# 30. Final Product Definition

The deliverable is a small, standalone web page that demonstrates:

> **A transparent quotation and handoff experience for a storage customer after the AI assistant has collected the customer's requirements and contact information.**

It should make the customer's financial and operational state explicit:

```text
WHAT I CHOSE
     ↓
WHAT I KNOW ABOUT THE PRICE
     ↓
WHAT IS STILL PENDING
     ↓
WHAT HAS BEEN SUBMITTED
     ↓
WHAT HAPPENS NEXT
```

The prototype should remain intentionally separate from MyStorage's production systems unless an official integration is explicitly provided.
