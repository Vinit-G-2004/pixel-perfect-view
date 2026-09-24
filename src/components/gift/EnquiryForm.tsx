import { useState } from "react";
import { Loader2, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "./Reveal";
import { ENQUIRY_ENDPOINT, whatsappLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const occasions = ["Birthday", "Anniversary", "Festival", "Just Because", "Other"];
const packagesList = ["DeLUSH Pause", "DeLUSH Afterglow", "DeLUSH TopUp", "Not sure yet"];

type Fields = {
  name: string;
  phone: string;
  email: string;
  occasion: string;
  package: string;
  message: string;
};

const empty: Fields = {
  name: "",
  phone: "",
  email: "",
  occasion: "",
  package: "",
  message: "",
};

function validate(v: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name";
  if (!/^[0-9+\-\s()]{10,15}$/.test(v.phone.trim())) e.phone = "Enter a valid phone number";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Enter a valid email";
  if (!v.occasion) e.occasion = "Pick an occasion";
  if (!v.package) e.package = "Pick a package";
  return e;
}

const fieldClass =
  "w-full rounded-xl border border-border bg-card/70 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-gold focus:ring-2 focus:ring-gold/25";

export function EnquiryForm() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sending, setSending] = useState(false);

  const set = (k: keyof Fields, val: string) => {
    setValues((v) => ({ ...v, [k]: val }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      toast.error("Please check the highlighted fields.");
      return;
    }

    const payload = {
      ...values,
      source: "retail",
      submittedAt: new Date().toISOString(),
    };

    if (!ENQUIRY_ENDPOINT) {
      toast.error("Enquiries aren't connected yet — please reach us on WhatsApp.");
      return;
    }

    setSending(true);
    try {
      await fetch(ENQUIRY_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      toast.success("Thank you! Our team will reach out shortly.");
      setValues(empty);
    } catch {
      toast.error("Something went wrong. Please try WhatsApp instead.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="enquire" className="bg-gradient-warm relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="text-center">
          <p className="text-[0.68rem] tracking-[0.34em] text-muted-foreground uppercase">
            Reserve their surprise
          </p>
          <h2 className="mt-4 text-4xl sm:text-5xl">
            Send us an <span className="text-gold-gradient italic">enquiry</span>
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Tell us the occasion and we'll help you pick the perfect gift.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <form
            onSubmit={onSubmit}
            noValidate
            className="glass-panel mt-12 rounded-[1.75rem] p-7 sm:p-9"
          >
            <input type="hidden" name="source" value="retail" />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" error={errors.name}>
                <input
                  className={cn(fieldClass, errors.name && "border-destructive")}
                  value={values.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Your full name"
                />
              </Field>

              <Field label="Phone" error={errors.phone}>
                <input
                  className={cn(fieldClass, errors.phone && "border-destructive")}
                  value={values.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  inputMode="tel"
                  placeholder="+91 98765 43210"
                />
              </Field>

              <Field label="Email" error={errors.email} className="sm:col-span-2">
                <input
                  className={cn(fieldClass, errors.email && "border-destructive")}
                  value={values.email}
                  onChange={(e) => set("email", e.target.value)}
                  inputMode="email"
                  placeholder="you@example.com"
                />
              </Field>

              <Field label="Occasion" error={errors.occasion}>
                <select
                  className={cn(fieldClass, errors.occasion && "border-destructive")}
                  value={values.occasion}
                  onChange={(e) => set("occasion", e.target.value)}
                >
                  <option value="">Select an occasion</option>
                  {occasions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Preferred package" error={errors.package}>
                <select
                  className={cn(fieldClass, errors.package && "border-destructive")}
                  value={values.package}
                  onChange={(e) => set("package", e.target.value)}
                >
                  <option value="">Select a package</option>
                  {packagesList.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Message" className="sm:col-span-2">
                <textarea
                  rows={4}
                  className={cn(fieldClass, "resize-none")}
                  value={values.message}
                  onChange={(e) => set("message", e.target.value)}
                  placeholder="Anything we should know — dates, surprises, preferences."
                />
              </Field>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={sending}
                className="bg-gradient-gold shadow-gold inline-flex flex-1 items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide text-ink transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-70"
              >
                {sending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
                {sending ? "Sending…" : "Send enquiry"}
              </button>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-gold/45 bg-card/60 px-7 py-3.5 text-sm font-medium tracking-wide transition-transform duration-300 hover:-translate-y-0.5 hover:border-gold"
              >
                <MessageCircle className="size-4 text-whatsapp" />
                Chat on WhatsApp
              </a>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-2 block text-[0.68rem] tracking-[0.22em] text-muted-foreground uppercase">
        {label}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
