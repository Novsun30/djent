export default function errorMessageRegex(inputMessage) {
  let result;
  result = inputMessage.match(/(?<=auth\/).*/);
  result = result[0].replaceAll(/\W/g, " ").trim();
  result = result[0].toUpperCase() + result.slice(1);
  return result;
}
