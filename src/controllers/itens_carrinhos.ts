import { app } from "../app";
import { Itens_CarrinhosRepository } from "../repositories/itens_carrinhos";
import { itens_carrinhos } from "../models/itens_carrinhos";

export function ItensCarrinhosController() {
  const repository = new Itens_CarrinhosRepository();

  app.get("/itens-carrinho", (request, response) => {
    try {
      const lista = repository.listar();
      return response.json(lista);
    } catch (err) {
      return response.status(500).json({ erro: "Erro ao listar itens do carrinho" });
    }
  });

  app.get("/itens-carrinho/produto/:nome", (request, response) => {
    try {
      const { nome } = request.params;

      const lista = repository.buscarPorProduto(nome);

      return response.json(lista);

    } catch (err) {
      return response.status(400).json({ erro: "Erro ao buscar itens por produto" });
    }
  });

  app.post("/itens-carrinho", (request, response) => {
    try {
      const {id_carrinho,nome_produto,quantidade,preco_unitario} = request.body;

      const preco = Number(preco_unitario);

      if (!id_carrinho) throw new Error("ID do carrinho é obrigatório");
      if (!nome_produto) throw new Error("Nome do produto é obrigatório");
      if (!quantidade || quantidade <= 0) throw new Error("Quantidade inválida");
      if (!preco || preco <= 0) throw new Error("Preço inválido");

      const novoItem: itens_carrinhos = {id_carrinho,nome_produto,quantidade,preco_unitario: preco};

      const itemSalvo = repository.salvar(novoItem);

      return response.status(201).json(itemSalvo);

    } catch (err) {
      return response.status(400).json({
        erro: err instanceof Error ? err.message : "Erro ao adicionar item ao carrinho"
      });
    }
  });
}