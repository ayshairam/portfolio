"use client";

import { Send } from "lucide-react";
import { useId, useState } from "react";

/** No backend needed: composes an email in the visitor's mail app. */
export function ContactComposer({ email }: { email: string }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const nameId = useId();
  const msgId = useId();

  return (
    <form
      className="mt-12 space-y-4 border-t border-white/12 pt-8"
      onSubmit={(e) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Portfolio enquiry${name ? ` from ${name}` : ""}`);
        const body = encodeURIComponent(message);
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      }}
    >
      <div>
        <label htmlFor={nameId} className="t-label text-grey">Your name</label>
        <input
          id={nameId}
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          className="mt-2 w-full border-b border-white/25 bg-transparent py-2 text-paper focus:border-red focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor={msgId} className="t-label text-grey">Message</label>
        <textarea
          id={msgId}
          required
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-2 w-full resize-none border-b border-white/25 bg-transparent py-2 text-paper focus:border-red focus:outline-none"
        />
      </div>
      <button type="submit" className="btn btn-red">
        <Send size={16} aria-hidden="true" /> Send message
      </button>
      <p className="text-xs text-grey">Opens your email app with the message filled in.</p>
    </form>
  );
}
