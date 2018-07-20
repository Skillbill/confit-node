const http = require('http')
const https = require('https')
const qs = require('querystring')
const utils = require('./utils')

function Confit(options) {
  this.options = options
}

Confit.prototype.load = function (options) {
  opt = utils.mergeOptions(this.options, options || {})

  console.log(opt)
  let relpath = `/repo/${opt.repoId}`

  if (opt.alias) {
      relpath += `/alias/${opt.alias}`
  } else if (opt.path) {
      relpath += `/path/${this,options.path}`
  } else {

  }
  
  if (opt.ref) {
      relpath += '?' + qs.stringify({ref: opt.ref})
  }

  const agent = opt.insecure ? http : https
  return new Promise((resolve, reject) => {
      let data = ''
      agent.get({
        host: opt.hostname,
        port: opt.port,
        headers: opt.repoSecret ? {Authorization: `token ${opt.repoSecret}`} : undefined,
        path: '/api' + relpath
      }, res => {
          if (res.statusCode < 200 || res.statusCode > 299) {
              reject(new Error(`Confit call failed with status: ${res.statusCode}: ${res.statusMessage} \nat ${res.req._header}`))
          } else {
              res.on('data', chunk => { data += chunk })
              res.on('end', () => resolve(JSON.parse(data)))
          }
      }).on('error', err => reject(err))
  })
}

module.exports = Confit