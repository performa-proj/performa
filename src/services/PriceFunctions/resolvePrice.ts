export const resolvePrice = (payloads: {
  pricebase: number;
  structure: string | number;
}) => {
  const { pricebase, structure } = payloads;
  const value = pricebase + Number(structure);

  return Math.ceil(value);
};
