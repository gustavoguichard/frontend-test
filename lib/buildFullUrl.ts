import type { Options, QueryStringObj } from '../types'
import { identity, isNil, join, kebabCase, mapKeys, omitBy } from './helpers'

function joinUrl(...args: string[]) {
  return join('?', ...args)
    .replace(/[\/]+/g, '/')
    .replace(/^(.+):\//, '$1://')
    .replace(/\/(\?|&)/g, '$1')
    .replace(/\/$/, '')
}

function normalizeQueryString(opts: Options): QueryStringObj {
  const parser = opts.queryStringParser || identity
  const filtered = omitBy(isNil, opts.query || {})
  return mapKeys(filtered, parser) as QueryStringObj
}

function stringifyQueryString(query: QueryStringObj) {
  return Object.entries(query)
    .map(([key, val]) =>
      Array.isArray(val)
        ? val.map((v) => `${key}[]=${v}`).join('&')
        : `${key}=${val}`,
    )
    .join('&')
}

function buildUrl(opts: Options): string {
  const name = (opts.urlParser || kebabCase)(opts.name || '')
  const id = opts.id ? String(opts.id) : ':id'
  const path = opts.customPath || join('/', name, opts.id)
  return join('/', opts.baseUrl || '', path).replace(/\:id/g, id)
}

export default function buildFullUrl(opts: Options) {
  const url = buildUrl(opts)
  const query = normalizeQueryString(opts)
  const queryString = stringifyQueryString(query)
  return joinUrl(url, queryString)
}
