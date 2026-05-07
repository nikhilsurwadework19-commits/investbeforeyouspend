import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const SYSTEM = `You are a friendly, beginner-focused financial education assistant for InvestBeforeYouSpend. Help users understand investing concepts, savings strategies, and how to reach their purchase goals. You explain things simply. You NEVER give specific financial advice or recommend specific stocks. Always remind users to consult a licensed financial advisor for personal advice. Keep answers under 200 words.`;
export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const response = await client.messages.create({ model:"claude-sonnet-4-5", max_tokens:500, system:SYSTEM, messages });
    return NextResponse.json({ content: response.content[0].type === "text" ? response.content[0].text : "" });
  } catch { return NextResponse.json({ error:"Something went wrong" }, { status:500 }); }
}
