import dotenv from 'dotenv'
dotenv.config()

const PORT = parseInt(`${process.env.PORT || 3001}`)

import app from './app'

app.listen(PORT, '127.0.0.1',()=>{
    console.clear()
    console.log(`Server running at ${PORT}.`)
})