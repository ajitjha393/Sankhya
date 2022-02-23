const sankhya = require('../src/index')

test('sankhya with only input object', () => {
  const transform = sankhya({
    fullName: i => `${i.firstName} ${i.lastName}`,
    initials: i =>
      `${i.firstName.at(0).toUpperCase()}.${i.lastName.at(0).toUpperCase()}.`,
  })

  const {fullName, initials} = transform({
    firstName: 'Bishwajit',
    lastName: 'Jha',
  })
  const expected = {fullName: 'Bishwajit Jha', initials: 'B.J.'}

  expect({fullName, initials}).toEqual(expected)
})
