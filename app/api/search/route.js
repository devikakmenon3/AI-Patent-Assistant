import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function POST(req) { 
  try {
    const { query } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are a Patent and Intellectual Property assistant. 
    A user is asking about: ${query}. 
    Please provide professional insights regarding patentability, similar IP concepts, and next steps for an inventor.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ result: text });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch AI response" }, { status: 500 });
  }
}
