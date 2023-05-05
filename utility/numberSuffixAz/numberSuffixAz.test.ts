import { numberSuffixAz } from './numberSuffixAz'

const mockNumbers = [
  { in: 3, out: '-cü' },
  { in: 4, out: '-cü' },
  { in: 100, out: '-cü' },
  { in: 500, out: '-cü' },

  { in: 6, out: '-cı' },
  { in: 40, out: '-cı' },
  { in: 60, out: '-cı' },
  { in: 90, out: '-cı' },

  { in: 9, out: '-cu' },
  { in: 10, out: '-cu' },
  { in: 30, out: '-cu' },
  { in: 1000000, out: '-cu' },

  { in: 52, out: '-ci' },
]

test.each(mockNumbers)('get suffix for the number %s', (number) => {
  expect(numberSuffixAz(number.in)).toEqual(`${number.in}${number.out}`)
})
