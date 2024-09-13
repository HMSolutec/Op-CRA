export function asPercentage(value: number, reference: number, referencePercentage = 100) {
  return value * referencePercentage / reference;
}
