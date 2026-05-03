import { app } from "../server";
import { FreteRepository } from "../repositories/Frete";

export function FreteController() {
  const repository = new FreteRepository();

  app.get("/frete", (requisite, response) => {
    const { cidade } = requisite.query;

    if (cidade) {
      const fretes = repository.BuscarPorCidade(cidade as string);
      if (!fretes || fretes.length === 0) {
        return response.status(404).json({ erro: "Nenhum frete encontrado" });
      }
      return response.json(fretes);
    }

    response.json(repository.listar());
  });

  app.get("/frete/:id", (requisite, response) => {
    const id = Number(requisite.params.id);
    const frete = repository.BuscarPorId(id);

    if (!frete) {
      return response.status(404).json({ erro: "Frete não encontrado" });
    }

    response.json(frete);
  });

  app.post("/frete", (requisite, response) => {
    try {
      const {id_pedido,valor,prazo,rua,numero,cidade,estado} = requisite.body;

      if (!id_pedido) throw new Error("Pedido obrigatório");
      if (!valor || valor <= 0) throw new Error("Valor inválido");
      if (!prazo) throw new Error("Prazo obrigatório");
      if (!rua) throw new Error("Rua obrigatória");
      if (!numero) throw new Error("Número obrigatório");
      if (!cidade) throw new Error("Cidade obrigatória");
      if (!estado) throw new Error("Estado obrigatório");

      const frete = repository.salvar({id_pedido,valor,prazo,rua,numero,cidade,estado});
      response.status(201).json(frete);

    } catch (err) {
      response.status(400).json({
        erro: err instanceof Error ? err.message : "Erro ao cadastrar frete"
      });
    }
  });
}