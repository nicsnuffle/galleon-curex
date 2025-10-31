const baseRates = {
  Galleon: 1,
  USD: 6.64,
  GBP: 4.93,
  EUR: 5.58,
  AUD: 8.72,
  TRY: 25.98,
  KRW: 7865.84,
  JPY: 744.24,
  CHF: 6.84,
  RUB: 390.86,
  CAD: 8.43,
  BRL: 21.64,
  DKK: 41.55,
  THB: 216.61,
  SEK: 55.52,
  UAH: 190.18,
  ARS: 114.39,
  HUF: 1834.00,
  PHP: 333.88,
  HKD: 51.88,
  MYR: 28.84,
  INR: 428.61,
  IDR: 108783.78,
};

const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const result = document.getElementById('result');
const convertBtn = document.getElementById('convertBtn');


function formatNumber(num) {
  return num.toLocaleString('id-ID', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function convertToWizardMoney(galleonValue) {
  const totalKnut = galleonValue * 17 * 29;
  const galleon = Math.floor(totalKnut / (17 * 29));
  const sisaSetelahGalleon = totalKnut % (17 * 29);
  const sickle = Math.floor(sisaSetelahGalleon / 29);
  const knut = Math.round(sisaSetelahGalleon % 29);

  return `${galleon} Galleon${galleon !== 1 ? 's' : ''}, ${sickle} Sickle${sickle !== 1 ? 's' : ''}, ${knut} Knut${knut !== 1 ? 's' : ''}`;
}

function loadCurrencies() {
  const currencies = Object.keys(baseRates);
  currencies.forEach(code => {
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');
    option1.value = option2.value = code;
    option1.textContent = option2.textContent = code;
    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
  });

  fromCurrency.value = 'USD';
  toCurrency.value = 'Galleon';
}

function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amt = parseFloat(amount.value);

  if (isNaN(amt) || amt <= 0) {
    result.textContent = 'Masukkan jumlah yang valid.';
    return;
  }

  const fromRateToGalleon = 1 / baseRates[from];
  const toRateToGalleon = 1 / baseRates[to];

  const amountInGalleon = amt * fromRateToGalleon;
  const converted = amountInGalleon / toRateToGalleon;

  let output = `${from} ${formatNumber(amt)} = ${to} ${formatNumber(converted)}`;

  if (to === 'Galleon' || from === 'Galleon') {
    const galleonValue = to === 'Galleon' ? converted : amt;
    const wizardBreakdown = convertToWizardMoney(galleonValue);
    output += `\n (${wizardBreakdown})`;
  }

  result.textContent = output;
}

convertBtn.addEventListener('click', convertCurrency);
window.addEventListener('load', loadCurrencies);

function loadMarqueeRates() {
  const marquee = document.getElementById('rateMarquee');
  let text = '';

  Object.keys(baseRates).forEach(code => {
    if (code !== 'Galleon') {
      text += ` ${code} ${formatNumber(baseRates[code])} | `;
    }
  });

   marquee.textContent = text + text;
}

window.addEventListener('load', () => {
  loadCurrencies();
  loadMarqueeRates();
});
