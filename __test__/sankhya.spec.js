const sankhya = require('../src/index')

// Get Object's own enumerable keys without ancestor's, sorted

function objectOwnKeys(o) {
  return Object.keys(o).sort()
}

// Get All Object's enumerable keys including ancestor's, sorted

function objectAllKeys(o) {
  const allKeys = []
  for (let k in o) {
    allKeys.push(k)
  }

  return allKeys.sort(), allKeys
}

test('sankhya with only input object', () => {
  const transform = sankhya({
    fullName: i => `${i.firstName} ${i.lastName}`,
    initials: i =>
      `${i.firstName.at(0).toUpperCase()}.${i.lastName.at(0).toUpperCase()}.`,
  })

  const output = transform({
    firstName: 'Bishwajit',
    lastName: 'Jha',
  })
  const expected = {fullName: 'Bishwajit Jha', initials: 'B.J.'}

  expect(output).toEqual(expected)
  expect(objectAllKeys(output)).toEqual(['fullName', 'initials'])
})

// Passing input and / or output to sankhya
test('sankhya with diff combination of input and output', () => {
  const transform = sankhya({
    fullName: i => `${i.firstName} ${i.lastName}`,
    firstInitial: i => i.firstName.at(0).toUpperCase(),
    lastInitial: i => i.lastName.at(0).toUpperCase(),
    initials: (_, o) => `${o.firstInitial}.${o.lastInitial}.`,
    fullNameBirth: (i, o) => `${o.fullName}, born ${i.DOB}`,
  })

  const output = transform({
    firstName: 'Bishwajit',
    lastName: 'Jha',
    DOB: '27 May 2000',
  })

  expect(output).toEqual({
    fullName: 'Bishwajit Jha',
    firstInitial: 'B',
    lastInitial: 'J',
    initials: 'B.J.',
    fullNameBirth: 'Bishwajit Jha, born 27 May 2000',
  })
})

// Lazy testing

test('sankhya lazy', () => {
  const transform = sankhya({
    fullName: i => `${i.firstName} ${i.lastName}`,
    firstInitial: i => i.firstName.at(0).toUpperCase(),
    lastInitial: i => i.lastName.at(0).toUpperCase(),
    initials: (_, o) => `${o.firstInitial}.${o.lastInitial}.`,
    fullNameBirth: (i, o) => `${o.fullName}, born ${i.DOB}`,
  })

  const output = transform.lazy({
    firstName: 'Bishwajit',
    lastName: 'Jha',
    DOB: '27 May 2000',
  })

  //  Initially
  expect(objectOwnKeys(output)).toEqual([])
  expect(objectAllKeys(output)).toEqual(
    [
      'fullName',
      'firstInitial',
      'lastInitial',
      'initials',
      'fullNameBirth',
    ].sort(),
  )

  //  Execute Getters

  expect(output.fullName).toBe('Bishwajit Jha')

  expect(objectOwnKeys(output)).toEqual(['fullName'])
  expect(objectAllKeys(output)).toEqual(
    [
      'fullName',
      'firstInitial',
      'lastInitial',
      'initials',
      'fullNameBirth',
    ].sort(),
  )

  expect(output.initials).toBe('B.J.')

  expect(objectOwnKeys(output)).toEqual(
    ['fullName', 'firstInitial', 'lastInitial', 'initials'].sort(),
  )
  expect(objectAllKeys(output)).toEqual(
    [
      'fullName',
      'firstInitial',
      'lastInitial',
      'initials',
      'fullNameBirth',
    ].sort(),
  )

  expect(output.fullNameBirth).toBe('Bishwajit Jha, born 27 May 2000')

  expect(objectOwnKeys(output)).toEqual(objectAllKeys(output))
})
