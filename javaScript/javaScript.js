const fromCurrencySelect = document.querySelector("#fromCurrency");
const fromAmountInput = document.querySelector("#fromAmount");
const toCurrencySelect = document.querySelector("#toCurrency");
const toAmountInput = document.querySelector("#toAmount");
const convertButton = document.querySelector("#convertBtn");

let egpRate, sarRate;

fetch("https://api.currencyfreaks.com/v2.0/rates/latest?apikey=bc3c46efac5d4a7faa91771283472620stop")
    .then(response => response.json())
    .then(data => {
        egpRate = parseFloat(data.rates.EGP);
        sarRate = parseFloat(data.rates.SAR);
    })
    .catch(() => {
        egpRate = 49.41;
        sarRate = 3.75;
    });

convertButton.addEventListener("click", () => {
    const currencyRates = new Map([
        ["EGP", egpRate],
        ["SAR", sarRate],
        ["USD", 1]
    ]);

    const fromRate = currencyRates.get(fromCurrencySelect.value);
    const toRate = currencyRates.get(toCurrencySelect.value);
    const amount = parseFloat(fromAmountInput.value);

    if (!fromRate || !toRate || isNaN(amount)) {
        toAmountInput.value = "Invalid input";
        return;
    }

    const converted = (toRate / fromRate) * amount;
    toAmountInput.value = converted.toFixed(2);
});

