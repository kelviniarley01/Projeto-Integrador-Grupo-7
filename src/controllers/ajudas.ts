import { app } from "../server";
import { AjudasRepository } from "../repositories/ajudas";

export function AjudasController() {
  const repository = new AjudasRepository();

  app.get("/ajudas", (requisite, response) => {
    const { pergunta } = requisite.query;

    if (pergunta) {
      const ajudas = repository.buscarPorPergunta(pergunta as string);
      if (!ajudas || ajudas.length === 0) {
        return response.status(404).json({ erro: "Nenhuma ajuda encontrada" });
      }
      return response.json(ajudas);
    }

    response.json(repository.listar());
  });

  app.get("/ajudas/:id", (requisite, response) => {
    const id = Number(requisite.params.id);
    const ajuda = repository.buscarPorId(id);

    if (!ajuda) {
      return response.status(404).json({ erro: "Ajuda não encontrada" });
    }

    response.json(ajuda);
  });

  app.post("/ajudas", (requisite, response) => {
    try {
      const {id_pergunta,pergunta,resposta} = requisite.body;

      if (!id_pergunta) throw new Error("ID da pergunta obrigatório");
      if (!pergunta) throw new Error("Pergunta obrigatória");
      if (!resposta) throw new Error("Resposta obrigatória");

      const ajuda = repository.salvar({id_pergunta,pergunta,resposta});
      response.status(201).json(ajuda);

    } catch (err) {
      response.status(400).json({
        erro: err instanceof Error ? err.message : "Erro ao cadastrar ajuda"
      });
    }
  });
}