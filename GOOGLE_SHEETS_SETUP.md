# Setting Up Google Sheets Form Submission

Follow these steps to connect your contact form to a Google Spreadsheet.

## Step 1: Create a Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "Signal 87 Applications"
4. In the first row, add these column headers:
   - `Timestamp`
   - `Name`
   - `Email`
   - `Role`
   - `Introduction`
   - `Portfolio`

## Step 2: Create Google Apps Script

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete any code in the script editor
3. Paste the following code:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the JSON data from the request
    var data = JSON.parse(e.postData.contents);
    
    // Create a new row with the data
    var row = [
      data.timestamp || new Date(),
      data.name || '',
      data.email || '',
      data.role || '',
      data.introduction || '',
      data.portfolio || ''
    ];
    
    // Append the row to the sheet
    sheet.appendRow(row);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Data added successfully'
    }))
    .setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("The web app is running!");
}
```

## Step 3: Deploy the Script

1. Click the **Deploy** button (top right) → **New deployment**
2. Click the gear icon ⚙️ next to "Select type" → Choose **Web app**
3. Configure the deployment:
   - **Description:** "Signal 87 Form Handler" (or any name)
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone
4. Click **Deploy**
5. Review permissions:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to [Your Project Name] (unsafe)**
   - Click **Allow**
6. **COPY THE WEB APP URL** - it will look like:
   ```
   https://script.google.com/macros/s/[LONG-ID-HERE]/exec
   ```

## Step 4: Update Your JavaScript File

1. Open `src/js/app.js`
2. Find this line at the top:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace it with your actual URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR-ACTUAL-ID-HERE/exec';
   ```
4. Save the file

## Step 5: Test Your Form

1. Open your website in a browser
2. Fill out the contact form
3. Click "Submit Application"
4. Check your Google Sheet - the data should appear in a new row!

## Troubleshooting

### Form not submitting?
- Check browser console for errors (F12)
- Make sure the Google Script URL is correct
- Verify the Apps Script deployment is set to "Anyone" access

### Data not appearing in spreadsheet?
- Check that column headers match exactly
- Verify the script has permission to edit the spreadsheet
- Look at the Apps Script execution logs (Extensions → Apps Script → Executions)

### Getting CORS errors?
- The script uses `mode: 'no-cors'` which is required for Google Apps Script
- Due to this, you won't see detailed error responses in the browser

## Optional: Email Notifications

To receive an email when someone submits the form, add this to your Google Apps Script:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    var row = [
      data.timestamp || new Date(),
      data.name || '',
      data.email || '',
      data.role || '',
      data.introduction || '',
      data.portfolio || ''
    ];
    
    sheet.appendRow(row);
    
    // Send email notification
    MailApp.sendEmail({
      to: "your-email@example.com", // Change this to your email
      subject: "New Signal 87 Application: " + data.name,
      body: "New application received!\n\n" +
            "Name: " + data.name + "\n" +
            "Email: " + data.email + "\n" +
            "Role: " + data.role + "\n" +
            "Portfolio: " + data.portfolio + "\n\n" +
            "Introduction:\n" + data.introduction
    });
    
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Data added successfully'
    }))
    .setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Security Note

The current setup accepts submissions from anyone. For production use, consider:
- Adding reCAPTCHA to prevent spam
- Implementing rate limiting
- Adding data validation in the Apps Script
- Using a more secure authentication method

---

For more information, see [Google Apps Script Web Apps documentation](https://developers.google.com/apps-script/guides/web).
