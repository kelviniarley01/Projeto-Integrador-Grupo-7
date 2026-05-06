import { app } from "../app";
import { ProdutosRepository } from "../repositories/produtos";
import { produtos } from "../models/produtos";

export function ProdutosController() {
  const repository = new ProdutosRepository();

  app.get("/produtos", (request, response) => {
    try {
      const lista = repository.listar();
      return response.json(lista);
    } catch (err) {
      return response.status(500).json({ erro: "Erro ao listar produtos" });
    }
  });

  app.get("/produtos/preco", (request, response) => {
    try {
      const { min, max } = request.query;

      const lista = repository.listarPorPreco(Number(min), Number(max));

      return response.json(lista);
    } catch (err) {
      return response.status(400).json({ erro: "Erro ao filtrar por preço" });
    }
  });

  app.post("/produtos", (request, response) => {
    try {
      const {nome_produto,descricao_produto,preco_produto,estoque_produto} = request.body;

      if (!nome_produto) throw new Error("Nome do produto é obrigatório");
      if (!descricao_produto) throw new Error("Descrição é obrigatória");
      if (!preco_produto || preco_produto <= 0) throw new Error("Preço inválido");
      if (estoque_produto === undefined || estoque_produto < 0) throw new Error("Estoque inválido");

      const produto: produtos = {nome_produto,descricao_produto,preco_produto,estoque_produto};

      const novoProduto = repository.salvar(produto);

      return response.status(201).json(novoProduto);

    } catch (err) {
      return response.status(400).json({
        erro: err instanceof Error ? err.message : "Erro ao cadastrar produto"
      });
    }
  });
}