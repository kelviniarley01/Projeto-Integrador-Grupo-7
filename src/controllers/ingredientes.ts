import { app } from "../server";
import { IngredientesRepository } from "../repositories/ingredientes";

export function IngredientesController() {
  const repository = new IngredientesRepository();

  app.get("/ingredientes", (requisite, response) => {
    const { tipo } = requisite.query;

    if (tipo) {
      const ingredientes = repository.buscarPorTipo(tipo as string);
      if (!ingredientes || ingredientes.length === 0) {
        return response.status(404).json({ erro: "Nenhum ingrediente encontrado" });
      }
      return response.json(ingredientes);
    }

    response.json(repository.listar());
  });

  app.get("/ingredientes/:id", (requisite, response) => {
    const id = Number(requisite.params.id);
    const ingrediente = repository.buscarPorId(id);

    if (!ingrediente) {
      return response.status(404).json({ erro: "Ingrediente não encontrado" });
    }

    response.json(ingrediente);
  });

  app.post("/ingredientes", (requisite, response) => {
    try {
      const {nome_ingredientes,tipo_ingredientes} = requisite.body;

      if (!nome_ingredientes) throw new Error("Nome do ingrediente obrigatório");
      if (!tipo_ingredientes) throw new Error("Tipo obrigatório");

      const ingrediente = repository.salvar({nome_ingredientes,tipo_ingredientes});
      response.status(201).json(ingrediente);

    } catch (err) {
      response.status(400).json({
        erro: err instanceof Error ? err.message : "Erro ao cadastrar ingrediente"
      });
    }
  });
}