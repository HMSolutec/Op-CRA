export function getInputEventValue(e: Event) {
  if (e.target instanceof HTMLInputElement) {
    return e.target.value;
  }

  throw new Error(`Target isn't an input`);
}
