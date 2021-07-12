import type { Options, QueryStringObj } from '../types'
import { identity, isNil, join, kebabCase, mapKeys, omitBy } from './helpers'

const normalizeUrl = (url: string): string =>
  url
    .replace(/[\/]+/g, '/')
    .replace(/^(.+):\//, '$1://')
    .replace(/\/(\?|&)/g, '$1')
    .replace(/\/$/, '')

const filterQuery = (query?: QueryStringObj): QueryStringObj =>
  omitBy(isNil, query ?? {}) as QueryStringObj

const parseKeys = (opts: Options, query: QueryStringObj): QueryStringObj =>
  mapKeys(query, opts.queryStringParser || identity)

const normalizeQueryString = (opts: Options): QueryStringObj =>
  parseKeys(opts, filterQuery(opts.query))

const stringifyQueryString = (query: QueryStringObj): string =>
  Object.entries(query)
    .map(([key, val]) =>
      Array.isArray(val)
        ? val.map((v) => `${key}[]=${v}`).join('&')
        : `${key}=${val}`,
    )
    .join('&')

const getGeneratedPath = (opts: Options): string => {
  const name = (opts.urlParser || kebabCase)(opts.name || '')
  return join('/', name, opts.id)
}

const getCustomPath = (opts: Options): string => {
  const id = opts.id ? String(opts.id) : ':id'
  return opts.customPath?.replace(/\:id/g, id) || ''
}

const buildUrl = (opts: Options): string => {
  const path = getCustomPath(opts) || getGeneratedPath(opts)
  return join('/', opts.baseUrl, path)
}

export default function buildFullUrl(opts: Options): string {
  const query = normalizeQueryString(opts)
  const url = join('?', buildUrl(opts), stringifyQueryString(query))
  return normalizeUrl(url)
}
