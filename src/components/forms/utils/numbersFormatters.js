export const currencyFormatter = (value) => {
  if (!Number(value)) return '';

  const amount = (value = 0 / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: 'decimal',
  });

  return `${amount}`;
};
