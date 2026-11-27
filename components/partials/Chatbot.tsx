"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";

type ChatMessage = {
  id: number;
  from: "bot" | "user";
  text: string;
};

const starterMessages: ChatMessage[] = [
  {
    id: 1,
    from: "bot",
    text: "Hi, I am the store assistant. Ask me about products, orders, or delivery.",
  },
  {
    id: 2,
    from: "user",
    text: "Do you deliver outside Kathmandu?",
  },
  {
    id: 3,
    from: "bot",
    text: "Yes. We deliver across Nepal. Orders above Rs. 2,000 ship free inside the valley.",
  },
];

const quickReplies = ["Track my order", "Return policy", "Talk to a person"];

const cannedReplies: Record<string, string> = {
  "Track my order":
    "Open your account and go to Orders. Paste an order number here if you want me to look it up.",
  "Return policy":
    "Unused items can be returned within 7 days. Keep the original packaging and receipt.",
  "Talk to a person":
    "A teammate is available from 9:00 to 18:00 NPT. Leave your question and we will follow up by email.",
};

export default function Chatbot() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const threadRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;

    inputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const thread = threadRef.current;
    if (!thread) return;
    thread.scrollTop = thread.scrollHeight;
  }, [messages, open]);

  const pushExchange = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const reply =
      cannedReplies[trimmed] ??
      "Thanks. This is a preview chat, so I can only show the layout. A teammate can pick this up from the inbox.";

    setMessages((current) => [
      ...current,
      { id: Date.now(), from: "user", text: trimmed },
      { id: Date.now() + 1, from: "bot", text: reply },
    ]);
    setDraft("");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    pushExchange(draft);
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {open ? (
        <button
          type="button"
          aria-label="Close chat"
          className="pointer-events-auto absolute inset-0 bg-slate-950/30 sm:bg-transparent"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <section
        className={`pointer-events-auto absolute right-4 bottom-24 flex w-[min(24rem,calc(100vw-2rem))] origin-bottom-right flex-col overflow-hidden rounded-2xl border border-teal-100 bg-white shadow-2xl transition duration-200 sm:right-6 ${
          open
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
        role="dialog"
        aria-modal={open}
        aria-labelledby={titleId}
        hidden={!open}
      >
        <header className="flex items-center gap-3 bg-teal-800 px-4 py-3 text-white">
          <span className="grid size-10 place-items-center rounded-full bg-white/15">
            <ChatIcon className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 id={titleId} className="text-base font-semibold tracking-tight">
              Store assistant
            </h2>
            <p className="flex items-center gap-1.5 text-xs text-teal-100">
              <span className="size-2 rounded-full bg-emerald-300" />
              Online now
            </p>
          </div>
          <button
            type="button"
            className="grid size-8 place-items-center rounded-full hover:bg-white/15"
            aria-label="Close chatbot"
            onClick={() => setOpen(false)}
          >
            <CloseIcon className="size-4" />
          </button>
        </header>

        <div
          ref={threadRef}
          className="flex h-80 flex-col gap-3 overflow-y-auto bg-slate-50 px-4 py-4"
        >
          {messages.map((message) => (
            <p
              key={message.id}
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-6 ${
                message.from === "user"
                  ? "self-end rounded-br-md bg-teal-800 text-white"
                  : "self-start rounded-bl-md border border-slate-200 bg-white text-slate-800"
              }`}
            >
              {message.text}
            </p>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 border-t border-slate-100 bg-white px-4 py-3">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              type="button"
              className="rounded-full border border-teal-200 px-3 py-1 text-xs font-medium text-teal-800 hover:bg-teal-50"
              onClick={() => pushExchange(reply)}
            >
              {reply}
            </button>
          ))}
        </div>

        <form
          className="flex items-center gap-2 border-t border-slate-100 px-3 py-3"
          onSubmit={onSubmit}
        >
          <label className="sr-only" htmlFor="chatbot-message">
            Message
          </label>
          <input
            id="chatbot-message"
            ref={inputRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Write a message..."
            className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-teal-700"
          />
          <button
            type="submit"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-teal-800 text-white hover:bg-teal-900 disabled:cursor-not-allowed disabled:bg-teal-900/40"
            aria-label="Send message"
            disabled={!draft.trim()}
          >
            <SendIcon className="size-4" />
          </button>
        </form>
      </section>

      <button
        type="button"
        className="pointer-events-auto absolute right-4 bottom-6 grid size-14 place-items-center rounded-full bg-teal-800 text-white shadow-lg shadow-teal-900/30 hover:bg-teal-900 sm:right-6"
        aria-label={open ? "Close chatbot" : "Open chatbot"}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <CloseIcon className="size-6" /> : <ChatIcon className="size-7" />}
        {open ? null : (
          <span className="absolute top-0.5 right-0.5 size-3 rounded-full border-2 border-white bg-emerald-400" />
        )}
      </button>
    </div>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6.5 17.5 4 20v-12A2.5 2.5 0 0 1 6.5 5.5h11A2.5 2.5 0 0 1 20 8v6a2.5 2.5 0 0 1-2.5 2.5h-11Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M8 8.5h8M8 11.5h5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 12h11M12 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
