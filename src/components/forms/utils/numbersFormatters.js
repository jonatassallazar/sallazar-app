export const currencyFormatter = (value) => {
  if (!Number(value)) return '0,00';

  const amount = (value / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: 'decimal',
  });

  return `${amount}`;
};
