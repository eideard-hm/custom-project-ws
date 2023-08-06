export function isNullOrWhiteSpaces(str: string) {
  return str == null || str.match(/^ *$/) !== null;
}

export function equalsIgnoringCase(str1: string, str2: string) {
  return str1.localeCompare(str2, undefined, { sensitivity: 'accent' }) === 0;
}

