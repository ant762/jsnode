const express = require("express") 
const app = express();              
const port = 3000;

app.use(express.json()); // Agora, as requisições podem receber JSON's.

const usuarios = [
    {"id": 1, "nome": "Otavio", "idade": 20, "senha": "123"},
    {"id": 1, "nome": "Admin", "idade": 20, "senha": "1234"}
]

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
    //body - corpo da requisição
    const novoUsuario = req.body;
    novoUsuario.id = usuarios.length + 1;
    usuarios.push(novoUsuario);

    res.status(201).send(novoUsuario) // 201 - created
})

//atualizar um usuário

app.put("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const novoUsuario = req.body;
    const index = usuarios.findIndex(usuario => usuario.id == id);

    if(index != null){
        usuarios[index] = novoUsuario;
        res.status(204).send(novoUsuario);
    } else {
        res.status(404).send("Usuário não encontrado!")
    }
})

//deletar um usuário (NÃO FAÇA!)

app.delete("/usuarios/delete/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(usuario => usuario.id == id);

    if (index != null) {
        usuarios.splice(index, 1); // slice copia, slice deleta.
        res.status(204).send(`Usuário com id: ${id} removido com sucesso!`)
    } else {
        res.status(404).send("Usuário não encontrado!")
    }
})
app.listen(port, () => {
    console.log("Servidor rodando: http://localhost:3000")
})

// cabo