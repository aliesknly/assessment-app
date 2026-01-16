import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let localeValue = requestLocale;

  // Handle the locale parameter properly
  if (typeof requestLocale === "string") {
    localeValue = requestLocale;
  } else if (
    requestLocale &&
    typeof requestLocale === "object" &&
    "locale" in requestLocale
  ) {
    localeValue = (requestLocale as any).locale;
  }

  // Ensure we have a valid locale
  let finalLocale: string;
  if (
    localeValue &&
    typeof localeValue === "string" &&
    routing.locales.includes(localeValue)
  ) {
    finalLocale = localeValue;
  } else {
    finalLocale = routing.defaultLocale;
  }

  return {
    locale: finalLocale,
    messages: (await import(`./messages/${finalLocale}.json`)).default,
  };
});

