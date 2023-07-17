import dotenv from 'dotenv'
import fs from 'fs'
import app from './app'
import https from 'https'
import path from 'path'

dotenv.config()

// Colocando certificado ssl na api
const credentials = {
  key: fs.readFileSync(path.join(__dirname, '/cert/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '/cert/cert.pem')),
}

const PORT = parseInt(`${process.env.PORT || 4001}`)

/* Iniciar o servidor sem https */
app.listen(PORT, () => {
  console.clear()
  console.log(`Server running at ${PORT}.`)
})

/* Iniciando o servidor com https */
/* const server = https.createServer(credentials, app).listen(PORT, () => {
  console.clear()
  console.log(`Server running at ${PORT}.`)
}) */
