import { app } from "../app";
import { AjudasRepository } from "../repositories/ajudas";
import { ajudas } from "../models/ajudas";

export function AjudasController() {
  const repository = new AjudasRepository();

  app.get("/ajudas", (request, response) => {
    try {
      const lista = repository.listar();
      return response.json(lista);
    } catch (err) {
      return response.status(500).json({ erro: "Erro ao listar ajudas" });
    }
  });

  app.get("/ajudas/:id", (request, response) => {
    const id = Number(request.params.id);

    const ajuda = repository.listar().find(a => a.id_ajuda === id);

    if (!ajuda) {
      return response.status(404).json({ erro: "Ajuda não encontrada" });
    }

    return response.json(ajuda);
  });

  app.get("/ajudas/pergunta/:texto", (request, response) => {
    try {
      const { texto } = request.params;

      const lista = repository.buscarPorPergunta(texto);

      return response.json(lista);

    } catch (err) {
      return response.status(400).json({
        erro: "Erro ao buscar perguntas"
      });
    }
  });

  app.post("/ajudas", (request, response) => {
    try {
      const { id_pergunta, pergunta, resposta } = request.body;

      if (!id_pergunta) throw new Error("ID da pergunta é obrigatório");
      if (!pergunta) throw new Error("Pergunta é obrigatória");
      if (!resposta) throw new Error("Resposta é obrigatória");

      const novaAjuda: ajudas = {id_pergunta,pergunta,resposta};

      const ajudaSalva = repository.salvar(novaAjuda);

      return response.status(201).json(ajudaSalva);

    } catch (err) {
      return response.status(400).json({
        erro: err instanceof Error ? err.message : "Erro ao criar ajuda"
      });
    }
  });
}