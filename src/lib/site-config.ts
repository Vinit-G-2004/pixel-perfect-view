/**
 * Campaign configuration for De LUSH Resort — "Gifting an Experience".
 * Replace the placeholders below with the live details.
 */

// Digits only, with country code (e.g. "919876543210").
export const WHATSAPP_NUMBER = "910000000000";

export const WHATSAPP_MESSAGE =
  "Hi, I'm interested in a De LUSH gifting package.";

export const whatsappLink = () =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

// Google Apps Script Web App URL that appends the enquiry to a Google Sheet.
export const ENQUIRY_ENDPOINT = "";

export const RESORT = {
  name: "De LUSH Resort",
  address: "Bavdhan, Pune, Maharashtra 411021",
  phoneDisplay: "+91 00000 00000",
  email: "reservations@delushresort.com",
  validity: "Campaign vouchers valid for 6 months from date of purchase.",
};
