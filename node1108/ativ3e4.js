const express = require('express');
const app = express();

app.use(express.json());

let posts = [
  { id: 1, titulo: 'Primeiro Post', conteudo: 'Conteúdo do primeiro post...', autor: 'Carlos' },
  { id: 2, titulo: 'Segundo Post', conteudo: 'Olá, mundo!', autor: 'Ana' }
];

let comentarios = [
  { id: 1, post_id: 1, texto: 'Ótimo post!' }
];

function gerarId(array) {
  return array.length > 0 ? Math.max(...array.map(item => item.id)) + 1 : 1;
}

app.post('/posts', (req, res) => {
  const { titulo, conteudo, autor } = req.body;
  if (!titulo || !conteudo || !autor) {
    return res.status(400).json({ error: 'titulo, conteudo e autor são obrigatórios' });
  }
  const novoPost = { id: gerarId(posts), titulo, conteudo, autor };
  posts.push(novoPost);
  return res.status(201).json(novoPost);
});

app.get('/posts/autor/:autor', (req, res) => {
  const autorBusca = req.params.autor.toLowerCase();
  const resultados = posts.filter(post => post.autor.toLowerCase() === autorBusca);
  return res.json(resultados);
});

app.patch('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { conteudo } = req.body;
  if (!conteudo) {
    return res.status(400).json({ error: 'Novo conteúdo é obrigatório' });
  }
  const post = posts.find(p => p.id === id);
  if (!post) {
    return res.status(404).json({ error: 'Post não encontrado' });
  }
  post.conteudo = conteudo;
  return res.json(post);
});

app.get('/posts/:id/comentarios', (req, res) => {
  const postId = parseInt(req.params.id);
  // Verificar se o post existe
  const postExiste = posts.some(p => p.id === postId);
  if (!postExiste) {
    return res.status(404).json({ error: 'Post não encontrado' });
  }
  const comentariosDoPost = comentarios.filter(c => c.post_id === postId);
  return res.json(comentariosDoPost);
});

app.post('/posts/:id/comentarios', (req, res) => {
  const postId = parseInt(req.params.id);
  const { texto } = req.body;

  if (!texto) {
    return res.status(400).json({ error: 'Texto do comentário é obrigatório' });
  }

  const postExiste = posts.some(p => p.id === postId);
  if (!postExiste) {
    return res.status(404).json({ error: 'Post não encontrado' });
  }

  const novoComentario = {
    id: gerarId(comentarios),
    post_id: postId,
    texto
  };

  comentarios.push(novoComentario);

  return res.status(201).json(novoComentario);
});

app.delete('/comentarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = comentarios.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Comentário não encontrado' });
  }

  comentarios.splice(index, 1);

  return res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
