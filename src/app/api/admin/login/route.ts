import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: "Kata laluan diperlukan" },
        { status: 400 }
      );
    }

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error("ADMIN_PASSWORD not configured");
      return NextResponse.json(
        { error: "Konfigurasi admin tidak lengkap" },
        { status: 500 }
      );
    }

    if (password !== adminPassword) {
      return NextResponse.json(
        { error: "Kata laluan tidak sah" },
        { status: 401 }
      );
    }

    // Use the static admin token from environment
    const token = process.env.ADMIN_TOKEN;

    if (!token) {
      console.error("ADMIN_TOKEN not configured");
      return NextResponse.json(
        { error: "Konfigurasi admin tidak lengkap" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      token,
      message: "Log masuk berjaya",
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Ralat berlaku. Sila cuba lagi." },
      { status: 500 }
    );
  }
}
