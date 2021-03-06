const sankhya = require('../src/index')

const {objectAllKeys, objectOwnKeys} = require('./utils')

describe('Immediate Transformation with sankhya', () => {
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
})
