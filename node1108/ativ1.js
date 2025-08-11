const express = require('express'); // framework do nodejs
const app = express(); // transforma a framework em um objeto.
const port = 3000; // Variável para armazenar a porta

const tarefas = [
    {"id": 1, "titulo": "estudar express", "concluida": false},
    {"id": 2, "titulo": "fazer exercicios", "concluida": false},
]

app.get("/", (request, response) => {
    response.send("atividades do otavio")
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})

app.get("/tarefas", (req, res) => {
    res.json(tarefas)
})

app.get("/tarefas/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const tarefaporId = tarefas.find(tarefas => tarefas.id == id)
    if (tarefaporId != null) {
        res.send(tarefaporId)
    } else {
        res.status(404).send("Tarefa não encontrada.")
    }
})


app.post("/tarefas", (req, res) => {
    const { titulo, concluida } = req.body;

    if (!titulo || typeof concluida !== 'boolean') {
        return res.status(400).json({ message: 'Descrição e status de conclusão são obrigatórios.' });
    }

    const novaTarefa = {
        id: nextId++, // Atribui o ID e incrementa
        descricao,
        concluida,
    };

    tarefas.push(novaTarefa); //enviar o troço

    res.status(201).json(novaTarefa);
});