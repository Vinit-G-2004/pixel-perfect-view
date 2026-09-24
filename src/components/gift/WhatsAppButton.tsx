import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site-config";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with De LUSH Resort on WhatsApp"
      className="fixed right-5 bottom-5 z-40 inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-4 text-primary-foreground shadow-lift transition-transform duration-300 hover:-translate-y-1 sm:px-5"
    >
      <MessageCircle className="size-6" />
      <span className="hidden text-sm font-medium tracking-wide sm:inline">WhatsApp us</span>
    </a>
  );
}
