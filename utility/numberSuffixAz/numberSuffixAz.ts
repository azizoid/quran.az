export const numberSuffixAz = (value: number) => {

  const lastDigit = value % 10

  if ([3, 4].includes(lastDigit) || [100, 200].includes(value)) {
    return value + "-cü"
  }

  if ([6].includes(lastDigit) || [40, 60, 90].includes(value)) {
    return value + "-cı"
  }

  if ([9].includes(lastDigit) || [10, 30, 1000000].includes(value)) {
    return value + "-cu"
  }

  return value + "-ci"
}