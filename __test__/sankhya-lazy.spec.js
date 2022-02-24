const sankhya = require('../src/index')

const {objectAllKeys, objectOwnKeys} = require('./utils')

describe('Lazy Transformation with sankhya', () => {
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
})
