# ARK BPO Landing Page

A modern, responsive marketing website for an IT and finance business process outsourcing (BPO) provider, inspired by the public site at `https://arkbpo.com/`.

## Tech stack

- Static **HTML** (`index.html`)
- Custom **CSS** (`styles.css`) with responsive layout and dark theme
- Lightweight **JavaScript** (`script.js`) for mobile navigation and contact-form UX

No build tools are required; everything runs as plain static files.

## Getting started

1. Open this folder (`e:\\company`) in your browser:
   - Option A: Double-click `index.html` to open it directly.
   - Option B: Run a local static server (recommended):

     ```bash
     cd e:\company
     npm install
     npm run start
     ```

     Then open the URL shown in the terminal (usually `http://localhost:3000` or `http://localhost:5000` depending on the `serve` CLI).

## Structure

- `index.html` – Main landing page markup with sections for hero, services, about, testimonials, and contact.
- `styles.css` – Global styles, layout, and responsive behaviour.
- `script.js` – Handles mobile nav toggle, smooth scrolling, and a mock contact-form submission message.
- `package.json` – Defines a simple script for running a local static file server.

## Notes

- The contact form is **demo-only** on the frontend; it does not send data to a backend yet. A success message is shown client-side after submission.
- Email addresses (`HRD@arkbpo.com`, `info@arkbpo.com`) are present as `mailto:` links for quick access.

