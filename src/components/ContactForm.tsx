"use client";

import { useState } from "react";
import { Mail, Clock, MessageSquare, CheckCircle, ArrowRight, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Teacher");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill out all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 1200);
  };

  return (
    <div className="grid md:grid-cols-12 gap-12 items-start">
      {/* Info Column */}
      <div className="md:col-span-5 space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-ink">Contact Information</h2>
          <p className="text-muted text-sm leading-relaxed">
            Whether you're a teacher needing classroom features or a principal looking to purchase seats for your entire school, we're here to help.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center text-accent flex-shrink-0">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-ink text-sm">Direct Support</h3>
              <a
                href="mailto:alishbakhalid766@gmail.com"
                className="text-muted hover:text-accent transition-colors text-sm"
              >
                alishbakhalid766@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center text-accent flex-shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-ink text-sm">Response Time</h3>
              <p className="text-muted text-sm">Usually within 24 hours (including weekends).</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center text-accent flex-shrink-0">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-ink text-sm">Feature Requests</h3>
              <p className="text-muted text-sm">
                Most of our features come directly from teacher requests. Let us know what you need!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Column */}
      <div className="md:col-span-7">
        {isSubmitted ? (
          <div className="bg-surface border border-hairline rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-sm animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-correct-soft text-correct flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h2
                className="text-2xl font-medium text-ink"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Message sent successfully!
              </h2>
              <p className="text-muted text-sm max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out. We have received your message and will get back to you at your email address shortly.
              </p>
            </div>
            <div className="pt-4">
              <button
                onClick={() => setIsSubmitted(false)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline cursor-pointer"
              >
                Send another message <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-surface border border-hairline rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm"
          >
            {error && (
              <div className="p-3.5 bg-wrong-soft border border-wrong/20 text-wrong text-xs rounded-xl font-medium">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="name" className="text-xs font-semibold text-ink uppercase tracking-wide">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                disabled={isSubmitting}
                className="w-full px-4 py-2.5 bg-canvas border border-hairline rounded-xl text-ink placeholder:text-muted/60 text-sm focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-ink uppercase tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@school.edu"
                disabled={isSubmitting}
                className="w-full px-4 py-2.5 bg-canvas border border-hairline rounded-xl text-ink placeholder:text-muted/60 text-sm focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="role" className="text-xs font-semibold text-ink uppercase tracking-wide">
                Your Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={isSubmitting}
                className="w-full px-4 py-2.5 bg-canvas border border-hairline rounded-xl text-ink text-sm focus:outline-none focus:border-accent transition-colors disabled:opacity-50 cursor-pointer"
              >
                <option value="Teacher">Teacher / Instructor</option>
                <option value="Admin">School Administrator</option>
                <option value="Parent">Parent</option>
                <option value="Student">Student</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="message" className="text-xs font-semibold text-ink uppercase tracking-wide">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help you save time in your classroom?"
                disabled={isSubmitting}
                className="w-full px-4 py-2.5 bg-canvas border border-hairline rounded-xl text-ink placeholder:text-muted/60 text-sm focus:outline-none focus:border-accent transition-colors disabled:opacity-50 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors disabled:opacity-50 shadow-sm text-sm cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
