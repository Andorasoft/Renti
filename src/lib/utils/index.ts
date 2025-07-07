export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function normalize(path: string): string {
  return path === "/" ? "/" : path.replace(/\/$/, '');
}

export function isoToEmoji(iso2: string): string {
  return iso2
    .toUpperCase()
    .replace(/./g, char =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
}