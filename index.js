const port = 3000
const host = "localhost"
const express = require("express")
const app = express()
const consign = require("consign")

console.log("CHEGOU AQUI")
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


consign({ cwd: 'src' })
    // .then("controllers")
    // .include("routes")
    .into(app)

app.listen(port, host, () => {
    console.log("Aplicação rodando no endereço: " + host + ":" + port)
})