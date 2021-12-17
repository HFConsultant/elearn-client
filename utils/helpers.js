// data {currency: '', amount: ''}
export const currencyFormatter = (data) => {
  console.log("currencyFormatter data =>", data);
  return ((data.amount * 100) / 100).toLocaleString(data.currency, {
    style: "currency",
    currency: data.currency,
  });
};

export const stripeCurrencyFormatter = (data) => {
  console.log("stripeCurrencyFormatter data =>", data);
  return (data.amount / 100).toLocaleString(data.currency, {
    style: "currency",
    currency: data.currency,
  });
};
