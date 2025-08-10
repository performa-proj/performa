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
    if (nValue[nValue.length - 1] === ".") {
      return nValue;
    } else if (nValue[nValue.length - 1] === " ") {
      return nValue.slice(0, -1);
    }

    if (nValue.indexOf(".") >= 0) {
      return nValue;
    }

    return numb.toString();
  }

  return value;
};
