import { app } from "../app";
import { IngredientesProdutosRepository } from "../repositories/ingredientes_produtos";
import { ingredientes_produtos } from "../models/ingredientes_produtos";

export function IngredientesProdutosController() {
  const repository = new IngredientesProdutosRepository();

  app.get("/ingredientes-produtos", (request, response) => {
    try {
      const lista = repository.listar();
      return response.json(lista);
    } catch (err) {
      return response.status(500).json({ erro: "Erro ao listar vínculos" });
    }
  });

  // Listar ingredientes por produto
  app.get("/ingredientes-produtos/produto/:id_produto", (request, response) => {
    try {
      const id = Number(request.params.id_produto);

      if (isNaN(id)) {
        return response.status(400).json({ erro: "ID inválido" });
      }

      const lista = repository.listarPorProduto(id);

      return response.json(lista);

    } catch (err) {
      return response.status(400).json({
        erro: "Erro ao buscar ingredientes do produto"
      });
    }
  });

  app.post("/ingredientes-produtos", (request, response) => {
    try {
      const { id_produto, id_ingredientes } = request.body;

      if (!id_produto) throw new Error("ID do produto é obrigatório");
      if (!id_ingredientes) throw new Error("ID do ingrediente é obrigatório");

      const novoVinculo: ingredientes_produtos = {id_produto,id_ingredientes};

      const vinculoSalvo = repository.salvar(novoVinculo);

      return response.status(201).json(vinculoSalvo);

    } catch (err) {
      return response.status(400).json({
        erro: err instanceof Error ? err.message : "Erro ao criar vínculo"
      });
    }
  });
}