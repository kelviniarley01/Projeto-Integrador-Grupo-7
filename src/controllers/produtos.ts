import { app } from "../server";
import { ProdutosRepository } from "../repositories/ProdutosRepository";

export function ProdutosController() {
  const repository = new ProdutosRepository();

  app.get("/produtos", (requisite, response) => {
    const { nome } = requisite.query;

    if (nome) {
      const produto = repository.buscarPorNome(nome as string);
      if (!produto) return response .status(404).json({ erro: "Produto não encontrado" });
      return response.json(produto);
    }

    response.json(repository.listar());
  });

  app.get("/produtos/:id", (requisite, response) => {
    const id = Number(requisite.params.id);
    const produto = repository.buscarPorId(id);

    if (!produto) return response.status(404).json({ erro: "Produto não encontrado" });

    response.json(produto);
  });

  app.post("/produtos", (requisite, response) => {
    try {
      const {nome_produto,descricao_produto,preco_produto,estoque_produto
      } = requisite.body;

      if (!nome_produto) throw new Error("Nome do produto é obrigatório");
      if (!descricao_produto) throw new Error("Descrição é obrigatória");
      if (!preco_produto || preco_produto <= 0) throw new Error("Preço inválido");
      if (!estoque_produto || estoque_produto < 0) throw new Error("Estoque não pode ser negativo");

      const produto = repository.salvar({nome_produto,descricao_produto,preco_produto,estoque_produto});
      response.status(201).json(produto);
    } catch (err) {
      response.status(400).json({
        erro: err instanceof Error ? err.message : "Erro ao cadastrar produto"
      });
    }
  });
}