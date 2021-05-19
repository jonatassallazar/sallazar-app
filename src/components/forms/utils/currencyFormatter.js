export const currencyFormatter = (value) => {
  if (!Number(value)) return '';

  const amount = (value / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: 'decimal',
  });

  return `${amount}`;
};

// export const valuesFormatter = (values) => {
//   // const val = (parseFloat(values.value) / 100).toFixed(2);
//   const floatVal = values.floatValue && values.floatValue / 100;

//   return floatVal;
//   // return {
//   //   formattedValue: values.formattedValue,
//   //   value: val,
//   //   floatValue: floatVal,
//   // };
// };

// export const getFloatValue = (values) => {
//   console.log(values);
//   if (!values.floatValue) {
//     return 0;
//   }
//   return values.floatValue;
// };
