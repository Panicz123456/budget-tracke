export const Currencies = [
  { value: "USD", label: "$ Dollar", locale: "en-US" },
  { value: "EUR", label: "€ Euro", locale: "de-DE" },
  { value: "GBP", label: "£ Pound", locale: "en-GB" },
  { value: "JPY", label: "¥ Yen", locale: "ja-JP" },
  { value: "AUD", label: "A$ Dollar", locale: "en-AU" },
  { value: "CAD", label: "C$ Dollar", locale: "en-CA" },
  { value: "CHF", label: "Fr. Franc", locale: "de-CH" },
  { value: "CNY", label: "¥ Yuan", locale: "zh-CN" },
  { value: "INR", label: "₹ Rupee", locale: "en-IN" },
  { value: "BRL", label: "R$ Real", locale: "pt-BR" },
  { value: "PLN", label: "zł Złoty", locale: "pl-PL" },
];

export type Currency = (typeof Currencies)[0]
