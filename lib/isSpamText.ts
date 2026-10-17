export function isSpamText(text: string) {
  const words = text.trim().split(/\s+/);

  // No spaces usually means random characters
  if (words.length === 1 && text.length > 500) {
 

    return true;
  }

  // Too many uppercase/lowercase random patterns
  const letters = text.match(/[a-zA-Z]/g)?.length ?? 0;

  const ratio = letters / text.length;

  return ratio < 0.5;
}
