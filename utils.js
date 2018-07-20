function mergeOptions (base, top) {
  let res = Object.assign({}, base)
  Object.keys(top).forEach(key => res[key] = top[key])
  return res
}

module.exports = {
  mergeOptions
}