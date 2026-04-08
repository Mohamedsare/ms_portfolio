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

  let fullName: string;
  let email: string;
  let marketingConsent: boolean;

  try {
    const body = (await request.json()) as Record<string, unknown>;
    fullName = String(body.fullName ?? body.name ?? "").trim();
    email = String(body.email ?? "").trim();
    marketingConsent = Boolean(body.marketingConsent ?? body.consent);
  } catch {
    return NextResponse.json(
      { success: false, message: "Requête invalide." },
      { status: 400 },
    );
  }

  if (!fullName || !email) {
    return NextResponse.json(
      { success: false, message: "Nom et adresse e-mail sont requis." },
      { status: 400 },
    );
  }

  if (!marketingConsent) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Veuillez accepter l’envoi d’e-mails pour vous inscrire à la newsletter.",
      },
      { status: 400 },
    );
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    return NextResponse.json(
      { success: false, message: "Adresse e-mail invalide." },
      { status: 400 },
    );
  }

  const { error } = await sb.from("newsletter_subscribers").insert({
    full_name: fullName,
    email,
    marketing_consent: true,
  });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({
        success: true,
        message:
          "Merci ! Si cette adresse était déjà inscrite, aucune action supplémentaire n’est nécessaire.",
      });
    }
    console.error("[newsletter]", error.message);
    return NextResponse.json(
      { success: false, message: "Erreur lors de l’inscription. Réessayez plus tard." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    message:
      "Merci pour votre inscription ! Vous recevrez bientôt des nouvelles dans votre boîte mail.",
  });
}
