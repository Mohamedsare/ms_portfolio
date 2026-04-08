import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return NextResponse.json(
      { success: false, message: "Configuration Supabase manquante." },
      { status: 503 },
    );
  }

  const sb = createClient(url, key);

  let name: string;
  let email: string;
  let subject: string;
  let message: string;

  const ct = request.headers.get("content-type") || "";

  try {
    if (ct.includes("application/json")) {
      const body = (await request.json()) as Record<string, unknown>;
      name = String(body.name ?? "");
      email = String(body.email ?? "");
      subject = String(body.subject ?? "");
      message = String(body.message ?? "");
    } else {
      const form = await request.formData();
      name = String(form.get("name") ?? "");
      email = String(form.get("email") ?? "");
      subject = String(form.get("subject") ?? "");
      message = String(form.get("message") ?? "");
    }
  } catch {
    return NextResponse.json(
      { success: false, message: "Requête invalide." },
      { status: 400 },
    );
  }

  if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
    return NextResponse.json(
      { success: false, message: "Champs requis manquants." },
      { status: 400 },
    );
  }

  const { error } = await sb.from("contact_messages").insert({
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
  });

  if (error) {
    console.error("[contact]", error.message);
    return NextResponse.json(
      { success: false, message: "Erreur lors de l'enregistrement." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    message:
      "Votre message a bien été envoyé ! Je vous répondrai dans les plus brefs délais.",
  });
}
