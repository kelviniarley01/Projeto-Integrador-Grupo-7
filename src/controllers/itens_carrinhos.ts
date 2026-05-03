import { app } from "../server";
import { Itens_CarrinhosRepository } from "../repositories/itens_carrinhos";

export function Itens_CarrinhosController() {
  const repository = new Itens_CarrinhosRepository();

  app.get("/itens_carrinhos", (requisite, response) => {
    const { nome_produto } = requisite.query;

    if (nome_produto) {
      const itens = repository.buscarPorProduto(nome_produto as string);
      if (!itens) return response.status(404).json({ erro: "Item não encontrado" });
      return response.json(itens);
    }

    response.json(repository.listar());
  });

  app.get("/itens_carrinhos/:id", (requisite, response) => {
    const id = Number(requisite.params.id);
    const item = repository.buscarPorId(id);

    if (!item) return response.status(404).json({ erro: "Item não encontrado" });

    response.json(item);
  });

  app.post("/itens_carrinhos", (requisite, response) => {
    try {
      const {id_carrinho,nome_produto,quantidade,preco_unitario} = requisite.body;

      if (!id_carrinho) throw new Error("Carrinho obrigatório");
      if (!nome_produto) throw new Error("Produto obrigatório");
      if (!quantidade || quantidade <= 0) throw new Error("Quantidade inválida");
      if (!preco_unitario || preco_unitario <= 0) throw new Error("Preço inválido");

      const item = repository.salvar({id_carrinho,nome_produto,quantidade,preco_unitario});
      response.status(201).json(item);

    } catch (err) {
      response.status(400).json({
        erro: err instanceof Error ? err.message : "Erro ao adicionar item"
      });
    }
  });
}