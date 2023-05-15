export const numberSuffixAz = (value: number) => {
  const lastDigit = value % 10

  if ([3, 4].includes(lastDigit) || (value % 1000).toString().includes('00')) {
    return value + '-cü'
  }

  if ([6].includes(lastDigit) || [40, 60, 90].includes(value)) {
    return value + '-cı'
  }

  if ([9].includes(lastDigit) || [10, 30, 1000000].includes(value)) {
    return value + '-cu'
  }

  return value + '-ci'
}
