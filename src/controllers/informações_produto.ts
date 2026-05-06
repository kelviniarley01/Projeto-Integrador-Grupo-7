import { app } from "../app";
import { InformacoesProdutoRepository } from "../repositories/informações_produto";
import { informacoes_Produto } from "../models/informações_produto";

export function InformacoesProdutoController() {
  const repository = new InformacoesProdutoRepository();

  app.get("/informacoes-produto", (request, response) => {
    try {
      const lista = repository.listar();
      return response.json(lista);
    } catch (err) {
      return response.status(500).json({ erro: "Erro ao listar informações" });
    }
  });

  app.get("/informacoes-produto/nome/:nome", (request, response) => {
    try {
      const { nome } = request.params;

      const lista = repository.buscarPorNome(nome);

      return response.json(lista);

    } catch (err) {
      return response.status(400).json({
        erro: "Erro ao buscar informações por nome"
      });
    }
  });

  app.post("/informacoes-produto", (request, response) => {
    try {
      const {nome_produto,beneficios,modo_uso,conservacao} = request.body;

      if (!nome_produto) throw new Error("Nome do produto é obrigatório");
      if (!beneficios) throw new Error("Benefícios são obrigatórios");
      if (!modo_uso) throw new Error("Modo de uso é obrigatório");
      if (!conservacao) throw new Error("Conservação é obrigatória");

      const novaInfo: informacoes_Produto = {nome_produto,beneficios,modo_uso,conservacao};

      const infoSalva = repository.salvar(novaInfo);

      return response.status(201).json(infoSalva);

    } catch (err) {
      return response.status(400).json({
        erro: err instanceof Error ? err.message : "Erro ao criar informação do produto"
      });
    }
  });
}