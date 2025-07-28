export const resolveNumber = (value: string, nValue: string) => {
  if (nValue.length === 0 || nValue === "00" || nValue === "0  ") {
    return "0";
  }

  if (nValue === "0-" || nValue === "-") {
    return "-";
  }

  if (nValue === "-00" || nValue === "-0") {
    return "-0";
  }

  const numb = Number(nValue);

  if (!Number.isNaN(numb)) {
    return nValue;
  }

  return value;
};
