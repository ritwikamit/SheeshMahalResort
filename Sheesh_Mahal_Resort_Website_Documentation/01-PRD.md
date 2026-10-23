# Product Requirements Document (PRD)

## Product overview
Build an elegant, photo-led, mobile-first website for Sheesh Mahal Resort in Patna. The main goal is to turn visitors into qualified enquiries for event dates, venue visits and package discussions.

## Goals
- Clearly communicate venue identity, location and confirmed event types.
- Generate enquiries through phone, WhatsApp and a secure form.
- Improve local search discoverability and answer-based search clarity.
- Showcase authentic venue photography and video.
- Provide directions and useful event-planning information.
- Remain fast and resilient during seasonal traffic spikes.

## Audience
Couples and families planning weddings/receptions; people arranging Haldi, Mehndi, Sangeet, engagement, birthdays or anniversaries; event planners; and businesses planning corporate gatherings. Retain only event categories confirmed by the owner.

## Primary conversions
1. Call the venue.
2. Start a WhatsApp enquiry.
3. Submit an event enquiry.
4. Open directions in Google Maps.
5. Request a venue visit.

## Proposed sitemap
Home; Venue/About; Weddings & Receptions; Pre-Wedding Functions; Family & Social Events; Gallery; Facilities (verified only); FAQs; Contact/Check Availability; Privacy Policy.

## Homepage sections
Hero and CTA; short introduction; event types; confirmed venue spaces; real photo gallery; verified facilities; enquiry steps; location/directions; FAQ; contact/social links.

## Functional requirements
- Responsive mobile/tablet/desktop layout.
- Click-to-call and WhatsApp buttons.
- Enquiry form with name, phone, event type, preferred date/date-not-finalised option, optional guest count and message.
- Client-side and server-side validation.
- Spam mitigation, rate limiting, generic success/error states.
- Correct Maps directions link and social links.
- Accessible gallery, SEO metadata, sitemap, robots.txt, canonical URLs and suitable structured data.
- Analytics for conversions without sending personal form contents.

## Non-functional requirements
- Fast on mobile networks; compressed responsive images.
- HTTPS everywhere and no exposed secrets.
- Target WCAG 2.2 AA for core flows.
- Minimal personal data collection and defined retention.
- Monitoring for uptime, form delivery and abuse.
- Backups and restore plan if a database/CMS is introduced.

## Out of scope initially
Online payments, customer accounts, public availability guarantees, storing identity documents, or custom booking software unless explicitly required.

## Acceptance criteria
Call/WhatsApp/map links work; form submits to the approved recipient; input is validated server-side; secrets are absent from client bundles/repository; key pages pass responsive, accessibility, metadata, link and build checks; unverified facts are omitted.
