const produtos = [
    { id: 1, nome: "Mouse Gamer", preco: 150, emEstoque: true, categoria: "eletrônicos" },
    { id: 2, nome: "Teclado Mecânico", preco: 300, emEstoque: false, categoria: "eletrônicos" },
    { id: 3, nome: "Monitor LED", preco: 1200, emEstoque: true },
    { id: 4, nome: "Mousepad", preco: 50, emEstoque: true, categoria: "acessórios" }
  ];

  
  const express = require('express');
const app = express();

app.use(express.json());

app.get('/produtos/em-estoque', (req, res) => {
  const produtosEmEstoque = produtos.filter(p => p.emEstoque);
  res.json(produtosEmEstoque);
});

app.get('/produtos/pesquisar', (req, res) => {
  const nomeBusca = req.query.nome;
  if (!nomeBusca) {
    return res.status(400).json({ erro: "Parâmetro 'nome' é obrigatório" });
  }
  const resultado = produtos.filter(p => p.nome.toLowerCase().includes(nomeBusca.toLowerCase()));
  res.json(resultado);
});

app.patch('/produtos/:id', (req, res) => {
  const id = Number(req.params.id);
  const novoPreco = req.body.preco;

  if (novoPreco === undefined) {
    return res.status(400).json({ erro: "Campo 'preco' é obrigatório" });
  }

  const produto = produtos.find(p => p.id === id);
  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }

  produto.preco = novoPreco;
  res.json(produto);
});

app.put('/produtos/:id', (req, res) => {
  const id = Number(req.params.id);
  const novoProduto = req.body;

  if (!novoProduto.categoria) {
    return res.status(400).json({ erro: "Campo 'categoria' é obrigatório" });
  }

  const index = produtos.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }

  produtos[index] = { ...novoProduto, id };
  res.json(produtos[index]);
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
