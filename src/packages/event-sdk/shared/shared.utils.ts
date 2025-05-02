export function parseStringToJson<T = { [key: string]: any }>(str: string): T | null {
  try {
    return JSON.parse(str);
  } catch (_) {
    return null;
  }
}
