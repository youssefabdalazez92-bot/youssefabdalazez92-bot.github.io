YOUSSEF ABdALAZEZ — PORTFOLIO BUILD

Files
- index.html: page structure and metadata
- styles.css: responsive styling and visual effects
- app.js: project rendering, video modal, long-form filtering, and contact form
- og-image.png: social sharing preview image

Contact form
The contact form posts JSON to the existing Google Apps Script Web App.
Payload keys: name, email, service, message.

Important technical note
The browser sends the request in no-cors mode to avoid a preflight request to Apps Script. The browser therefore receives an opaque response and cannot inspect the script's JSON success/error body. The UI confirms that the request was dispatched, but definitive server-side confirmation requires a CORS-capable relay or a compatible Apps Script response strategy. The existing Apps Script deployment has not been modified.

Long-form videos
Four supplied YouTube videos are embedded in the page, grouped under Gaming and Business & AI.

To preview locally
Open index.html in a browser or serve this folder with a local static server.

Build 02 update
- Removed: Physiotherapy – Treatment Session, Physiotherapy – Patient Story, Medical Awareness Campaign, Mercedes-Benz G-Class Commercial.
- Retained the Clinic Introduction, BAIC Automotive Commercial, and Motion Graphics Showcase featured projects.
- Refined interactive controls with a restrained Apple-inspired liquid-glass treatment.


Build 03 update
- Added an accessible Apple-style mobile navigation menu for small screens.
- Updated contact status copy to avoid claiming confirmed delivery when the Apps Script response is opaque in no-cors mode.
- A live form receipt test is still required after deployment preview; the current environment cannot verify the Apps Script backend response.

Portfolio deployment refresh
