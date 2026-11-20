# Bipin Bhandari — Real Estate Sales & Lead Generation

A responsive personal portfolio for a Real Estate Sales & Lead Generation Specialist serving real estate professionals in the USA, UK, and Canada. It is a portfolio—not a property marketplace. Demo project cards use illustrative stock photos and do not claim clients, leads, listings, completed campaigns, or results.

## Run locally

1. Keep `index.html`, `styles.css`, `app.js`, and `portfolio-config.js` together with the `assets/` folder.
2. Open `index.html` directly in a browser or use VS Code Live Server for a visual preview. To verify enquiry delivery, use the deployed site and complete the activation steps below. No package install or build step is needed.

## Update the portfolio

Edit `portfolio-config.js`:

- Replace the four demo project descriptions with accurate, anonymized summaries only after relevant work is completed. Keep personal contact data and confidential lead details out of the public portfolio.
- Replace the illustrative photos with images you own or are licensed to use. The supplied demo photos are stock imagery and are not property listings.
- Confirm the contact email and international WhatsApp number in the config before publishing. Email opens a Gmail compose window with the recipient filled in (a Google sign-in may be required); WhatsApp opens a chat. The address and number are not printed as page text. The enquiry form POSTs to FormSubmit, which processes the submitted name, email, market, service, and message and forwards them by email. FormSubmit's CAPTCHA protection is enabled.
- Add real Facebook, Instagram, and LinkedIn profile URLs to enable their icon links in the footer.
- Update service descriptions if your scope changes.

The site includes eight real-estate research and outreach services, four editable demo briefs, target markets, and a five-step work process. It contains no property search, sale, or rental functionality.

## Activate enquiry delivery

After deploying the site, submit the form once with a test enquiry. FormSubmit will send an activation email to `info@bipinb.com.np`; open it and confirm the address before expecting submissions to be delivered. The form then submits directly to FormSubmit and does not require the visitor to have an email application configured.

## Deploy

This is a static website. Upload the project files and `assets/` folder to GitHub Pages, Netlify, Cloudflare Pages, or another static host; no build command is required. Add a custom domain and HTTPS in the hosting provider's settings if desired.
