/**
 * Calculates the Damerau-Levenshtein distance between two strings.
 * This measures the number of edits (insertions, deletions, substitutions, or transpositions)
 * required to change one string into the other.
 *
 * @param {string} sourceStr - The source string to compare.
 * @param {string} targetStr - The target string to compare against.
 * @returns {number} The minimum number of edits required to transform the source string into the target string.
 */
const getMinimumDistance = (sourceStr: string, targetStr: string): number => {
  const sourceLength = sourceStr.length;
  const targetLength = targetStr.length;

  // Initialize a distance matrix to store edit distances
  const distMatrix: number[][] = Array(sourceLength + 1)
    .fill(null)
    .map(() => Array(targetLength + 1).fill(null));

  // Populate the first row and column of the matrix
  for (let i = 0; i <= sourceLength; i++) {
    distMatrix[i][0] = i; // Edit distance of converting the first i characters of source to an empty string
  }
  for (let j = 0; j <= targetLength; j++) {
    distMatrix[0][j] = j; // Edit distance of converting an empty string to the first j characters of target
  }

  // Iterate over the source and target strings, filling the matrix
  for (let i = 1; i <= sourceLength; i++) {
    for (let j = 1; j <= targetLength; j++) {
      // Calculate the cost: 0 if characters match, 1 if they don't
      const cost = sourceStr[i - 1] === targetStr[j - 1] ? 0 : 1;

      // Find the minimum of the possible edit operations (insertion, deletion, substitution)
      let minDist = Math.min(
        distMatrix[i - 1][j] + 1, // Deletion
        distMatrix[i][j - 1] + 1, // Insertion
        distMatrix[i - 1][j - 1] + cost, // Substitution
      );

      // Handle transpositions (swapping of adjacent characters)
      if (
        i > 1 &&
        j > 1 &&
        sourceStr[i - 1] === targetStr[j - 2] &&
        sourceStr[i - 2] === targetStr[j - 1]
      ) {
        minDist = Math.min(minDist, distMatrix[i - 2][j - 2] + 1);
      }

      // Update the matrix with the minimum distance for this pair of characters
      distMatrix[i][j] = minDist;
    }
  }

  // The final cell contains the Damerau-Levenshtein distance between the two strings
  return distMatrix[sourceLength][targetLength];
};

/**
 * Performs a fuzzy search on a list of records by comparing the search term to each record's string representation.
 * The Damerau-Levenshtein distance is used to determine how closely the search term matches each record.
 * Only records within the specified maximum distance are returned, sorted by their distance.
 *
 * @template T - The type of records being searched.
 * @param {string} searchTerm - The term to search for.
 * @param {T[]} records - The array of records to search within.
 * @param {number} maxDistance - Maximum allowed edit distance (fuzziness threshold).
 * @param {(record: T) => string} getString - Function to extract the string to compare from each record.
 * @returns {T[]} An array of records that match the search term, sorted by their Damerau-Levenshtein distance.
 */
export const fuzzySearch = <T>(
  searchTerm: string,
  records: T[],
  maxDistance: number,
  getString: (record: T) => string,
): T[] => {
  const matches: { record: T; distance: number }[] = [];

  // Iterate through each record and calculate the distance
  for (const record of records) {
    const targetString = getString(record); // Extract the string from the record using the provided function
    const distance = getMinimumDistance(searchTerm, targetString); // Calculate the Damerau-Levenshtein distance

    // If the distance is within the allowed threshold, add to matches
    if (distance <= maxDistance) {
      matches.push({ record, distance });
    }
  }

  // Sort the matches by their distance (ascending order)
  matches.sort((a, b) => a.distance - b.distance);

  // Return the sorted records without their distances
  return matches.map((match) => match.record);
};
