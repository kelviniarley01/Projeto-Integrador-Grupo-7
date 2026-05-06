import { app } from "../app";
import { FreteRepository } from "../repositories/Frete";

export function FreteController() {
  const repository = new FreteRepository();

  app.post("/frete", (requisite, response) => {
    try {
      const {id_frete, id_pedido, valor, prazo, rua, numero, cidade, estado} = requisite.body;

      if (!id_frete) throw new Error("ID do frete não pode ser fornecido");
      if (!id_pedido) throw new Error("Pedido obrigatório");
      if (!valor || valor <= 0) throw new Error("Valor inválido");
      if (!prazo) throw new Error("Prazo obrigatório");
      if (!rua) throw new Error("Rua obrigatória");
      if (!numero) throw new Error("Número obrigatório");
      if (!cidade) throw new Error("Cidade obrigatória");
      if (!estado) throw new Error("Estado obrigatório");

      const frete = repository.salvar({id_frete, id_pedido, valor, prazo, rua, numero, cidade, estado});
      response.status(201).json(frete);

    } catch (err) {
      response.status(400).json({
        erro: err instanceof Error ? err.message : "Erro ao cadastrar frete"
      });
    }
  });
}