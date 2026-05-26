import { computed } from 'vue';
import { C as useI18n } from './server.mjs';

const useCurrency = () => {
  const { locale, locales } = useI18n();
  const currentLocale = computed(
    () => locales.value.find((l) => l.code === locale.value)
  );
  const currency = computed(() => currentLocale.value?.currency ?? "IDR");
  const language = computed(() => currentLocale.value?.language ?? "id-ID");
  const formatCurrency = (amount, overrideCurrency) => {
    return new Intl.NumberFormat(language.value, {
      style: "currency",
      currency: String(overrideCurrency ?? currency.value),
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  const formatCurrencyFromCode = (amount, currencyCode) => {
    const localeMap = {
      IDR: "id-ID",
      USD: "en-US",
      JPY: "ja-JP",
      MYR: "ms-MY",
      SGD: "en-SG",
      EUR: "de-DE",
      GBP: "en-GB",
      AUD: "en-AU",
      CNY: "zh-CN",
      KRW: "ko-KR",
      THB: "th-TH",
      PHP: "fil-PH",
      VND: "vi-VN"
    };
    return new Intl.NumberFormat(localeMap[currencyCode] ?? language.value, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  return {
    currency,
    language,
    formatCurrency,
    formatCurrencyFromCode
  };
};
function getTransactionDisplay(tx) {
  if (tx.type === "transfer") {
    return {
      label: `Transfer to ${tx.toWallet?.name ?? "-"}`,
      subtitle: tx.wallet?.name ?? "-",
      isExpense: true
    };
  }
  return {
    label: tx.category?.name ?? tx.type,
    subtitle: tx.wallet?.name ?? "-",
    isExpense: tx.type === "expense"
  };
}

export { getTransactionDisplay as g, useCurrency as u };
//# sourceMappingURL=useCurrency-CzQKYynb.mjs.map
