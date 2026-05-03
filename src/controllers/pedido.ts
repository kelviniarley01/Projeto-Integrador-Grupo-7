import { app } from "../server";
import { PedidosRepository } from "../repositories/pedido";

export function pedidoController() {
  const repository = new PedidosRepository();

  app.get("/pedidos", (requisite, response) => {
    const { id_usuarios } = requisite.query;

    if (id_usuarios) {
      return response.json(repository.buscarPorUsuario(Number(id_usuarios)));
    }

    response.json(repository.listar());
  });

  app.get("/pedidos/:id", (requisite, response) => {
    const id = Number(requisite.params.id);
    const pedido = repository.buscarPorId(id);

    if (!pedido) return response.status(404).json({ erro: "Pedido não encontrado" });

    response.json(pedido);
  });

  app.post("/pedidos", (requisite, response) => {
    try {
      const {id_usuarios,data,valor_total,status} = requisite.body;

      if (!id_usuarios) throw new Error("Usuário obrigatório");
      if (!data) throw new Error("Data obrigatória");
      if (!valor_total || valor_total <= 0) throw new Error("Valor inválido");
      if (!status) throw new Error("Status obrigatório");

      const pedido = repository.salvar({id_usuarios,data,valor_total,status});
      response.status(201).json(pedido);

    } catch (err) {
      response.status(400).json({
        erro: err instanceof Error ? err.message : "Erro ao cadastrar pedido"
      });
    }
  });
}