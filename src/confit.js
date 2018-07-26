import axios from 'axios'
import * as utils from './utils'

function Confit(options) {
  this.options = options
}

Confit.prototype.load = function (options) {
  let opt = utils.mergeOptions(this.options, options || {})

  let relpath = `/repo/${opt.repoId}`

  if (opt.alias) {
    relpath += `/alias/${opt.alias}`
  } else if (opt.path) {
    relpath += `/path/${opt.path}`
  } else {

  }

  let req = {
    method: 'get',
    url: opt.serverUrl + relpath,
    headers: opt.repoSecret ? {Authorization: `token ${opt.repoSecret}`} : undefined,
  }

  if (opt.ref) {
    req.params = {ref: opt.ref}
  }

  return axios(req).then(res => res.data)
  .catch(err => {
    if (err.response) {
      throw new Error(`Confit call failed with status: ${err.response.status}\nwhile sending request: ${JSON.stringify(req)}` +
      `\ndata: ${JSON.stringify(err.response.data)}`)
    } else if (err.request) {
      throw new Error('No response from confit server')
    } else {
      throw new Error(`Axios error: ${err.message}\nwhile forming request: ${JSON.stringify(req)}`)
    }
  })
}

export default Confit