export function extractNumeralContent(text: string): number | null {
  // Use a regular expression to find digits in the text
  const regex = /\d+/;
  const match = text.match(regex);

  // If a match is found, return the first match as a number
  if (match && match.length > 0) {
    return parseInt(match[0], 10);
  }

  // If no match is found, return null or any other appropriate value as needed
  return null;
}

export function extractJSONFromText(text: string) {
  // Define a regular expression to match JSON objects
  const regex = /{.*?}/g;

  // Find all matches of JSON objects in the text
  const matches = text.match(regex);

  // If matches are found, parse the first match and return it as a JavaScript object
  if (matches && matches.length > 0) {
    try {
      return JSON.parse(matches[0]);
    } catch (error) {
      return null;
    }
  }

  // If no matches are found, return null or any other appropriate value as needed
  return null;
}

export function logout() {
  window.localStorage.removeItem('isAdmin')
  window.localStorage.removeItem('access_token')
  window.localStorage.removeItem('userId')
}