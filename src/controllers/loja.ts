import { app } from "../server";
import { LojaRepository } from "../repositories/loja";

export function LojaController() {
  const repository = new LojaRepository();

  app.get("/loja", (requisite, response) => {
    const { nome } = requisite.query;

    if (nome) {
      const loja = repository.buscarPorNome(nome as string);
      if (!loja) return response.status(404).json({ erro: "Loja não encontrada" });
      return response.json(loja);
    }

    response.json(repository.listar());
  });

  app.get("/loja/:id", (requisite, response) => {
    const id = Number(requisite.params.id);
    const loja = repository.buscarPorId(id);

    if (!loja) return response.status(404).json({ erro: "Loja não encontrada" });

    response.json(loja);
  });

  app.post("/loja", (requisite, response) => {
    try {
      const { id_loja, nome, descricao } = requisite.body;

      if (!id_loja) throw new Error("ID obrigatório");
      if (!nome) throw new Error("Nome obrigatório");
      if (!descricao) throw new Error("Descrição obrigatória");

      const loja = repository.salvar({id_loja,nome,descricao});
      response.status(201).json(loja);

    } catch (err) {
      response.status(400).json({
        erro: err instanceof Error ? err.message : "Erro ao cadastrar loja"
      });
    }
  });
}