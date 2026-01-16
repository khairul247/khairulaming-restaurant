import { NextRequest, NextResponse } from "next/server";

// Types for booking data
interface BookingData {
  date: string;
  timeSlot: "lunch" | "dinner";
  guests: number;
  name: string;
  phone: string;
  email: string;
}

// POST: Submit a new booking
export async function POST(request: NextRequest) {
  try {
    const booking: BookingData = await request.json();

    // Validate required fields
    if (
      !booking.date ||
      !booking.name ||
      !booking.phone ||
      !booking.email ||
      !booking.guests
    ) {
      return NextResponse.json(
        { error: "Sila lengkapkan semua maklumat yang diperlukan" },
        { status: 400 }
      );
    }

    // Validate guest count
    if (booking.guests < 2 || booking.guests > 8) {
      return NextResponse.json(
        { error: "Bilangan tetamu mesti antara 2 hingga 8 orang" },
        { status: 400 }
      );
    }

    // Validate date (must be in the future)
    const bookingDate = new Date(booking.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (bookingDate <= today) {
      return NextResponse.json(
        { error: "Tarikh tempahan mesti selepas hari ini" },
        { status: 400 }
      );
    }

    // Get Google Sheets webhook URL from environment
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("GOOGLE_SHEETS_WEBHOOK_URL not configured");
      // Still return success but log the error
      // In production, you might want to handle this differently
      return NextResponse.json({
        success: true,
        message: "Tempahan diterima (Demo Mode)",
        booking: {
          ...booking,
          status: "pending",
          timestamp: new Date().toISOString(),
        },
      });
    }

    // Prepare data for Google Sheets
    const sheetData = {
      date: booking.date,
      timeSlot: booking.timeSlot === "lunch" ? "Tengahari" : "Malam",
      guests: booking.guests,
      name: booking.name,
      phone: booking.phone,
      email: booking.email,
      status: "Pending",
      timestamp: new Date().toISOString(),
    };

    // Send to Google Sheets webhook
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sheetData),
    });

    if (!response.ok) {
      throw new Error("Failed to save booking to Google Sheets");
    }

    return NextResponse.json({
      success: true,
      message: "Tempahan berjaya dihantar",
      booking: sheetData,
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Ralat berlaku. Sila cuba lagi." },
      { status: 500 }
    );
  }
}

// GET: Fetch bookings (for admin)
export async function GET(request: NextRequest) {
  try {
    // Check for admin authorization
    const authHeader = request.headers.get("Authorization");
    const adminToken = process.env.ADMIN_TOKEN;

    if (!authHeader || authHeader !== `Bearer ${adminToken}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (!webhookUrl) {
      // Return demo data if webhook not configured
      return NextResponse.json({
        success: true,
        bookings: [
          {
            id: "1",
            date: "2026-01-15",
            timeSlot: "Malam",
            guests: 4,
            name: "Ahmad bin Abdullah",
            phone: "012-345 6789",
            email: "ahmad@contoh.com",
            status: "Confirmed",
            timestamp: "2026-01-13T10:30:00Z",
          },
          {
            id: "2",
            date: "2026-01-16",
            timeSlot: "Tengahari",
            guests: 2,
            name: "Siti Aminah",
            phone: "019-876 5432",
            email: "siti@contoh.com",
            status: "Pending",
            timestamp: "2026-01-13T11:00:00Z",
          },
        ],
      });
    }

    // Fetch from Google Sheets
    const response = await fetch(`${webhookUrl}?action=getAll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      bookings: data.bookings || [],
    });
  } catch (error) {
    console.error("Fetch bookings error:", error);
    return NextResponse.json(
      { error: "Ralat berlaku semasa mengambil data tempahan" },
      { status: 500 }
    );
  }
}

// PATCH: Update booking status
export async function PATCH(request: NextRequest) {
  try {
    // Check for admin authorization
    const authHeader = request.headers.get("Authorization");
    const adminToken = process.env.ADMIN_TOKEN;

    if (!authHeader || authHeader !== `Bearer ${adminToken}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "ID dan status diperlukan" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (!webhookUrl) {
      // Demo mode
      return NextResponse.json({
        success: true,
        message: `Status tempahan dikemaskini kepada ${status} (Demo Mode)`,
      });
    }

    // Update in Google Sheets (using POST since Apps Script doesn't support PATCH)
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "update", id, status }),
    });

    if (!response.ok) {
      throw new Error("Failed to update booking status");
    }

    return NextResponse.json({
      success: true,
      message: "Status tempahan berjaya dikemaskini",
    });
  } catch (error) {
    console.error("Update booking error:", error);
    return NextResponse.json(
      { error: "Ralat berlaku semasa mengemaskini status" },
      { status: 500 }
    );
  }
}
