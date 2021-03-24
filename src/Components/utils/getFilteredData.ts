export const getFilteredData = (arr: string[], toCompare: string) =>
  [...arr].filter((val) => val.includes(toCompare));
