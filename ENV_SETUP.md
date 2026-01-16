# Rembayung Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```env
# Google Sheets Webhook URL (from Google Apps Script deployment)
# Leave empty for demo mode with sample data
GOOGLE_SHEETS_WEBHOOK_URL=

# Admin password for the admin console
# Change this to a secure password in production
ADMIN_PASSWORD=rembayung2026

# Admin token (should match the base64 encoded version of ADMIN_PASSWORD)
ADMIN_TOKEN=cmVtYmF5dW5nMjAyNg==
```

## Google Sheets Setup

1. Create a new Google Sheet with columns:

   - Date, Time, Guests, Name, Phone, Email, Status, Timestamp

2. Open Extensions > Apps Script

3. Paste this code:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.date,
    data.timeSlot,
    data.guests,
    data.name,
    data.phone,
    data.email,
    data.status || "Pending",
    new Date().toISOString(),
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ success: true })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];

  const bookings = data.slice(1).map((row, index) => {
    const booking = { id: String(index + 1) };
    headers.forEach((header, i) => {
      booking[header.toLowerCase()] = row[i];
    });
    return booking;
  });

  return ContentService.createTextOutput(
    JSON.stringify({ bookings })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

4. Deploy > New deployment > Web app

   - Execute as: Me
   - Who has access: Anyone

5. Copy the Web app URL and paste it in `GOOGLE_SHEETS_WEBHOOK_URL`
