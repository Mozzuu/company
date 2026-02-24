# Quick Setup Guide - Contact Form

## The form is currently NOT configured. Follow these steps:

### EASIEST SOLUTION: Formspree (2 minutes)

1. **Go to**: https://formspree.io
2. **Click**: "Get Started" (free account)
3. **Create a new form**:
   - Set recipient email: **descomcommunications@gmail.com**
   - Copy your Form ID (looks like: `xrgpqwky` or `abc123def456`)

4. **Open `index.html`** and find this line (around line 443):
   ```html
   <form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" novalidate>
   ```

5. **Replace `YOUR_FORM_ID`** with your actual Form ID:
   ```html
   <form class="contact-form" id="contactForm" action="https://formspree.io/f/xrgpqwky" method="POST" novalidate>
   ```
   (Replace `xrgpqwky` with YOUR actual Form ID)

6. **Save and test!** The form will now send emails to descomcommunications@gmail.com

---

### ALTERNATIVE: Web3Forms (No signup needed)

1. **Go to**: https://web3forms.com
2. **Enter email**: descomcommunications@gmail.com
3. **Click**: "Get Your Access Key"
4. **Copy** your access key
5. **Open `script.js`** and find line ~447:
   ```javascript
   const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';
   ```
6. **Replace** with your key:
   ```javascript
   const WEB3FORMS_KEY = 'your-actual-key-here';
   ```
7. **Save and test!**

---

## Current Status

⚠️ **The form is NOT working** because no email service is configured.

**Choose one of the options above** and the form will work immediately!
