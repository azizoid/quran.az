import { getView } from './getView'

test('get Soorah view', () => {
  const data = getView({
    s: 1,
  })

  expect(data.view).toEqual('soorah')
})

test('get Ayah view', () => {
  const data = getView({
    s: 1,
    a: 5,
  })

  expect(data.view).toEqual('ayah')
})

test('get Search Query view', () => {
  const data = getView({
    s: 0,
    q: 'Musa',
  })

  expect(data.view).toEqual('search')
})

test('get Search Query is short', () => {
  const data = getView({
    q: 'M',
  })

  expect(data.q).toEqual(null)
  expect(data.view).toEqual('empty')
})

test('get Empty view', () => {
  const data = getView({})

  expect(data.view).toEqual('empty')
})

test('render wrong translator', () => {
  const data = getView({
    t: 3,
  })

  expect(data.t).toEqual(3)
})
