function wordsFromAnyCase(str: string): string[] {
  const CASE_REGEX =
    /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g

  return str.match(CASE_REGEX) || []
}
function kebabCase(str: string) {
  return wordsFromAnyCase(str)
    .map((x) => x.toLowerCase())
    .join('-')
}
function snakeCase(str: string) {
  return wordsFromAnyCase(str)
    .map((x) => x.toLowerCase())
    .join('_')
}

function isNil(val: unknown): boolean {
  return val === undefined || val === null || val !== val
}

function compact(...args: any[]): any[] {
  return args.filter(Boolean)
}

function mapKeys(obj: Record<string, unknown>, fn: (k: string) => string) {
  return Object.keys(obj).reduce((acc: Record<string, unknown>, k) => {
    acc[fn(k)] = obj[k]
    return acc
  }, {})
}

function omitBy(
  fn: (v: unknown) => boolean,
  obj: Record<string, unknown>,
): Record<string, unknown> {
  const filtered = Object.entries(obj).filter(([_k, v]) => !fn(v))
  return Object.fromEntries(filtered)
}

function identity<T>(a: T): T {
  return a
}

function join(separator: string, ...args: unknown[]) {
  return compact(...args).join(separator)
}

export { identity, isNil, join, kebabCase, mapKeys, omitBy, snakeCase }
