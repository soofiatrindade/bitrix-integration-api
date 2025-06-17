import express from 'express'
import routes from './src/routes/index.js'

const app = express()
const port = process.env.PORT || 3000;
const host = 'localhost'

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', routes)

app.listen(port, host, () => {
    console.log(`🚀 Servidor rodando em http://${host}:${port}`)
})
