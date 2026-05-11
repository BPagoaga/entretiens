/**
 * Return domain name from location.hostname
 * Useful for cookies domain
 */
export const getDomain = (): string => {
  if (!window?.location) {
    return '';
  }
  const parts = location.hostname.split('.');
  if (parts.length > 1) {
    parts.shift();
  }
  return parts.join('.');
};
