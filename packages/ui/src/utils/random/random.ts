/** A random item of `items`, other than `previous` when there is a choice; `undefined` if empty. */
export const pickRandom = <T>(
  items: readonly T[],
  previous?: T,
  random: () => number = Math.random,
): T | undefined => {
  const pool = items.length > 1 ? items.filter((item) => item !== previous) : items;
  return pool[Math.floor(random() * pool.length)];
};
