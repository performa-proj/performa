export const resolveID = (date: Date): number =>
  Number(`${date.getFullYear().toString()}${date.getMonth().toString().padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`);
