/** `id` and the same `data-testid`, for analytics triggers and tests; nothing without an id. */
export const idAttributes = (id?: string) => (id ? { id, 'data-testid': id } : {});
