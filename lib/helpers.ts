function wordsFromAnyCase(str: string): string[] {
  const CASE_REGEX =
    /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g

  return str.match(CASE_REGEX) ?? []
}
function kebabCase(str: string): string {
  return wordsFromAnyCase(str)
    .map((x) => x.toLowerCase())
    .join('-')
}
function snakeCase(str: string): string {
  return wordsFromAnyCase(str)
    .map((x) => x.toLowerCase())
    .join('_')
}

function isNil(val: unknown): boolean {
  return val === undefined || val === null || val !== val
}

function compact<T>(...args: T[]): T[] {
  return args.filter(Boolean)
}

function mapKeys<T>(
  fn: (k: string) => string,
  obj: Record<string, T>,
): Record<string, T> {
  return Object.keys(obj).reduce((acc: Record<string, T>, k) => {
    acc[fn(k)] = obj[k]
    return acc
  }, {})
}

function omitBy<T>(
  fn: (v: T) => boolean,
  obj: Record<string, T>,
): Record<string, T> {
  const filtered = Object.entries(obj).filter(([_k, v]) => !fn(v))
  return Object.fromEntries(filtered)
}

function identity<T>(a: T): T {
  return a
}

function join(separator: string, ...args: unknown[]): string {
  return compact(...args).join(separator)
}

export { identity, isNil, join, kebabCase, mapKeys, omitBy, snakeCase }
