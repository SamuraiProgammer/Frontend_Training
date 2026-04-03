// utils/whatsapp.js
export function openWhatsApp({ phoneNumber, message = "Hello!" }) {
  if (!phoneNumber) {
    console.error("Phone number is required");
    return;
  }

  const encodedMessage = encodeURIComponent(message);
  const url = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodedMessage}&type=phone_number&app_absent=0`;

  window.open(url, "_blank");
}