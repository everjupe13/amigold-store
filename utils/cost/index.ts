const _separateThousands = (numberString: string) => {
  const withTrailingZeros = numberString.replace(/\d(?=(\d{3})+\.)/g, '$& ')
  // const _withoutTrailingZeros = withTrailingZeros.replace(/\.00$/, '')
  return withTrailingZeros
}

export const separateThousands = (number: number) => {
  return number ? _separateThousands(number.toFixed(2)) : '0'
}

export const formatRubles = (number?: number) => {
  return `${separateThousands(number || 0)} ₽`
}
