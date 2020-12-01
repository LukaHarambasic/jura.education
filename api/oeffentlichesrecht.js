'use strict'
const { join } = require('path')
const request = require('../helper/request')
const directoryTree = require('../helper/directoryTree')

const SUB_PATH = 'Öffentliches Recht'

const handler = (req, res) => {
  console.debug('Requesting /oeffentlichsrecht')
  const path = join(__dirname, `./content/${SUB_PATH}/`)
  const tree = directoryTree(path)
  res.status(200).send(tree)
}

module.exports = request(handler)
