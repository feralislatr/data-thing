export function toSnakeCase(str: string) {
  if (!str) return ''

  const regex = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g

  return (
    str
      .match(regex)
      ?.map(word => word.toLowerCase())
      .join('_') ?? str
  )
}

export function getShortcode(str: string) {
  return str.replace(/-/g, '_').slice(0, 48)
}
