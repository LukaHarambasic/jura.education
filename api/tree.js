'use strict'
const { join } = require('path')
const directoryTree = require('../helper/directoryTree')

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const handler = (req, res) => {
  console.log('[HANDLER] tree')
  const path = join(__dirname, './content/')
  const tree = directoryTree(path)
  res.status(200).send(tree)
}

module.exports = allowCors(handler)
