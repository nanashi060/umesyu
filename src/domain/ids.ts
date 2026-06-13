export function createLocalId(prefix: string, now = Date.now()) {
  const randomPart = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${now.toString(36)}_${randomPart}`;
}

