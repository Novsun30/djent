export default function overBarConverter(bar, number, noteValue) {
  const result = [];
  const noteValueTable = {
    "1n": 16,
    "2n": 8,
    "4n": 4,
    "8n": 2,
  };
  const noteValueLength = noteValueTable[noteValue];

  for (let i = 1; i < noteValueLength; i += 1) {
    if (number + i > 15) {
      result.push([bar + 1, number + i - 16]);
    } else {
      result.push([bar, number + i]);
    }
  }

  return result;
}
