import * as utils from './utils'
import Confit from './confit'

let nodeEnv = typeof process === 'undefined' ? {} : process.env

const defaults = {
  serverUrl: nodeEnv['CONFIT_HOST'] || 'https://confit.skillbill.net/api',
  repoSecret: nodeEnv['CONFIT_REPO_SECRET'],
  repoId: nodeEnv['CONFIT_REPO_ID'],
}

function createInstance(options) {
  return new Confit(options)
}

let confit = createInstance(defaults)

confit.create = function (options) {
  return new Confit(utils.mergeOptions(defaults, options || {}))
}

export default confit
