const sankhya = require('../src/index')

// Get Object's own enumerable keys without ancestor's, sorted

function objectOwnKeys(o) {
  return Object.keys(o).sort()
}

// Get All Object's enumerable keys including ancestor's, sorted

function objectAllKeys(o) {
  const allKeys = []
  for (let k in o) {allKeys.push(k) }

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
