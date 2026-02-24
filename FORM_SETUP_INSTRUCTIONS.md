# Contact Form Setup Instructions

The contact form is configured to send emails to **descomcommunications@gmail.com**.

## Quick Setup (Recommended - Web3Forms)

1. Go to https://web3forms.com
2. Enter your email: **descomcommunications@gmail.com**
3. Click "Get Your Access Key" (it's free, no signup required)
4. Copy your access key
5. Open `script.js` and find the `sendEmail` function
6. Replace `YOUR_WEB3FORMS_ACCESS_KEY` with your actual access key:
   ```javascript
   access_key: 'YOUR_WEB3FORMS_ACCESS_KEY', // Replace this
   ```
   Example:
   ```javascript
   access_key: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', // Your key here
   ```
7. That's it! The form will now send emails directly to descomcommunications@gmail.com

## Alternative Options

### Option 2: Formspree

1. Go to https://formspree.io and create a free account
2. Create a new form
3. Set the recipient email to: **descomcommunications@gmail.com**
4. Copy your Form ID
5. In `script.js`, replace the `sendEmail` function to use Formspree API instead

### Option 3: EmailJS

1. Go to https://www.emailjs.com and create a free account
2. Create an Email Service
3. Create an Email Template with variables: `{{from_name}}`, `{{from_email}}`, `{{company}}`, `{{services}}`, `{{message}}`
4. Set "To Email" to: **descomcommunications@gmail.com**
5. Get your Service ID, Template ID, and Public Key
6. Update the `sendEmail` function in `script.js` to use EmailJS

## Current Status

The form is set up to use Web3Forms. You just need to:
1. Get a free access key from https://web3forms.com
2. Replace `YOUR_WEB3FORMS_ACCESS_KEY` in `script.js` with your key

The form will automatically send all submissions to descomcommunications@gmail.com once configured!
