"use client";
import { useState } from "react";
import { site } from "@/lib/content";
export function ContactForm() {
  const [status, setStatus] = useState("");
  const [draft, setDraft] = useState("");
  return (
    <form
      action={`mailto:${site.email}`}
      method="post"
      encType="text/plain"
      className="contact-form"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const name = String(data.get("name") || "").trim();
        const email = String(data.get("email") || "").trim();
        const message = String(data.get("message") || "").trim();
        if (!name || !message) {
          setStatus("Please enter your name and a message, not just spaces.");
          return;
        }
        const body = `From: ${name} (${email})\n\n${message}`;
        const uri = `mailto:${site.email}?subject=${encodeURIComponent(`Aixion Lab — ${data.get("reason")}`)}&body=${encodeURIComponent(body)}`;
        setDraft(uri);
        setStatus(
          "Your email draft is ready. Review it and press Send in your email app. This website has not sent a message.",
        );
        window.location.href = uri;
      }}
    >
      <h2>Start a conversation.</h2>
      <p>
        Complete the form to prepare an email. Your details stay in your browser
        until you send it from your email app.
      </p>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        autoComplete="name"
        required
        maxLength={100}
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        maxLength={200}
      />
      <label htmlFor="reason">I’m reaching out about</label>
      <select id="reason" name="reason">
        <option>Recruiting / Role</option>
        <option>Technical Collaboration</option>
        <option>Project Discussion</option>
        <option>Research</option>
        <option>Other</option>
      </select>
      <label htmlFor="message">Message</label>
      <textarea
        id="message"
        name="message"
        rows={5}
        required
        maxLength={1800}
      />
      <button className="button" type="submit">
        Prepare email <span aria-hidden="true">↗</span>
      </button>
      <div role="status" className="form-status">
        {status}
        {draft && <a href={draft}>Open the draft again ↗</a>}
      </div>
      <p className="caption">
        No email app? Write directly to{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </form>
  );
}
