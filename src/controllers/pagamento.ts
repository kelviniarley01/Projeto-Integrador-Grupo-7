import { app } from "../app";
import { PagamentosRepository } from "../repositories/pagamento";
import { pagamento } from "../models/pagamento";

export function PagamentosController() {
  const repository = new PagamentosRepository();

  app.get("/pagamentos/tipo/:tipo", (request, response) => {
    try {
      const { tipo } = request.params;
      const lista = repository.listarPorTipo(tipo);
      return response.json(lista);
    } catch (err) {
      return response.status(400).json({ erro: "Erro ao buscar pagamentos por tipo" });
    }
  });

  app.post("/pagamentos", (request, response) => {
    try {
      const { id_pedido, tipo_pagamento, status_pagamento, valor_pagamento } = request.body;
      const valor = Number(valor_pagamento);

      if (!id_pedido) throw new Error("ID do pedido é obrigatório");
      if (!tipo_pagamento) throw new Error("Tipo de pagamento é obrigatório");
      if (!status_pagamento) throw new Error("Status do pagamento é obrigatório");
      if (!valor || valor <= 0) throw new Error("Valor inválido");

      const novoPagamento: pagamento = { id_pedido, tipo_pagamento, status_pagamento, valor_pagamento: valor };
      const pagamentoSalvo = repository.salvar(novoPagamento);

      return response.status(201).json(pagamentoSalvo);

    } catch (err) {
      return response.status(400).json({
        erro: err instanceof Error ? err.message : "Erro ao criar pagamento"
      });
    }
  });
}
