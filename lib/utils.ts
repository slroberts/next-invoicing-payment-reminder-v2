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

export function formatPhoneNumber(input: string) {
  let numbersOnly = input.replace(/\D/g, '');

  if (numbersOnly.length > 10) {
    numbersOnly = numbersOnly.substring(0, 10);
  }

  if (numbersOnly.length !== 10) {
    console.error('Phone number must have exactly 10 digits');
  }

  return numbersOnly.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
}
