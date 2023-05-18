import dotenv from 'dotenv'
import fs from 'fs'
import app from './app'
import https from 'https'

dotenv.config()

// Colocando certificado ssl na api
const credentials = {
  key: fs.readFileSync('src/cert/key.pem'),
  cert: fs.readFileSync('src/cert/cert.pem'),
}

const PORT = parseInt(`${process.env.PORT || 4001}`)

// cria-se o app pelo node
// eslint-disable-next-line no-unused-vars
const server = https.createServer(credentials, app).listen(PORT, () => {
  console.clear()
  console.log(`Server running at ${PORT}.`)
})
