"use client";

import Image from "next/image";
import {
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { copy } from "@/lib/content";
import { calculateKnownSubtotal, demoQuote, formatVnd } from "@/lib/quote";
import { conversationReducer, initialConversationState } from "@/lib/reducer";
import type { CustomerInfo, Locale } from "@/lib/types";

type FieldErrors = Partial<Record<keyof CustomerInfo, "required" | "email">>;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function assetPath(path: string) {
  return `${basePath}${path}`;
}

export const demoCustomer: CustomerInfo = {
  name: "Nguyễn Văn An (demo)",
  phone: "09•• ••• 246",
  email: "an.demo@example.com",
  pickupAddress: "Địa chỉ mẫu, TP.HCM",
  preferredContact: "email",
};

export function StowApp() {
  const [locale, setLocale] = useState<Locale>("vi");
  const [state, dispatch] = useReducer(conversationReducer, initialConversationState);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [input, setInput] = useState("");
  const [notice, setNotice] = useState("");
  const [customer, setCustomer] = useState<CustomerInfo>(demoCustomer);
  const [errors, setErrors] = useState<FieldErrors>({});
  const transcriptRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = copy[locale];
  const guidedActions = ["quoteReview", "customerReview", "submitting", "submitted", "failed"].includes(
    state.step,
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: "smooth" });
  }, [state.messages.length, state.step]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDrawerOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.body.classList.add("drawer-active");
    document.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();
    return () => {
      document.body.classList.remove("drawer-active");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [drawerOpen]);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  function resetConversation() {
    if (timerRef.current) clearTimeout(timerRef.current);
    dispatch({ type: "RESET" });
    setCustomer(demoCustomer);
    setErrors({});
    setNotice("");
    setDrawerOpen(false);
    requestAnimationFrame(() => menuButtonRef.current?.focus());
  }

  function showUnavailable() {
    setNotice(t.composer.unavailable);
  }

  function submitComposer(event: FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || guidedActions) return;
    if (state.step === "requirements") dispatch({ type: "CONFIRM_INVENTORY", text });
    else if (state.step === "recommendation") dispatch({ type: "SELECT_VALET", text });
    else dispatch({ type: "START_QUOTE", text });
    setInput("");
  }

  function validateCustomer(): FieldErrors {
    const next: FieldErrors = {};
    if (!customer.name.trim()) next.name = "required";
    if (!customer.phone.trim()) next.phone = "required";
    if (!customer.email.trim()) next.email = "required";
    else if (!/^\S+@\S+\.\S+$/.test(customer.email)) next.email = "email";
    if (!customer.pickupAddress.trim()) next.pickupAddress = "required";
    return next;
  }

  function submitCustomer(event: FormEvent) {
    event.preventDefault();
    const nextErrors = validateCustomer();
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0] as keyof CustomerInfo | undefined;
    if (firstError) {
      requestAnimationFrame(() => {
        formRef.current?.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
      });
      return;
    }

    dispatch({ type: "SUBMIT" });
    timerRef.current = setTimeout(() => {
      const simulateSubmitError =
        new URLSearchParams(window.location.search).get("submit") === "error";
      dispatch({ type: simulateSubmitError ? "FAIL" : "SUCCESS" });
    }, 700);
  }

  const renderActions = () => {
    if (state.step === "welcome" && state.messages.length > 0) {
      return (
        <button className="quick-action" onClick={() => dispatch({ type: "START_QUOTE" })} type="button">
          {t.actions.startQuote}<ArrowIcon />
        </button>
      );
    }
    if (state.step === "requirements") {
      return (
        <button
          className="quick-action"
          onClick={() => dispatch({ type: "CONFIRM_INVENTORY" })}
          type="button"
        >
          {t.actions.confirmInventory}<ArrowIcon />
        </button>
      );
    }
    if (state.step === "recommendation") {
      return (
        <button className="quick-action" onClick={() => dispatch({ type: "SELECT_VALET" })} type="button">
          {t.actions.selectValet}<ArrowIcon />
        </button>
      );
    }
    return null;
  };

  return (
    <div className="stow-app">
      <header className="topbar">
        <button
          ref={menuButtonRef}
          className="icon-button"
          type="button"
          aria-label={t.header.menu}
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen(true)}
        >
          <MenuIcon />
        </button>
        <div className="brand-lockup" aria-label="STOW by MyStorage">
          <Image src={assetPath("/brand/stow-cube.svg")} alt="" width={30} height={30} priority />
          <strong>STOW</strong>
          <span>BY MYSTORAGE</span>
        </div>
        <button
          className="language-button"
          type="button"
          aria-label={t.header.changeLanguage}
          onClick={() => setLocale(locale === "vi" ? "en" : "vi")}
        >
          <Image
            className="language-flag"
            src={assetPath(locale === "vi" ? "/flags/vn.svg" : "/flags/gb.svg")}
            alt=""
            width={24}
            height={18}
          />
          <span>{locale.toUpperCase()}</span>
        </button>
      </header>

      <main className="chat-layout">
        <div className="prototype-strip" role="note">
          <span className="prototype-dot" aria-hidden="true" />
          {t.header.prototype}
        </div>

        <div
          className="conversation"
          ref={transcriptRef}
          role="log"
          aria-label={t.a11y.conversation}
          aria-live="polite"
        >
          {state.messages.length === 0 ? (
            <section className="welcome" aria-labelledby="welcome-title">
              <Image src={assetPath("/brand/stow-cube.svg")} alt="STOW" width={112} height={112} priority />
              <h1 id="welcome-title">{t.welcome.title}</h1>
              <p>{t.welcome.intro}</p>
              <div className="starter-grid">
                <button type="button" onClick={() => dispatch({ type: "SHOW_INFO", kind: "about" })}>
                  {t.welcome.about}
                </button>
                <button type="button" onClick={() => dispatch({ type: "SHOW_INFO", kind: "services" })}>
                  {t.welcome.services}
                </button>
                <button type="button" onClick={() => dispatch({ type: "START_QUOTE" })}>
                  {t.welcome.quote}
                </button>
              </div>
              <small>{t.welcome.helper}</small>
            </section>
          ) : (
            <section className="message-list">
              <h1 className="sr-only">{t.a11y.conversation}</h1>
              {state.messages.map((item) => (
                <article className={`message ${item.role}`} key={item.id}>
                  <span className="message-author">
                    {item.role === "assistant" ? t.a11y.assistant : t.a11y.customer}
                  </span>
                  <div className="message-content">
                    {item.text ?? (item.contentKey ? t.chat[item.contentKey] : "")}
                  </div>
                </article>
              ))}
              <div className="action-row">{renderActions()}</div>

              {state.step === "quoteReview" && (
                <QuoteCard locale={locale} onContinue={() => dispatch({ type: "SHOW_CONTACT" })} />
              )}
              {["customerReview", "submitting", "submitted", "failed"].includes(state.step) && (
                <QuoteCard locale={locale} compact />
              )}
              {(state.step === "customerReview" || state.step === "submitting") && (
                <ContactForm
                  customer={customer}
                  errors={errors}
                  formRef={formRef}
                  locale={locale}
                  submitting={state.step === "submitting"}
                  onChange={(key, value) => {
                    setCustomer((current) => ({ ...current, [key]: value }));
                    setErrors((current) => ({ ...current, [key]: undefined }));
                  }}
                  onSubmit={submitCustomer}
                />
              )}
              {state.step === "submitted" && <SubmissionStatusCard locale={locale} status="submitted" />}
              {state.step === "failed" && (
                <SubmissionStatusCard locale={locale} status="failed" onRetry={() => dispatch({ type: "RETRY" })} />
              )}
            </section>
          )}
        </div>

        <div className="composer-region">
          <form className="composer" onSubmit={submitComposer}>
            <label className="sr-only" htmlFor="chat-input">{t.composer.placeholder}</label>
            <textarea
              id="chat-input"
              rows={1}
              value={input}
              disabled={guidedActions}
              placeholder={guidedActions ? t.composer.guidedPlaceholder : t.composer.placeholder}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event: ReactKeyboardEvent<HTMLTextAreaElement>) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  event.currentTarget.form?.requestSubmit();
                }
              }}
            />
            <div className="composer-actions">
              <button className="composer-tool" type="button" aria-label={t.composer.attach} onClick={showUnavailable}>
                <PlusIcon />
              </button>
              <button className="voice-button" type="button" aria-label={t.composer.voice} onClick={showUnavailable}>
                <AudioIcon /> <span>{t.composer.voice}</span>
              </button>
              <button className="send-button" type="submit" aria-label={t.composer.send} disabled={!input.trim() || guidedActions}>
                <span>{t.composer.send}</span><SendIcon />
              </button>
            </div>
          </form>
          <div className="composer-note">{t.composer.disclaimer}</div>
          <div className="demo-notice" role="status" aria-label={t.a11y.notice}>{notice}</div>
        </div>
      </main>

      {drawerOpen && (
        <div
          className="drawer-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setDrawerOpen(false);
          }}
        >
          <aside className="drawer" role="dialog" aria-modal="true" aria-label="STOW menu">
            <div className="drawer-header">
              <div className="brand-lockup compact">
                <Image src={assetPath("/brand/stow-cube.svg")} alt="" width={28} height={28} />
                <strong>STOW</strong>
              </div>
              <button
                ref={closeButtonRef}
                className="icon-button"
                type="button"
                aria-label={t.drawer.close}
                onClick={() => {
                  setDrawerOpen(false);
                  menuButtonRef.current?.focus();
                }}
              >
                <CloseIcon />
              </button>
            </div>
            <button className="new-conversation" type="button" onClick={resetConversation}>
              <PlusIcon /> {t.drawer.newConversation}
            </button>
            <div className="drawer-section">
              <h2>{t.drawer.recent}</h2>
              <button className="history-item" type="button" onClick={() => setDrawerOpen(false)}>
                <span className="history-dot" aria-hidden="true" />
                {t.drawer.current}
              </button>
            </div>
            <div className="privacy-card">
              <ShieldIcon />
              <div><strong>{t.drawer.privacyTitle}</strong><p>{t.drawer.privacyBody}</p></div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function QuoteCard({ locale, compact = false, onContinue }: { locale: Locale; compact?: boolean; onContinue?: () => void }) {
  const t = copy[locale];
  const subtotal = calculateKnownSubtotal(demoQuote.charges);
  return (
    <section className={`quote-card ${compact ? "compact" : ""}`} data-testid="quote-card" aria-labelledby="quote-title">
      <div className="card-heading">
        <div><h2 id="quote-title">{t.quote.title}</h2><p>{t.quote.intro}</p></div>
        <span className="demo-badge">{t.quote.demoBadge}</span>
      </div>
      {!compact && (
        <div className="selected-plan">
          <span>{t.quote.selectedService}</span>
          <strong>{t.quote.service}</strong>
          <p>{t.quote.serviceDescription}</p>
          <div><span>{t.quote.volume}</span><span>{t.quote.duration}</span><span>{t.quote.vat}</span></div>
        </div>
      )}
      <div className="charge-list">
        {demoQuote.charges.map((charge) => {
          const amount = charge.amount != null
            ? formatVnd(charge.amount, locale)
            : charge.status === "pending" ? t.quote.pendingAmount : t.quote.excludedAmount;
          return (
            <div className={`charge-row ${charge.status}`} key={charge.id}>
              <div><strong>{t.quote.chargeNames[charge.id]}</strong><small>{t.quote.chargeDescriptions[charge.id]}</small></div>
              <div className="charge-value"><strong>{amount}</strong><span>{t.quote.statusLabels[charge.status]}</span></div>
            </div>
          );
        })}
      </div>
      <div className="subtotal-row">
        <div><strong>{t.quote.knownSubtotal}</strong><small>{t.quote.knownDescription}</small></div>
        <div><strong>{formatVnd(subtotal, locale)}</strong><small>{t.quote.plusDistance}</small></div>
      </div>
      <div className="quote-warning"><InfoIcon /><span>{t.quote.warning}</span></div>
      {onContinue && <button className="primary-button" type="button" onClick={onContinue}>{t.quote.continue}<ArrowIcon /></button>}
    </section>
  );
}

function ContactForm({
  customer,
  errors,
  formRef,
  locale,
  submitting,
  onChange,
  onSubmit,
}: {
  customer: CustomerInfo;
  errors: FieldErrors;
  formRef: React.RefObject<HTMLFormElement | null>;
  locale: Locale;
  submitting: boolean;
  onChange: (key: keyof CustomerInfo, value: string) => void;
  onSubmit: (event: FormEvent) => void;
}) {
  const t = copy[locale];
  const errorText = (key: keyof CustomerInfo) => errors[key] === "email" ? t.customer.invalidEmail : t.customer.required;
  const field = (key: "name" | "phone" | "email" | "pickupAddress", label: string, type = "text") => (
    <div className={`form-field ${key === "pickupAddress" ? "wide" : ""}`}>
      <label htmlFor={`customer-${key}`}>{label}</label>
      <input
        id={`customer-${key}`}
        name={key}
        type={type}
        value={customer[key]}
        disabled={submitting}
        aria-invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `error-${key}` : undefined}
        onChange={(event) => onChange(key, event.target.value)}
      />
      {errors[key] && <span className="field-error" id={`error-${key}`}>{errorText(key)}</span>}
    </div>
  );
  return (
    <form className="contact-card" ref={formRef} noValidate onSubmit={onSubmit}>
      <div className="card-heading"><div><h2>{t.customer.title}</h2><p>{t.customer.demoNote}</p></div><span className="demo-badge">{t.quote.demoBadge}</span></div>
      <div className="form-grid">
        {field("name", t.customer.name)}
        {field("phone", t.customer.phone, "tel")}
        {field("email", t.customer.email, "email")}
        <div className="form-field">
          <label htmlFor="customer-preferredContact">{t.customer.preferred}</label>
          <select
            id="customer-preferredContact"
            name="preferredContact"
            value={customer.preferredContact}
            disabled={submitting}
            onChange={(event) => onChange("preferredContact", event.target.value)}
          >
            <option value="email">{t.customer.contacts.email}</option>
            <option value="phone">{t.customer.contacts.phone}</option>
            <option value="zalo">{t.customer.contacts.zalo}</option>
          </select>
        </div>
        {field("pickupAddress", t.customer.address)}
      </div>
      <p className="privacy-line"><ShieldIcon />{t.customer.privacy}</p>
      <button className="primary-button" type="submit" disabled={submitting}>
        {submitting ? <><SpinnerIcon />{t.customer.submitting}</> : <>{t.customer.submit}<ArrowIcon /></>}
      </button>
    </form>
  );
}

function SubmissionStatusCard({ locale, status, onRetry }: { locale: Locale; status: "submitted" | "failed"; onRetry?: () => void }) {
  const t = copy[locale];
  const success = status === "submitted";
  return (
    <section className={`status-card ${status}`} role="status">
      <div className="status-title"><span className="status-icon">{success ? <CheckIcon /> : <AlertIcon />}</span><div><h2>{success ? t.status.submittedTitle : t.status.failedTitle}</h2>{success && <span>{t.status.submittedBadge}</span>}</div></div>
      <p>{success ? t.status.submittedBody : t.status.failedBody}</p>
      {onRetry && <button className="primary-button" type="button" onClick={onRetry}>{t.status.retry}<ArrowIcon /></button>}
      {success && <div className="next-steps"><h3>{t.status.nextTitle}</h3>{t.status.steps.map(([number, title, body]) => <div className="next-step" key={number}><span>{number}</span><div><strong>{title}</strong><p>{body}</p></div></div>)}</div>}
    </section>
  );
}

function MenuIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" /></svg>; }
function CloseIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18" /></svg>; }
function PlusIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>; }
function SendIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>; }
function AudioIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M2 10v3M6 6v11M10 3v18M14 8v7M18 5v13M22 10v3" /></svg>; }
function ArrowIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" /></svg>; }
function InfoIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>; }
function ShieldIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></svg>; }
function CheckIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m5 12 4 4L19 6" /></svg>; }
function AlertIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 9v4M12 17h.01" /><path d="M10.3 3.7 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0Z" /></svg>; }
function SpinnerIcon() { return <svg className="spinner" aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /></svg>; }
