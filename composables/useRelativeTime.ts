import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useI18n } from "#imports";
import { DEFAULT_LOCALE } from "~/services/i18n";

// Lang modules. These can't be async imported, so use it carefully.
import en from "dayjs/locale/en";
import es from "dayjs/locale/es";

interface SupportedLocales {
  [key: string]: ILocale;
}

const SUPPORTED_LOCALES: SupportedLocales = {
  en: en,
  es: es,
};

const useRelativeTime = (baseDate?: string) => {
  const { locale } = useI18n();
  const check = locale.value in SUPPORTED_LOCALES;
  if (!check) {
    console.error("Relative time composable does not support this locale");
  }
  dayjs.extend(relativeTime);
  dayjs.locale(
    check ? SUPPORTED_LOCALES[locale.value] : SUPPORTED_LOCALES[DEFAULT_LOCALE]
  );
  const main = baseDate ? dayjs(baseDate) : dayjs();

  function fromNow(withoutSuffix: boolean = false) {
    return main.fromNow(withoutSuffix);
  }

  function toNow(withoutSuffix: boolean = false) {
    return main.toNow(withoutSuffix);
  }

  function from(comparedDate: string, withoutSuffix: boolean = false) {
    return main.from(dayjs(comparedDate), withoutSuffix);
  }

  function to(comparedDate: string, withoutSuffix: boolean = false) {
    return main.to(dayjs(comparedDate), withoutSuffix);
  }

  return {
    fromNow,
    toNow,
    from,
    to,
  };
};

export default useRelativeTime;
