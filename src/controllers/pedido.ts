import { app } from "../app";
import { PedidosRepository } from "../repositories/pedido";
import { pedido } from "../models/pedido";

export function PedidosController() {
  const repository = new PedidosRepository();

  app.get("/pedidos", (request, response) => {
    try {
      const lista = repository.listar();
      return response.json(lista);
    } catch (err) {
      return response.status(500).json({ erro: "Erro ao listar pedidos" });
    }
  });

  app.get("/pedidos/usuario/:id", (request, response) => {
    try {
      const id = Number(request.params.id);
      if (isNaN(id)) return response.status(400).json({ erro: "ID inválido" });
      const lista = repository.listarPorUsuario(id);
      return response.json(lista);
    } catch (err) {
      return response.status(500).json({ erro: "Erro ao listar pedidos do usuário" });
    }
  });

  app.get("/pedidos/valor", (request, response) => {
    try {
      const { valor } = request.query;
      const lista = repository.listarPorValor(Number(valor));
      return response.json(lista);
    } catch (err) {
      return response.status(400).json({ erro: "Erro ao filtrar por valor" });
    }
  });

  app.post("/pedidos", (request, response) => {
    try {
      const { id_usuarios, data, valor_total, status } = request.body;

      if (!id_usuarios) throw new Error("ID do usuário é obrigatório");
      if (!data) throw new Error("Data é obrigatória");
      if (!valor_total || valor_total <= 0) throw new Error("Valor inválido");
      if (!status) throw new Error("Status é obrigatório");

      const novoPedido: pedido = { id_usuarios, data, valor_total, status };
      const pedidoSalvo = repository.salvar(novoPedido);

      return response.status(201).json(pedidoSalvo);

    } catch (err) {
      return response.status(400).json({
        erro: err instanceof Error ? err.message : "Erro ao criar pedido"
      });
    }
  });
}
