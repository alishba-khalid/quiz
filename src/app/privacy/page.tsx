import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | QuizKraft",
  description: "QuizKraft privacy policy — how we collect, use, and protect your data. No ads, no third-party data selling.",
  alternates: { canonical: "https://www.quizkraft.tech/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col flex-1 bg-canvas">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
        <h1
          className="text-4xl font-medium text-ink tracking-[-0.02em] mb-10"
          style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
        >
          Privacy Policy
        </h1>

        <div className="space-y-8 text-sm text-muted leading-relaxed">
          {[
            {
              title: "What we collect",
              body: "We collect your email address and name when you create an account. We store the worksheets you generate so you can access them from your dashboard. We collect basic usage data (number of worksheets generated) to enforce plan limits.",
            },
            {
              title: "What we don't collect",
              body: "We do not store your payment card details. Payments are processed by Polar. We do not sell your data to third parties.",
            },
            {
              title: "How we use your data",
              body: "Your email is used to log you in and send transactional emails (password resets, receipts). Your generated worksheets are stored so you can retrieve them from your dashboard. We do not use your worksheets to train AI models.",
            },
            {
              title: "Cookies",
              body: "We use a session cookie to keep you logged in. We do not use advertising or tracking cookies.",
            },
            {
              title: "Data retention",
              body: "Your account and worksheets are stored until you delete your account. You can request deletion at any time by emailing hello@quizkraft.app.",
            },
            {
              title: "Security",
              body: "Passwords are hashed using bcrypt. Data is transmitted over HTTPS. We take reasonable technical measures to protect your data.",
            },
            {
              title: "Contact",
              body: "For any privacy questions, email us at hello@quizkraft.app.",
            },
          ].map((s) => (
            <div key={s.title}>
              <h2 className="font-semibold text-ink mb-2">{s.title}</h2>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
