export const formatCurrency = (value: number) => {
  const f = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });

  return `${f.format(value)}`;
};
