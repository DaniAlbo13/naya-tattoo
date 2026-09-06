# NAYA Tattoo — Master Template

NAYA Tattoo is the permanent master/demo version of a reusable tattoo-artist website template. Keep this repository as the reference build and create a separate copy for every customer.

Live demo: https://danialbo13.github.io/naya-tattoo/

## Current master capabilities

- Responsive homepage and live sales demo
- Configurable artist/brand profile
- Numbered tattoo gallery with search
- Multi-design selection persisted between gallery and request flow
- Accessible image modal with keyboard open/close, focus trapping and focus restoration
- Direct WhatsApp request flow
- Sales/packages page with accessible package selection and lead form
- Branded recovery/404 page
- SEO metadata, canonical URLs, Open Graph, robots.txt and sitemap.xml
- Automated GitHub Actions validation on every push/PR

## Customer setup

Most customer-specific changes belong in `site-config.js`.

Configure:

- `brand` — studio/artist brand name
- `artistName` — tattoo artist name
- `artistBio` — short profile text
- `whatsapp` — WhatsApp number in international format, digits only
- `instagram` — Instagram username without needing `@`
- `city` — city shown in the artist profile
- `accent` — main accent color
- `heroImage` — homepage hero image path
- `heroKicker` — small text above the hero title
- `heroTitle` — large hero title
- `heroText` — hero description
- `galleryCta` — gallery CTA text
- `requestCta` — request CTA text
- `storageKey` — shared localStorage key used by gallery and homepage
- `designCount` — number of designs enabled
- `designFiles` — ordered design image filenames

## Design images

Put gallery images in `assets/designs/`, then list the filenames in `site-config.js` in the exact order they should appear. The gallery numbers active designs automatically from `001` upward.

## Hero image

Put the customer hero image under `assets/` and set `heroImage` in `site-config.js`, for example:

```js
heroImage:'assets/artist-hero.jpg'
```

## WhatsApp requests

The request flow automatically includes the visitor name, selected design numbers, tattoo placement and notes, then opens WhatsApp with the prepared message.

Use the international number without `+`, spaces or leading zero. Example:

```js
whatsapp:'989121234567'
```

## Instagram

Set only the username:

```js
instagram:'artistname'
```

If Instagram or city is blank, that UI is hidden automatically.

## New customer workflow

1. Copy the master repository into a new customer repository. Never convert the NAYA master into the customer build.
2. Replace the hero image and gallery images.
3. Edit `site-config.js` for brand, artist information, contact details, copy, accent and design list.
4. Replace all NAYA-specific canonical/Open Graph URLs with the customer's deployed URL.
5. Update `robots.txt` and `sitemap.xml` for the customer's deployed URL.
6. Remove the NAYA Google verification tag from the customer copy and add the customer's own verification only if needed.
7. Enable deployment and run `node scripts/validate-site.mjs`; do not hand off while validation is failing.
8. Test on a real phone: homepage → gallery → select multiple designs → open/close modal → continue request → WhatsApp message.
9. Test the packages/lead flow if that page is included in the customer's scope.
10. Test a nonexistent URL and confirm the branded 404 recovery links work.

## Automated validation

Run locally with:

```bash
node scripts/validate-site.mjs
```

The same validator runs in GitHub Actions. It checks required files, config integrity, active design assets, hero asset, local/cross-page links, duplicate IDs, core SEO metadata, NAYA verification preservation, saved-design hardening, gallery modal accessibility, package-page sales/accessibility requirements, the branded 404 recovery page and the NAYA sitemap.

The sitemap checks intentionally reference the NAYA demo URLs. When creating a customer clone, update those validation expectations together with the customer's sitemap/canonical URLs.

## Release gate

A customer build is ready for handoff only when:

- automated validation passes;
- deployment succeeds;
- the mobile gallery/request journey has been manually exercised on the deployed site;
- WhatsApp opens with the correct customer number and request content;
- customer branding, images and public URLs contain no leftover NAYA/demo contact data;
- no placeholder client identity, address or social account has been invented.

## Master-template rule

NAYA remains the permanent public demo/master. Customer websites are independent branded copies so improvements can continue here without overwriting sold deployments.
