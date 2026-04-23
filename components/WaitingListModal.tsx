"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  joinWaitingList,
  migrateWaitlistModalStorage,
  WAITLIST_MODAL_STORAGE_KEY,
} from "@/lib/waiting-list-api";

type Props = {
  open: boolean;
  onClose: () => void;
  theme: "dark" | "light";
};

export default function WaitingListModal({ open, onClose, theme }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    migrateWaitlistModalStorage();
  }, []);

  useEffect(() => {
    if (!open) return;
    setStatus("idle");
    setMessage(null);
    setEmail("");
  }, [open]);

  const handleDismiss = () => {
    try {
      localStorage.setItem(WAITLIST_MODAL_STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setStatus("error");
      setMessage("Please enter your email.");
      return;
    }
    setStatus("loading");
    setMessage(null);
    const result = await joinWaitingList(trimmed);
    if (result.ok) {
      setStatus("success");
      setMessage("You're on the list! We'll notify you when we launch.");
      try {
        localStorage.setItem(WAITLIST_MODAL_STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
      window.setTimeout(() => onClose(), 2200);
      return;
    }
    setStatus("error");
    setMessage(result.message);
  };

  if (!mounted || !open) return null;

  const modal = (
    <div
      className={`waitlist-modal-root${theme === "light" ? " light-mode" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="waitlist-modal-title"
    >
      <button
        type="button"
        className="waitlist-modal-backdrop"
        aria-label="Close waiting list dialog"
        onClick={handleDismiss}
      />
      <div className="waitlist-modal-panel">
        <button
          type="button"
          onClick={handleDismiss}
          className="waitlist-modal-close"
          aria-label="Close"
        >
          ×
        </button>
        <div className="waitlist-modal-eyebrow">
          <span className="waitlist-modal-eyebrow-dot" aria-hidden />
          Early access
        </div>
        <h2 id="waitlist-modal-title" className="waitlist-modal-title">
          Join the waitlist
        </h2>
        <p className="waitlist-modal-desc">
          Be first to know when GamersArc opens fully. Drop your email — no spam.
        </p>
        <form onSubmit={handleSubmit} className="waitlist-modal-form">
          <label htmlFor="waitlist-email" className="waitlist-sr-only">
            Email address
          </label>
          <input
            id="waitlist-email"
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={status === "loading" || status === "success"}
            className="waitlist-modal-input"
          />
          {message ? (
            <p
              className={`waitlist-modal-message ${status === "success" ? "is-success" : ""} ${status === "error" ? "is-error" : ""}`}
            >
              {message}
            </p>
          ) : null}
          <div className="waitlist-modal-actions">
            <button type="button" onClick={handleDismiss} className="waitlist-btn waitlist-btn-secondary">
              Maybe later
            </button>
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="waitlist-btn waitlist-btn-primary"
            >
              {status === "loading" ? "Joining…" : status === "success" ? "Joined" : "Notify me"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
