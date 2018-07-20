const utils = require('./utils')
const Confit = require('./confit')

const defaults = {
    hostname: process.env['CONFIT_HOST'] || 'confit.skillbill.net',
    port: process.env['CONFIT_PORT'],
    repoSecret: process.env['CONFIT_REPO_SECRET'],
    repoId: process.env['CONFIT_REPO_ID'],
    insecure: process.env['CONFIT_INSECURE'] || false
}

function createInstance(options) {
    return new Confit(options)
}

let confit = createInstance(defaults)

confit.create = function (options) {
    return new Confit(utils.mergeOptions(defaults, options || {}))
}

module.exports = confit
