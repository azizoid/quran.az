import { soorahAyahTitle } from './soorahAyahTitle'

test('Render SoorahAyahTitle', () => {
  expect(soorahAyahTitle(96, 1)).toMatchSnapshot()
})
