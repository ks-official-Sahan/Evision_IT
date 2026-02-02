import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db/mongodb";
import { type QuizSubmission } from "@/lib/db/schemas";

// Validation schema
const QuizSubmissionPayload = z.object({
  step1: z.string().min(1, "Build type is required"),
  step2: z.string().min(1, "Timeline is required"),
  step3: z.string().min(1, "Outcome is required"),
  email: z.string().email("Valid email required").optional(),
  phone: z.string().optional(),
});

type QuizSubmissionPayload = z.infer<typeof QuizSubmissionPayload>;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate request body
    const validatedData = QuizSubmissionPayload.parse(body);

    // Connect to MongoDB
    const { db } = await connectToDatabase();
    const collection = db.collection("quizSubmissions");

    // Create submission document
    const submission: QuizSubmission = {
      step1: validatedData.step1 as QuizSubmission["step1"],
      step2: validatedData.step2 as QuizSubmission["step2"],
      step3: validatedData.step3 as QuizSubmission["step3"],
      email: validatedData.email,
      phone: validatedData.phone,
      submittedAt: new Date(),
      ipAddress: req.headers.get("x-forwarded-for") || "unknown",
      userAgent: req.headers.get("user-agent") || "unknown",
    };

    // Insert into database
    const result = await collection.insertOne(submission);

    // TODO: Send confirmation email
    // TODO: Send notification email to admin

    return NextResponse.json(
      {
        success: true,
        message: "Quiz submission recorded successfully",
        submissionId: result.insertedId,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[v0] Quiz submission error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          // @ts-ignore
          details: error.errors,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit quiz",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
