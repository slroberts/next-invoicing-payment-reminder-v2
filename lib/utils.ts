export default function capitalizeWords(str: string) {
  return str.replace(/(^|\s)\S/g, function (firstLetter) {
    return firstLetter.toUpperCase();
  });
}
