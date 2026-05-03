import { app } from "../server";
import { item_PedidoRepository } from "../repositories/item_pedido";

export function item_pedidoController() {
  const repository = new item_PedidoRepository();

  app.get("/item_pedido", (requisite, response) => {
    const { id_pedido } = requisite.query;

    if (id_pedido) {
      return response.json(repository.buscarPorPedido(Number(id_pedido)));
    }

    response.json(repository.listar());
  });

  app.get("/item_pedido/:id", (requisite, response) => {
    const id = Number(requisite.params.id);
    const item = repository.buscarPorId(id);

    if (!item) return response.status(404).json({ erro: "Item do pedido não encontrado" });

    response.json(item);
  });

  app.post("/item_pedido", (requisite, response) => {
    try {
      const {id_pedido,id_produto,quantidade,preco} = requisite.body;

      if (!id_pedido) throw new Error("Pedido obrigatório");
      if (!id_produto) throw new Error("Produto obrigatório");
      if (!quantidade || quantidade <= 0) throw new Error("Quantidade inválida");
      if (!preco || preco <= 0) throw new Error("Preço inválido");

      const item = repository.salvar({id_pedido,id_produto,quantidade,preco});
      response.status(201).json(item);

    } catch (err) {
      response.status(400).json({
        erro: err instanceof Error ? err.message : "Erro ao adicionar item ao pedido"
      });
    }
  });
}