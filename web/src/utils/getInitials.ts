export function getInitials(name: string = 'store admin'): string {
  const words = name.split(" ");
  if (words.length >= 2) {
    const firstName = words[0];
    const lastName = words[words.length - 1];
    return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
  } else {
    return ''
  }
}