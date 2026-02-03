import { siteConfig } from "@/lib/config";

interface EmailPayload {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

/**
 * Mock Email Service
 *
 * In a production environment, this would integrate with a provider like Resend, SendGrid, or AWS SES.
 * For now, it logs email attempts to the console for verification.
 */
export async function sendEmail(
  payload: EmailPayload,
): Promise<{ success: boolean; id: string }> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const emailId = `mock_${Date.now()}_${Math.random().toString(36).substring(7)}`;

  if (process.env.NODE_ENV === "production") {
    console.log("---------------------------------------------------");
    console.log(`[Mock Email Service] ID: ${emailId}`);
    console.log(`To: ${payload.to.replace(/(?<=.{3}).(?=.*@)/g, "*")}`); // Simple redaction
    console.log(`Subject: ${payload.subject}`);
    console.log("Body: [REDACTED IN PRODUCTION]");
    console.log("---------------------------------------------------");
  } else {
    console.log("---------------------------------------------------");
    console.log(`[Mock Email Service] ID: ${emailId}`);
    console.log(`To: ${payload.to}`);
    console.log(`Subject: ${payload.subject}`);
    console.log(`Body (preview): ${payload.text.substring(0, 100)}...`);
    console.log("---------------------------------------------------");
  }

  return {
    success: true,
    id: emailId,
  };
}

export async function sendAdminNotification(
  subject: string,
  details: Record<string, any>,
) {
  const adminEmail = siteConfig.contact.email || "admin@evisionit.com";
  const formattedDetails = Object.entries(details)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");

  return sendEmail({
    to: adminEmail,
    subject: `[Admin Notification] ${subject}`,
    text: `New system event:\n\n${formattedDetails}`,
  });
}
