export const indexBy = <T, K extends PropertyKey>(
  array: T[],
  indexer: (item: T) => K
): Record<K, T> => {
  return array.reduce((memo, item) => {
    memo[indexer(item)] = item;
    return memo;
  }, {} as Record<K, T>);
};

export const prop = <K extends PropertyKey>(key: K) => <T>(
  object: Record<K, T>
): T => object[key];
