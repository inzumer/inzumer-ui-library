import { pickRandom } from '@utils';
import { useEffect, useState } from 'react';

/** A random message of `messages`, replaced by another one every `intervalMs` (no immediate repeats). */
export const useRotatingMessage = (
  messages: readonly string[] | undefined,
  intervalMs: number,
): string | undefined => {
  const [message, setMessage] = useState(() => (messages ? pickRandom(messages) : undefined));

  useEffect(() => {
    if (!messages || messages.length < 2) {
      return undefined;
    }
    const id = setInterval(
      () => setMessage((current) => pickRandom(messages, current)),
      intervalMs,
    );
    return () => clearInterval(id);
  }, [messages, intervalMs]);

  return message;
};
