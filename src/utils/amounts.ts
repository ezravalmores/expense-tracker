
export const sumPositive = (amounts: Array<any>) => {
  return amounts.filter((item: number) => item > 0).reduce((acc: number, item: number) => (acc += item), 0).toFixed(2);
}

export const sumNegative = (amounts: Array<any>) => {
  return (amounts.filter((item: number) => item < 0).reduce((acc: number, item: number) => (acc += item), 0) * -1).toFixed(2);
}
