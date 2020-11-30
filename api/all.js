'use strict'
const { join } = require('path')
const request = require('../helper/request')
const directoryTree = require('../helper/directoryTree')

const handler = (req, res) => {
  console.log('Requesting all')
  const path = join(__dirname, './content/')
  const tree = directoryTree(path)
  res.status(200).send(tree)
}

module.exports = request(handler)
