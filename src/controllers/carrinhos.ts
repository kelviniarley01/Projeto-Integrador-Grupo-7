import { app } from "../server";
import { CarrinhosRepository } from "../repositories/carrinhos";

export function CarrinhosController() {
  const repository = new CarrinhosRepository();

  app.get("/carrinhos", (requisite, response) => {
    const { id_usuario } = requisite.query;

    if (id_usuario) {
      const carrinhos = repository.BuscarPorUsuario(Number(id_usuario));
      if (!carrinhos || carrinhos.length === 0) {
        return response.status(404).json({ erro: "Nenhum carrinho encontrado" });
      }
      return response.json(carrinhos);
    }

    response.json(repository.listar());
  });

  app.get("/carrinhos/:id", (requisite, response) => {
    const id = Number(requisite.params.id);
    const carrinho = repository.BuscarPorId(id);

    if (!carrinho) {
      return response.status(404).json({ erro: "Carrinho não encontrado" });
    }

    response.json(carrinho);
  });

  app.post("/carrinhos", (requisite, response) => {
    try {
      const {id_usuario,preco_produto,valor_frete} = requisite.body;

      if (!id_usuario) throw new Error("Usuário obrigatório");
      if (!preco_produto || preco_produto < 0) throw new Error("Preço inválido");
      if (!valor_frete || valor_frete < 0) throw new Error("Frete inválido");

      const carrinho = repository.salvar({id_usuario,preco_produto,valor_frete});
      response.status(201).json(carrinho);

    } catch (err) {
      response.status(400).json({
        erro: err instanceof Error ? err.message : "Erro ao criar carrinho"
      });
    }
  });
}