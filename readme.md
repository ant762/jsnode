# NODE.js

## Sumário

- [Comandos](#comandos)
- [Frameworks](#frameworks)
- [Servidor Básico](#servidor-básico)
- [Fetch Client](#fetch-client)
- [Busca de conteúdo](#busca-de-conteúdo)

### Comandos

```bash
// mkdir servidor.js # cria a pasta
// cd servidor.js # entra na pasta
// npm install express ##- biblioteca
// node nome.js ##- roda servidor
// npm init -y ##- inicia o servidor/modo padrão
// ctrl c ##- encerra o servidor
// npm servidor.js --watch ## atualiza o servidor automaticamente (salve)
```

### Frameworks

- **Express:** 

```bash
npm install express
```

### Servidor básico:

- 

```javascript
const express = require('express'); // framework do nodejs
const app = express(); // transforma a framework em um objeto.
const port = 3000; // Variável para armazenar a porta

app.linsten(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})
```

### Localizações:

De forma resumida, isso serve para definir locais diferentes. tipo www.com/usuarios.

```javascript
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

```

### Fetch Client

Serve para organizar todas as informações relacionadas ao servidor.
Por exemplo, se alguém cadastra uma conta em seu website, as informações
de login serão armazenadas no Fetch Client.

```json
[
    {
        "id": 1,
        "nome": "Otavio",
        "idade": 20,
        "senha": "123"
    },
    {
        "id": 1,
        "nome": "Admin",
        "idade": 20,
        "senha": "1234"
    }
]
```

### Busca de conteúdo

Podemos destacar informações específicas em páginas/pesquisas. O YouTube funciona de forma parecida, pois, podemos pesquisar por vídeos de acordo coom o gênero, ou pesquisar por nomes de usuários:

```javascript
(tipo usuarios.find(usuarios.nome = canalDoYoutube))

//ou

app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id); // parse - string para legível

    const usuarioPorId = usuarios.find(usuarios => usuarios.id == id)
})
```

Também existe a possibilidade de adicionar uma resposta 404 (erro) caso o elemento não seja encontrado, por exemplo:

```javascript
app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id); // parse - string para legível

    const usuarioPorId = usuarios.find(usuarios => usuarios.id == id)

    if (usuarioPorId != null) {
        res.send(usuarioPorId)
    } else {
        res.status(404).send("Usuário não encontrado")
    }
})
```

### O que foi feito aqui?

Primeiramente, estou criando uma função de requisição e resposta.
A requisição é "Usuários com ID: 1". Caso não seja encontrado, erro 404.