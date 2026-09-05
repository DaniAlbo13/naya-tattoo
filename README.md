# NAYA Tattoo — Master Template

NAYA Tattoo is the master/demo version of a reusable tattoo-artist website template. Keep this repository as the reference build and create a separate copy for each customer.

Live demo: https://danialbo13.github.io/naya-tattoo/

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
- `heroEyebrow` — small text above the hero title
- `heroTitle` — large hero title
- `heroText` — hero description
- `galleryButton` — gallery CTA text
- `requestButton` — request CTA text
- `designCount` — number of designs enabled
- `designFiles` — ordered design image filenames

## Design images

Put gallery images in:

`assets/designs/`

Then list the filenames in `site-config.js` in the exact order they should appear. The gallery numbers designs automatically from `001` upward.

## Hero image

Put the customer hero image under `assets/` and set `heroImage` in `site-config.js`, for example:

```js
heroImage:'assets/artist-hero.jpg'
```

## WhatsApp requests

The request flow automatically includes the visitor name, selected design numbers, tattoo placement, and notes, then opens WhatsApp with the prepared message.

Use the international number without `+`, spaces, or leading zero. Example:

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

1. Copy the master repository into a new customer repository.
2. Replace the hero image and gallery images.
3. Edit only `site-config.js` for the brand, contact details, copy, accent, and design list.
4. Update the customer-specific canonical URL, Open Graph URL, `robots.txt`, and `sitemap.xml` before public launch.
5. Enable GitHub Pages and verify the deployed site on mobile.
6. Test gallery selection and WhatsApp request flow before handoff.

## Master-template rule

Do not turn this repository into a customer-specific build. NAYA remains the permanent demo/master. Customer websites should be created as separate copies so future improvements can continue here without overwriting sold deployments.
