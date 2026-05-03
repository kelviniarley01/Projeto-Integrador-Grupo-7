import { app } from "../server";
import { PagamentosRepository } from "../repositories/PagamentosRepository";

export function PagamentosController() {
  const repository = new PagamentosRepository();

  app.get("/pagamentos", (requisite, response) => {
    const { tipo } = requisite.query;

    if (tipo) {
      return response.json(repository.buscarPorTipo(tipo as string));
    }

    response.json(repository.listar());
  });

  app.get("/pagamentos/:id", (requisite, response) => {
    const id = Number(requisite.params.id);
    const pagamento = repository.buscarPorId(id);

    if (!pagamento) {
      return response.status(404).json({ erro: "Pagamento não encontrado" });
    }

    response.json(pagamento);
  });

  app.post("/pagamentos", (requisite, response) => {
    try {
      const {id_pedido,tipo_pagamento,status_pagamento,valor_pagamento} = req.body;

      if (!id_pedido) throw new Error("Pedido obrigatório");
      if (!tipo_pagamento) throw new Error("Tipo de pagamento obrigatório");
      if (!status_pagamento) throw new Error("Status obrigatório");
      if (!valor_pagamento || valor_pagamento <= 0) throw new Error("Valor inválido");

      const pagamento = repository.salvar({id_pedido,tipo_pagamento,status_pagamento,valor_pagamento
      });
      response.status(201).json(pagamento);

    } catch (err) {
      response.status(400).json({
        erro: err instanceof Error ? err.message : "Erro ao cadastrar pagamento"
      });
    }
  });
}