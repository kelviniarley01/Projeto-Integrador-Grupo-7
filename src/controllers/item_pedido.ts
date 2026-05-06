import { app } from "../app";
import { ItemPedidoRepository } from "../repositories/item_pedido";
import { item_pedido } from "../models/item_pedido";

export function ItemPedidoController() {
  const repository = new ItemPedidoRepository();

  app.get("/itens-pedido", (request, response) => {
    try {
      const lista = repository.listar();
      return response.json(lista);
    } catch (err) {
      return response.status(500).json({ erro: "Erro ao listar itens de pedido" });
    }
  });


  app.get("/itens-pedido/pedido/:id_pedido", (request, response) => {
    try {
      const id = Number(request.params.id_pedido);

      if (isNaN(id)) {
        return response.status(400).json({ erro: "ID inválido" });
      }

      const lista = repository.listarPorPedido(id);

      return response.json(lista);

    } catch (err) {
      return response.status(400).json({
        erro: "Erro ao buscar itens do pedido"
      });
    }
  });

  app.post("/itens-pedido", (request, response) => {
    try {
      const {id_pedido,id_produto,quantidade,preco} = request.body;

      const valor = Number(preco);

      if (!id_pedido) throw new Error("ID do pedido é obrigatório");
      if (!id_produto) throw new Error("ID do produto é obrigatório");
      if (!quantidade || quantidade <= 0) throw new Error("Quantidade inválida");
      if (!valor || valor <= 0) throw new Error("Preço inválido");

      const novoItem: item_pedido = {id_pedido,id_produto,quantidade,preco: valor};

      const itemSalvo = repository.salvar(novoItem);

      return response.status(201).json(itemSalvo);

    } catch (err) {
      return response.status(400).json({
        erro: err instanceof Error ? err.message : "Erro ao criar item do pedido"
      });
    }
  });
}