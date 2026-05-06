import { app } from "../app";
import { FreteRepository } from "../repositories/Frete";
import { Frete } from "../models/Frete";

export function FreteController() {
  const repository = new FreteRepository();

  app.get("/fretes", (request, response) => {
    try {
      const lista = repository.listar();
      return response.json(lista);
    } catch (err) {
      return response.status(500).json({ erro: "Erro ao listar fretes" });
    }
  });

  app.get("/fretes/cidade/:cidade", (request, response) => {
    try {
      const { cidade } = request.params;
      const lista = repository.listarPorCidade(cidade);
      return response.json(lista);
    } catch (err) {
      return response.status(400).json({
        erro: "Erro ao buscar fretes por cidade"
      });
    }
  });

  app.post("/fretes", (request, response) => {
    try {
      const { id_pedido, valor, prazo, rua, numero, cidade, estado } = request.body;

      const idPedido = Number(id_pedido);
      const valorFrete = Number(valor);

      if (!idPedido) throw new Error("ID do pedido é obrigatório");
      if (!valorFrete || valorFrete <= 0) throw new Error("Valor inválido");
      if (!prazo) throw new Error("Prazo é obrigatório");
      if (!rua) throw new Error("Rua é obrigatória");
      if (numero === undefined) throw new Error("Número é obrigatório");
      if (!cidade) throw new Error("Cidade é obrigatória");
      if (!estado) throw new Error("Estado é obrigatório");

      const novoFrete: Frete = {id_pedido: idPedido,valor: valorFrete,prazo,rua,numero,cidade,estado};

      const freteSalvo = repository.salvar(novoFrete);

      return response.status(201).json(freteSalvo);

    } catch (err) {
      return response.status(400).json({
        erro: err instanceof Error ? err.message : "Erro ao criar frete"
      });
    }
  });
}