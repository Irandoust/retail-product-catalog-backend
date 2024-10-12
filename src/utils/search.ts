const getMinimumDistance = (sourceStr: string, targetStr: string): number => {
  const sourceLength = sourceStr.length;
  const targetLength = targetStr.length;

  const distMatrix: number[][] = Array(sourceLength + 1)
    .fill(null)
    .map(() => Array(targetLength + 1).fill(null));

  for (let i = 0; i <= sourceLength; i++) {
    distMatrix[i][0] = i;
  }
  for (let j = 0; j <= targetLength; j++) {
    distMatrix[0][j] = j;
  }

  for (let i = 1; i <= sourceLength; i++) {
    for (let j = 1; j <= targetLength; j++) {
      const cost = sourceStr[i - 1] === targetStr[j - 1] ? 0 : 1;

      let minDist = Math.min(
        distMatrix[i - 1][j] + 1,
        distMatrix[i][j - 1] + 1,
        distMatrix[i - 1][j - 1] + cost,
      );

      if (
        i > 1 &&
        j > 1 &&
        sourceStr[i - 1] === targetStr[j - 2] &&
        sourceStr[i - 2] === targetStr[j - 1]
      ) {
        minDist = Math.min(minDist, distMatrix[i - 2][j - 2] + 1);
      }

      distMatrix[i][j] = minDist;
    }
  }

  return distMatrix[sourceLength][targetLength];
};

export const fuzzySearch = <T>(
  searchTerm: string,
  records: T[],
  maxDistance: number,
  getString: (record: T) => string,
): T[] => {
  const matches: { record: T; distance: number }[] = [];

  for (const record of records) {
    const targetString = getString(record);
    const distance = getMinimumDistance(searchTerm, targetString);

    if (distance <= maxDistance) {
      matches.push({ record, distance });
    }
  }

  matches.sort((a, b) => a.distance - b.distance);

  return matches.map((match) => match.record);
};
