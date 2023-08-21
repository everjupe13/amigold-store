export const keepNumbersOnly = (value: string) => {
  return value.replaceAll(/\D/, '')
}

export const formatPhoneNumber = (rawPhone: string) => {
  const phone = keepNumbersOnly(rawPhone)

  const validRussianPhone = phone.length === 11
  if (!validRussianPhone) {
    return '—'
  }

  return `+7 (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(
    7,
    9
  )}-${phone.slice(9, 11)}`
}
