export function convertRupiah(value: number | undefined | 0) {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  if (value) return formatter.format(value);
  return null;
}
