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

module.exports = {
  objectOwnKeys,
  objectAllKeys,
}
