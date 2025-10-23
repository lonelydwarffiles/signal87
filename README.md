# Signal 87 Website

A casting and crew call website for Signal 87, a 24/7 experimental audio broadcast project.

## 📁 Project Structure

```
Signal87/Website/
├── src/
│   ├── index.html          # Main HTML file
│   ├── css/
│   │   └── styles.css      # All styling
│   └── js/
│       └── app.js          # Form handling & interactions
├── GOOGLE_SHEETS_SETUP.md  # Instructions for Google Sheets integration
└── README.md               # This file
```

## 🚀 Features

- **Responsive Design** - Works on all devices
- **Contact Form** - Submits directly to Google Sheets
- **Modern Layout** - Cyberpunk/terminal aesthetic
- **Organized Structure** - Separated HTML, CSS, and JavaScript

## 🎨 Styling

All styles are in `src/css/styles.css` including:
- Terminal/cyberpunk theme with green and red accents
- Responsive grid layouts
- Hover effects and animations
- Form styling with validation states

## 📝 Contact Form

The contact form collects:
- Full Name
- Email Address
- Primary Role (dropdown with all positions)
- Introduction/Why Signal 87
- Portfolio Link

### Setting Up Google Sheets Integration

Follow the detailed instructions in `GOOGLE_SHEETS_SETUP.md` to:
1. Create a Google Spreadsheet
2. Set up a Google Apps Script
3. Deploy as a web app
4. Update the script URL in `src/js/app.js`

## 🔧 Configuration

To enable form submissions, edit `src/js/app.js`:

```javascript
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
```

Replace with your actual Google Apps Script web app URL.

## 🌐 Deployment

This is a static website that can be hosted on:
- **GitHub Pages** - Free, easy setup
- **Netlify** - Free tier with CI/CD
- **Vercel** - Free tier with auto-deployment
- **Any static hosting service**

### Quick Deploy to GitHub Pages

1. Create a new GitHub repository
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/signal87.git
   git push -u origin main
   ```
3. Go to repository Settings → Pages
4. Select branch: `main`, folder: `/src`
5. Save and wait for deployment

## 📱 Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 To Do

- [ ] Set up Google Sheets integration (see GOOGLE_SHEETS_SETUP.md)
- [ ] Add reCAPTCHA to prevent spam (optional)
- [ ] Test form submission
- [ ] Deploy to hosting service
- [ ] Set up custom domain (optional)

## 🔐 Security Notes

The current Google Sheets integration is basic. For production:
- Consider adding reCAPTCHA
- Implement rate limiting in Apps Script
- Add input validation and sanitization
- Monitor submission logs

## 📄 License

© 2025 Signal 87. All rights reserved.
