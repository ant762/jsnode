const express = require("express") 
const app = express();              
const port = 3000;

const usuarios = [
    {"id": 1, "nome": "Otavio", "idade": 20, "senha": "123"},
    {"id": 1, "nome": "Admin", "idade": 20, "senha": "1234"}
]

app.listen(port, () => {
    console.log("Servidor rodando: http://localhost:3000")
})

app.get("/", (request, response) => {
    response.send("Primeiro servidor AI PSII 2025/1 V1  - Malwee")
})

app.get("/usuarios", (req, res) => {
    res.send(usuarios);
})

console.log("oi gente!")
console.log("coiso.")