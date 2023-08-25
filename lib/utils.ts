import { ItemProps } from './interfaces/interfaces';

export function capitalizeWords(str: string) {
  return str.replace(/(^|\s)\S/g, function (firstLetter) {
    return firstLetter.toUpperCase();
  });
}

export function calculateSubTotal(items: ItemProps[]) {
  let sum = 0;

  for (let item of items) {
    sum += item.price! * item.hours!;
  }

  return parseFloat(sum.toFixed(2));
}
