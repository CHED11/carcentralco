# Adding a product

Everything on the site (homepage, division pages, collection pages, the product
page + gallery, breadcrumbs and the sitemap) is generated from one list:
`src/data/products.ts`. To add a product you never touch a component — you do
four things.

## 1. Upload the poster image

Put it here (PNG, JPG or WEBP), using the product's **slug** as the folder name:

```
public/products/<slug>/poster.png
```

The slug is the title, lowercased, without the word "Poster":
`"Porsche 918 Spyder Poster"` → `porsche-918-spyder` →
`public/products/porsche-918-spyder/poster.png`.

## 2. (Optional) Upload the framed image

```
public/products/<slug>/framed.png
```

This is shown when a customer selects a framed option. Skip it if you don't
have one yet.

## 3. Add the product information

Append one block to the `products` array in `src/data/products.ts`:

```ts
defineProduct({
  title: "Ferrari F40 Poster",
  division: "performance",          // "premium" | "performance"
  collection: "ferrari",            // marque id — new ones work automatically
  basePrice: 49,
  description: "…",
  // image auto-resolves to /products/ferrari-f40/poster.png
  framedImage: "/products/ferrari-f40/framed.png", // only if you uploaded one
  specs: [                          // optional (great for Performance posters)
    { label: "Top Speed", value: "324", unit: "km/h", sub: "201 mph" },
    // …
  ],
  // 4. Stripe links (see below)
  stripe: {
    "16X20_PRINT_ONLY": "https://buy.stripe.com/…",
    "16X20_BLACK_FRAME": "https://buy.stripe.com/…",
    "18X24_PRINT_ONLY": "https://buy.stripe.com/…",
    "18X24_BLACK_FRAME": "https://buy.stripe.com/…",
    "24X36_PRINT_ONLY": "https://buy.stripe.com/…",
    "24X36_BLACK_FRAME": "https://buy.stripe.com/…",
  },
});
```

Everything else is defaulted for you:

| Field | Default |
| --- | --- |
| `slug` / `id` | derived from `title` |
| `image` | `/products/<slug>/poster.png` |
| `features` | the standard five selling points |
| `sizes` | 16×20, 18×24, 24×36 |
| `frames` | Print Only, Black Frame |
| `stripe` | `{}` (buttons show **Available Soon**) |

## 4. Add the Stripe links

In the Stripe dashboard create a **Payment Link** for each size + frame combo,
then paste the URLs into the `stripe` map. The key is
`` `${SIZE_CODE}_${FRAME_CODE}` `` using the codes from `STANDARD_SIZES` /
`STANDARD_FRAMES` (e.g. `16X20_BLACK_FRAME`). A missing/empty link simply renders
as "Available Soon", so you can ship the product before the links exist.

---

### Notes

- **Order matters for the homepage.** The first product in the array is the
  "Featured" poster; the first six appear under "Popular Products".
- **New collections need no setup.** Using a new `collection` id (e.g.
  `"bugatti"`) auto-creates its collection page. For custom copy
  (name/tagline/description) add an entry to `src/data/collections.ts`.
- **Coming-soon teasers** (cars with no product yet) live in
  `src/data/comingSoon.ts`.
