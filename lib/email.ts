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

  console.log("---------------------------------------------------");
  console.log(`[Mock Email Service] ID: ${emailId}`);

  if (process.env.NODE_ENV === "production") {
    const [local, domain] = payload.to.split("@");
    const redactedTo = `${local.slice(0, Math.max(1, Math.min(3, local.length - 1)))}***@${domain}`;
    console.log(`To: ${redactedTo}`);
    console.log(`Subject: ${payload.subject}`);
    console.log("Body: [REDACTED IN PRODUCTION]");
  } else {
    console.log(`To: ${payload.to}`);
    console.log(`Subject: ${payload.subject}`);
    console.log(`Body (preview): ${payload.text.substring(0, 100)}...`);
  }

  console.log("---------------------------------------------------");

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
