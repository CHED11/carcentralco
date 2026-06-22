/**
 * STRIPE PAYMENT LINKS
 *
 * Key format:  `${PRODUCT_KEY}_${SIZE}_${FRAME}`
 *   PRODUCT_KEY  -> Product.productKey from products.ts   (e.g. "918")
 *   SIZE         -> SizeOption.code                        (e.g. "16X20")
 *   FRAME        -> FrameOption.code                       (e.g. "PRINT_ONLY")
 *
 * Example key:  918_16X20_BLACK_FRAME
 *
 * Each value is a Stripe Payment Link URL. Empty string = "Available Soon"
 * (the Buy button stays premium but is disabled). Later, paste the six real
 * Stripe Payment Link URLs below — zero redesign required anywhere else.
 */

export const stripeLinks: Record<string, string> = {
  "918_16X20_PRINT_ONLY": "",
  "918_16X20_BLACK_FRAME": "",
  "918_18X24_PRINT_ONLY": "",
  "918_18X24_BLACK_FRAME": "",
  "918_24X36_PRINT_ONLY": "",
  "918_24X36_BLACK_FRAME": "",
  "SVJ_16X20_PRINT_ONLY": "",
  "SVJ_16X20_BLACK_FRAME": "",
  "SVJ_18X24_PRINT_ONLY": "",
  "SVJ_18X24_BLACK_FRAME": "",
  "SVJ_24X36_PRINT_ONLY": "",
  "SVJ_24X36_BLACK_FRAME": "",
  "F40_16X20_PRINT_ONLY": "",
  "F40_16X20_BLACK_FRAME": "",
  "F40_18X24_PRINT_ONLY": "",
  "F40_18X24_BLACK_FRAME": "",
  "F40_24X36_PRINT_ONLY": "",
  "F40_24X36_BLACK_FRAME": "",
  "P1_16X20_PRINT_ONLY": "",
  "P1_16X20_BLACK_FRAME": "",
  "P1_18X24_PRINT_ONLY": "",
  "P1_18X24_BLACK_FRAME": "",
  "P1_24X36_PRINT_ONLY": "",
  "P1_24X36_BLACK_FRAME": "",
  "GT3RS_16X20_PRINT_ONLY": "",
  "GT3RS_16X20_BLACK_FRAME": "",
  "GT3RS_18X24_PRINT_ONLY": "",
  "GT3RS_18X24_BLACK_FRAME": "",
  "GT3RS_24X36_PRINT_ONLY": "",
  "GT3RS_24X36_BLACK_FRAME": "",
  "REVUELTO_16X20_PRINT_ONLY": "",
  "REVUELTO_16X20_BLACK_FRAME": "",
  "REVUELTO_18X24_PRINT_ONLY": "",
  "REVUELTO_18X24_BLACK_FRAME": "",
  "REVUELTO_24X36_PRINT_ONLY": "",
  "REVUELTO_24X36_BLACK_FRAME": "",
};

export const buildStripeKey = (
  productKey: string,
  sizeCode: string,
  frameCode: string,
) => `${productKey}_${sizeCode}_${frameCode}`;

export const getStripeLink = (key: string): string =>
  stripeLinks[key] ?? "";
