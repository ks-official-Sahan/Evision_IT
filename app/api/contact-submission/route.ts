import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db/mongodb";
import { sendEmail, sendAdminNotification } from "@/lib/email";

// Validation schema
const ContactFormPayload = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  company: z.string().optional(),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  locale: z.string().default("en"),
});

type ContactFormPayload = z.infer<typeof ContactFormPayload>;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate request body
    const validatedData = ContactFormPayload.parse(body);

    // Check for honeypot (spam prevention)
    const honeypot = body.website;
    if (honeypot) {
      console.warn("[v0] Spam attempt detected via honeypot field");
      // Return success anyway to not reveal the honeypot
      return NextResponse.json(
        {
          success: true,
          message: "Contact submission received",
        },
        { status: 200 },
      );
    }

    // Connect to MongoDB
    const { db } = await connectToDatabase();
    const collection = db.collection("contactSubmissions");

    // Create submission document
    const submission = {
      ...validatedData,
      submittedAt: new Date(),
      ipAddress: req.headers.get("x-forwarded-for") || "unknown",
      userAgent: req.headers.get("user-agent") || "unknown",
      read: false,
    };

    // Insert into database
    const result = await collection.insertOne(submission);

    // Send emails (best-effort)
    try {
      // Send confirmation email to user
      await sendEmail({
        to: validatedData.email,
        subject: `Received: ${validatedData.projectType || "Inquiry"} - Evision IT`,
        text: `Hi ${validatedData.firstName},\n\nThank you for reaching out to Evision IT. We have received your message regarding "${validatedData.projectType || "your project"}" and will get back to you shortly.\n\nBest regards,\nThe Evision IT Team`,
      });

      // Send notification email to admin
      await sendAdminNotification("New Contact Form Submission", {
        Name: `${validatedData.firstName} ${validatedData.lastName}`,
        Email: validatedData.email,
        Company: validatedData.company || "N/A",
        Project: validatedData.projectType || "General",
        Budget: validatedData.budget || "N/A",
        Message: validatedData.message,
      });
    } catch (emailError) {
      console.error("[v0] Failed to send emails:", emailError);
      // Continue execution - don't fail the submission
    }

    console.log("[v0] Contact submission created:", result.insertedId);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out! We'll be in touch shortly.",
        submissionId: result.insertedId,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[v0] Contact submission error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: (error as any).errors.map((e: any) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit contact form",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
