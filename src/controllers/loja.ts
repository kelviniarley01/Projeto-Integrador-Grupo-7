import { app } from "../app";
import { LojaRepository } from "../repositories/loja";

export function LojaController() {
  const repository = new LojaRepository();

  app.get("/lojas", (request, response) => {
    try {
      const lista = repository.listar();
      return response.json(lista);
    } catch (err) {
      return response.status(500).json({ erro: "Erro ao listar lojas" });
    }
  });

  app.get("/lojas/nome/:nome", (request, response) => {
    try {
      const { nome } = request.params;

      const loja = repository.buscarPorNome(nome);

      if (!loja) {
        return response.status(404).json({ erro: "Loja não encontrada" });
      }

      return response.json(loja);

    } catch (err) {
      return response.status(400).json({ erro: "Erro ao buscar loja por nome" });
    }
  });

  app.get("/lojas/ordenar/nome", (request, response) => {
    try {
      const lista = repository.listarPorNome();
      return response.json(lista);
    } catch (err) {
      return response.status(400).json({ erro: "Erro ao listar lojas por nome" });
    }
  });

  app.get("/lojas/ordenar/id", (request, response) => {
    try {
      const lista = repository.listarPorId();
      return response.json(lista);
    } catch (err) {
      return response.status(400).json({ erro: "Erro ao listar lojas por ID" });
    }
  });
}