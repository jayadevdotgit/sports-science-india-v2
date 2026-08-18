import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { KIBO_SYSTEM_PROMPT } from "@/lib/kiboPrompt";
import { retrieveSiteContent } from "@/lib/knowledge/siteContent";

const groq = new OpenAI({
  apiKey: process.env.OPENCODE_API_KEY!,
  baseURL: "https://opencode.ai/zen/v1",
});

export async function GET() {
  return NextResponse.json({
    message: "VIVI AI is online. Send a POST request with a message.",
  });
}

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const relevantContent = retrieveSiteContent(message, 3200);

    const trimmedHistory = history
      .slice(-4)
      .map((m: { role: string; content: string }) => ({
        role: m.role,
        content: (m.content ?? "").slice(0, 400),
      }));

    const completion = await groq.chat.completions.create({
      model: "nemotron-3-ultra-free",
      temperature: 0.6,
      max_tokens: 500,

      messages: [
      {
        role: "system",
        content: KIBO_SYSTEM_PROMPT,
      },

      ...(relevantContent
        ? [
            {
              role: "system",
              content: relevantContent,
            },
          ]
        : []),

      ...trimmedHistory,

      {
        role: "user",
        content: message,
      },
    ],
    });

    const reply =
      completion.choices?.[0]?.message?.content ??
      "Sorry, I couldn't generate a response.";

    return NextResponse.json({
      reply,
    });
  } catch (error: unknown) {
    console.error("Kibo API Error:", error);

    return NextResponse.json(
      {
        reply:
          "Sorry, I'm having trouble connecting right now. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}
