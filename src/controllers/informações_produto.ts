import { app } from "../server";
import { Informações_ProdutoRepository } from "../repositories/informações_produto";

export function Informações_ProdutoController() {
  const repository = new Informações_ProdutoRepository();

  app.get("/informacoes-produto", (requisite, response) => {
    const { nome } = requisite.query;

    if (nome) {
      const info = repository.BuscarPorNome(nome as string);
      if (!info || info.length === 0) {
        return response.status(404).json({ erro: "Informações não encontradas" });
      }
      return response.json(info);
    }

    response.json(repository.listar());
  });

  app.get("/informacoes-produto/:id", (requisite, response) => {
    const id = Number(requisite.params.id);
    const info = repository.BuscarPorId(id);

    if (!info) {
      return response.status(404).json({ erro: "Informação não encontrada" });
    }

    response.json(info);
  });

  app.post("/informacoes-produto", (requisite, response) => {
    try {
      const {nome_produto,beneficios,modo_uso,conservacao} = requisite.body;

      if (!nome_produto) throw new Error("Produto obrigatório");
      if (!beneficios) throw new Error("Benefícios obrigatórios");
      if (!modo_uso) throw new Error("Modo de uso obrigatório");
      if (!conservacao) throw new Error("Conservação obrigatória");

      const info = repository.salvar({nome_produto,beneficios,modo_uso,conservacao});
      response.status(201).json(info);

    } catch (err) {
      response.status(400).json({
        erro: err instanceof Error ? err.message : "Erro ao cadastrar informações"
      });
    }
  });
}