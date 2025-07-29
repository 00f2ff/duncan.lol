export const uuidToPageId = (uuid: string): string => uuid.replace(/-/g, "");

/**
 * Replace invisible / uncommon Unicode characters.
 *
 * Replacement occurs on a case-by-case basis since I don't want to do a deep dive into Unicode
 *
 * @param copy
 */
export function replaceWeirdCharacters(copy: string): string {
  const fixedSpaces = copy.replace(/[\u00A0]/gu, " ");
  const fixedQuotes = fixedSpaces.replace(/[\u2019]/gu, "'");
  return fixedQuotes;
}
