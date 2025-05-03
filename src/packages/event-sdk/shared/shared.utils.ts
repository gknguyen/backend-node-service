export function parseStringToJson<T = { [key: string]: any }>(str: string): T | string {
  try {
    return JSON.parse(str);
  } catch (_) {
    return str;
  }
}
