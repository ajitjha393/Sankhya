const DATA_ATTRIBUTE = Symbol('SANKHYA_DATA_ATTRIBUTE')

const pipe =
  (...fn) =>
  args =>
    fn.reduce((f, g) => g(f), args)

function sankhya(outputTemplate) {
  const memoizedDataBinder = memoizedGetter(outputTemplate)
  const transform = i => materialize(memoizedDataBinder(i))
  transform.lazy = i => memoizedDataBinder(i)
  return transform
}

function materialize(t) {
  for (let k in t) {
    void t[k]
  }
  return t
}

function memoizedGetter(outputTemplate) {
  return pipe(generateGetterProtoDefinition, generateDataBinder)(outputTemplate)
}

function applyTransformation(obj, fn) {
  return Object.entries(obj).reduce(
    (acc, [k, v]) => ({...acc, [k]: fn(k, v)}),
    {},
  )
}

function generateGetterProtoDefinition(outputTemplate) {
  const proto = applyTransformation(outputTemplate, (k, fn) => ({
    enumerable: true,
    get() {
      const input = this[DATA_ATTRIBUTE]
      const output = this
      const value = fn(input, output)
      Object.defineProperty(this, k, {value, enumerable: true})
      return value
    },
  }))
  return Object.defineProperties({}, proto)
}

function generateDataBinder(outputProto) {
  return input => {
    const output = Object.create(outputProto)
    Object.defineProperty(output, DATA_ATTRIBUTE, {
      value: dataAttributeProxy(input),
    })
    return output
  }
}

function dataAttributeProxy(data) {
  return new Proxy(data, {
    get: (t, p, r) => {
      if (p in t) {
        return t[p]
      }
      throw new Error(`Data object is missing key ${key}`)
    },
  })
}

module.exports = sankhya
