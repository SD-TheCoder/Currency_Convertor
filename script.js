const countryList = {
  AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  AQD: "AQ",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  XOF: "BE",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  NOK: "BV",
  BWP: "BW",
  BYR: "BY",
  BZD: "BZ",
  CAD: "CA",
  CDF: "CD",
  XAF: "CF",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CYP: "CY",
  CZK: "CZ",
  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",
  ECS: "EC",
  EEK: "EE",
  EGP: "EG",
  ETB: "ET",
  EUR: "FR",
  FJD: "FJ",
  FKP: "FK",
  GBP: "GB",
  GEL: "GE",
  GGP: "GG",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",
  HKD: "HK",
  HNL: "HN",
  HRK: "HR",
  HTG: "HT",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  JOD: "JO",
  JPY: "JP",
  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LTL: "LT",
  LVL: "LV",
  LYD: "LY",
  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRO: "MR",
  MTL: "MT",
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MYR: "MY",
  MZN: "MZ",
  NAD: "NA",
  XPF: "NC",
  NGN: "NG",
  NIO: "NI",
  NPR: "NP",
  NZD: "NZ",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",
  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SKK: "SK",
  SLL: "SL",
  SOS: "SO",
  SRD: "SR",
  STD: "ST",
  SVC: "SV",
  SYP: "SY",
  SZL: "SZ",
  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",
  VEF: "VE",
  VND: "VN",
  VUV: "VU",
  YER: "YE",
  ZAR: "ZA",
  ZMK: "ZM",
  ZWD: "ZW",
};
//"https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/inr.json";

const CurrencyRate_url =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let selectBox = document.querySelectorAll(".dropdown select");
let select_container_img = document.querySelectorAll(".select_container img");

for (select of selectBox) {
  for (keys in countryList) {
    let New_Option = document.createElement("option");
    New_Option.innerText = keys;
    New_Option.value = keys;
    select.append(New_Option);
    if (select.name === "from" && keys === "USD") {
      New_Option.selected = "selected";
    } else if (select.name === "to" && keys === "INR") {
      New_Option.selected = "selected";
    }
  }
  select.addEventListener("change", function (Event) {
    UpdateFlag(Event);
  });
}

function UpdateFlag(e) {
  let currencyCode = e.target.value;
  let countryCode = countryList[currencyCode];
  let newImageSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
  let Image = e.target.parentElement.firstElementChild;
  Image.src = newImageSrc;
}

const button = document.querySelector("form button");
const User_enter_input = document.querySelector(".amount input");

button.addEventListener("click", async function (event) {
  event.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", function () {
  updateExchangeRate();
});

async function updateExchangeRate() {
  let User_enter_input_value = User_enter_input.value;
  if (User_enter_input_value === "" || User_enter_input_value < 1) {
    User_enter_input.value = 1;
    User_enter_input_value = 1;
  }

  let fromCurrency = document.querySelector(".from select");
  let toCurrency = document.querySelector(".to select");

  let baseURL = await fetch(
    `${CurrencyRate_url}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`
  );

  let response = await baseURL.json();

  let rate = response[toCurrency.value.toLowerCase()];

  let finalAmount = (User_enter_input_value * rate).toFixed(2);

  let message = document.querySelector(".message");

  message.innerHTML = `${User_enter_input_value} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value} `;
  console.log(response);
}
