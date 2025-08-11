const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // para parsear JSON no corpo da requisição

const tarefas = [
    { id: 1, titulo: "estudar express", concluida: false },
    { id: 2, titulo: "fazer exercicios", concluida: false },
];

// Inicializa o nextId com o maior ID existente + 1
let nextId = tarefas.reduce((maxId, tarefa) => Math.max(maxId, tarefa.id), 0) + 1;

app.get("/", (request, response) => {
    response.send("atividades do otavio");
});

// READ ALL
app.get("/tarefas", (req, res) => {
    res.json(tarefas);
});

// READ ONE
app.get("/tarefas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const tarefaPorId = tarefas.find(tarefa => tarefa.id === id);

    if (tarefaPorId) {
        res.json(tarefaPorId);
    } else {
        res.status(404).send("Tarefa não encontrada.");
    }
});

// CREATE
app.post("/tarefas", (req, res) => {
    const { titulo, concluida } = req.body;

    if (!titulo || typeof concluida !== 'boolean') {
        return res.status(400).json({ message: 'Título e status de conclusão são obrigatórios.' });
    }

    const novaTarefa = {
        id: nextId++,
        titulo,
        concluida,
    };

    tarefas.push(novaTarefa);

    res.status(201).json(novaTarefa);
});

// UPDATE
app.put("/tarefas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, concluida } = req.body;

    const tarefaIndex = tarefas.findIndex(tarefa => tarefa.id === id);

    if (tarefaIndex === -1) {
        return res.status(404).send("Tarefa não encontrada.");
    }

    if (!titulo || typeof concluida !== 'boolean') {
        return res.status(400).json({ message: 'Título e status de conclusão são obrigatórios.' });
    }

    // Atualiza os dados
    tarefas[tarefaIndex] = { id, titulo, concluida };

    res.json(tarefas[tarefaIndex]);
});

// DELETE
app.delete("/tarefas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const tarefaIndex = tarefas.findIndex(tarefa => tarefa.id === id);

    if (tarefaIndex === -1) {
        return res.status(404).send("Tarefa não encontrada.");
    }

    tarefas.splice(tarefaIndex, 1);
    res.status(204).send(); // sem conteúdo no retorno
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
