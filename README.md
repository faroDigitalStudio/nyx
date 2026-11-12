# Nyx Photography

Model, boudoir, and editorial portrait sessions with an emphasis on confidence, creative direction, and personal expression. Part of the [MetaLumina](https://metalumina.studio/) spectrum.

**Website:** [nyxpics.com](https://nyxpics.com/)

## About the site

A mobile-friendly, inquiry-first website based on the **Strada** BootstrapMade template. The single-page experience includes:

- **Hero:** Editorial imagery and one clear inquiry CTA
- **Our Approach:** Comfortable sessions, creative direction, and expressive photography
- **Sessions:** Model photography, boudoir, and editorial portraits
- **What to Expect:** How planning, the shoot, and image delivery work
- **Inquire:** Email-first form with flexible timing, camera experience, and an optional checkbox for separate modeling opportunities

## Technology

- HTML5, CSS3, Bootstrap 5, and vanilla JavaScript
- BootstrapMade **Strada** template (commercial license)
- Static hosting on **GitHub Pages**, with the `nyxpics.com` custom domain
- **Formspark:** `https://submit-form.com/ZRr2nRjG8`
- **Google Analytics 4:** `G-DT9BGRNDVZ`
- Canonical URL, Open Graph/Twitter metadata, and `ProfessionalService` structured data

## Key files

```text
index.html              Page content, metadata, and intake form
assets/css/main.css     Nyx styling, imagery, and responsive layouts
assets/js/main.js       Navigation and Formspark submission handling
assets/img/             Brand marks and editorial imagery
assets/vendor/          Bootstrap template dependencies
```

The inquiry form uses Formspark's honeypot field, inline success/error messages, and duplicate-submission prevention. Successful inquiries are tracked as GA4 `generate_lead` events without sending visitor details to analytics. Direct email: **book@nyxpics.com**. Calls are arranged privately when needed, not through a public calendar.

**Images:** `hero.png`, `approach.png`, `experience.png`, `inquiry.png`, `background.jpg`, `logo.png`, and `favIcon.png`. Keep these exact filenames in `assets/img/`. `background.jpg` is used by CSS in the What to Expect section.

## Maintenance

Edit page copy and form fields in `index.html`, styling and image positioning in `assets/css/main.css`, and form/navigation behavior in `assets/js/main.js`. Retain `assets/vendor/`. After deployment, send a real test inquiry and verify delivery in Formspark and the notification inbox.
