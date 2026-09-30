import { describe, expect, it } from 'vitest';
import { pickRandom } from '../random';

describe('pickRandom', () => {
  it('picks by the random number', () => {
    expect(pickRandom(['a', 'b', 'c'], undefined, () => 0)).toBe('a');
    expect(pickRandom(['a', 'b', 'c'], undefined, () => 0.99)).toBe('c');
  });

  it('never repeats the previous item when there is another one', () => {
    expect(pickRandom(['a', 'b'], 'a', () => 0)).toBe('b');
    expect(pickRandom(['a'], 'a', () => 0)).toBe('a');
  });

  it('returns undefined for an empty list', () => {
    expect(pickRandom([])).toBeUndefined();
  });
});
