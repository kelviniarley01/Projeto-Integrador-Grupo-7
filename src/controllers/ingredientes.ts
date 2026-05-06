import { app } from "../app";
import { IngredientesRepository } from "../repositories/ingredientes";
import { ingredientes } from "../models/ingredientes";

export function IngredientesController() {
  const repository = new IngredientesRepository();

  app.get("/ingredientes", (request, response) => {
    try {
      const lista = repository.listar();
      return response.json(lista);
    } catch (err) {
      return response.status(500).json({ erro: "Erro ao listar ingredientes" });
    }
  });

  app.get("/ingredientes/tipo/:tipo", (request, response) => {
    try {
      const { tipo } = request.params;

      const lista = repository.listarPorTipo(tipo);

      return response.json(lista);

    } catch (err) {
      return response.status(400).json({
        erro: "Erro ao buscar ingredientes por tipo"
      });
    }
  });

  app.post("/ingredientes", (request, response) => {
    try {
      const { nome_ingredientes, tipo_ingredientes } = request.body;

      if (!nome_ingredientes) throw new Error("Nome do ingrediente é obrigatório");
      if (!tipo_ingredientes) throw new Error("Tipo do ingrediente é obrigatório");

      const novoIngrediente: ingredientes = {nome_ingredientes,tipo_ingredientes};

      const ingredienteSalvo = repository.salvar(novoIngrediente);

      return response.status(201).json(ingredienteSalvo);

    } catch (err) {
      return response.status(400).json({
        erro: err instanceof Error ? err.message : "Erro ao criar ingrediente"
      });
    }
  });
}