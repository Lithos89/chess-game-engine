
export default function indexInRange(index: number, array: readonly any[] | any[]) {
  return index >= 0 && index < array.length;
};