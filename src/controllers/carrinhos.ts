import { app } from "../app";
import { CarrinhosRepository } from "../repositories/carrinhos";
import { carrinhos } from "../models/carrinhos";

export function CarrinhosController() {
  const repository = new CarrinhosRepository();

  app.get("/carrinhos", (request, response) => {
    try {
      const lista = repository.listar();
      return response.json(lista);
    } catch (err) {
      return response.status(500).json({ erro: "Erro ao listar carrinhos" });
    }
  });

  app.get("/carrinhos/usuario/:id_usuario", (request, response) => {
    try {
      const id = Number(request.params.id_usuario);

      if (isNaN(id)) {
        return response.status(400).json({ erro: "ID inválido" });
      }

      const lista = repository.listarPorUsuario(id);

      return response.json(lista);

    } catch (err) {
      return response.status(400).json({
        erro: "Erro ao buscar carrinhos do usuário"
      });
    }
  });

  app.get("/carrinhos/frete", (request, response) => {
    try {
      const { valor } = request.query;

      const lista = repository.listarPorFrete(Number(valor));

      return response.json(lista);

    } catch (err) {
      return response.status(400).json({
        erro: "Erro ao filtrar por frete"
      });
    }
  });

  app.post("/carrinhos", (request, response) => {
    try {
      const { id_usuario, preco_produto, valor_frete } = request.body;

      const preco = Number(preco_produto);
      const frete = Number(valor_frete);
      const idUsuario = Number(id_usuario);

      if (!idUsuario) throw new Error("ID do usuário é obrigatório");
      if (!preco || preco <= 0) throw new Error("Preço inválido");
      if (frete < 0) throw new Error("Frete inválido");

      const novoCarrinho: carrinhos = {id_usuario: idUsuario,preco_produto: preco,valor_frete: frete};

      const carrinhoSalvo = repository.salvar(novoCarrinho);

      return response.status(201).json(carrinhoSalvo);

    } catch (err) {
      return response.status(400).json({
        erro: err instanceof Error ? err.message : "Erro ao criar carrinho"
      });
    }
  });
}