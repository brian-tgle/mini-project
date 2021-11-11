const currencyFormatter = (value = 0) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
}).format(value);

export default currencyFormatter;
