const express = require("express") 
const app = express();              
const port = 3000;

app.use(express.json()); // Agora, as requisições podem receber JSON's.

const usuarios = [
    {"id": 1, "nome": "Otavio", "idade": 20, "senha": "123"},
    {"id": 1, "nome": "Admin", "idade": 20, "senha": "1234"}
]

app.listen(port, () => {
    console.log("Servidor rodando: http://localhost:3000")
})

app.get("/", (request, response) => {
    response.send("Sucesso!")
})

app.get("/usuarios", (req, res) => {
    res.send(usuarios);
})
//buscar usuário
app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id); // parse - string para legível

    const usuarioPorId = usuarios.find(usuarios => usuarios.id == id)

    if (usuarioPorId != null) {
        res.send(usuarioPorId)
    } else {
        res.status(404).send("Usuário não encontrado")
    }
})

//criar usuário
app.post("/usuarios", (req, res) => {
    const novoUsuario = req.body;
    novoUsuario.id = usuarios.length + 1;
    usuarios.push(novoUsuario);

    res.status(201).send(novoUsuario) // 201 - created
})

console.log("oi gente!")
console.log("coiso.")