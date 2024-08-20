import { EmailTemplate } from "@/components/email-template";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(req: Request) {
  // const { username, email, subject, content } = await req.json();
  const formData = await req.formData();

  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const content = formData.get("content") as string;
  const file = formData.get("file") as File;

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["parfum.de.la.peche@gmail.com"],
      subject,
      react: EmailTemplate({
        username,
        email,
        content,
      }),
      attachments: [{ filename: file.name, content: buffer }],
    });
    if (error) return NextResponse.json({ error });
    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
