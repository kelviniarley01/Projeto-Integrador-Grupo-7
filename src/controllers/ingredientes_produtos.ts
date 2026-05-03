import { app } from "../server";
import { IngredientesProdutosRepository } from "../repositories/ingredientes_produtos";

export function IngredientesProdutosController() {
  const repository = new IngredientesProdutosRepository();

  app.get("/ingredientes_produto", (requisite, response) => {
    const { id_produto } = requisite.query;

    if (id_produto) {
      const dados = repository.BuscarPorProduto(Number(id_produto));
      if (!dados || dados.length === 0) {
        return response.status(404).json({ erro: "Nenhum registro encontrado" });
      }
      return response.json(dados);
    }

    response.json(repository.listar());
  });

  app.get("/ingredientes_produto/:id", (requisite, response) => {
    const id = Number(requisite.params.id);
    const dado = repository.BuscarPorId(id);

    if (!dado) {
      return response.status(404).json({ erro: "Registro não encontrado" });
    }

    response.json(dado);
  });

  app.post("/ingredientes_produto", (requisite, response) => {
    try {
      const {id_produto,id_ingredientes} = requisite.body;

      if (!id_produto) throw new Error("Produto obrigatório");
      if (!id_ingredientes) throw new Error("Ingrediente obrigatório");

      const dado = repository.salvar({id_produto,id_ingredientes});
      response.status(201).json(dado);

    } catch (err) {
      response.status(400).json({
        erro: err instanceof Error ? err.message : "Erro ao cadastrar"
      });
    }
  });
}