import { app } from "../server";
import { AdministradorRepository } from "../repositories/administrador";

export function AdministradorController() {
  const repository = new AdministradorRepository();

  app.get("/administrador", (requisite, response) => {
    const { nome } = requisite.query;

    if (nome) {
      const admin = repository.buscarPorNome(nome as string);
      if (!admin) {
        return response.status(404).json({ erro: "Administrador não encontrado" });
      }
      return response.json(admin);
    }

    response.json(repository.listar());
  });

  app.get("/administradores/:id", (requisite, response) => {
    const id = Number(requisite.params.id);
    const admin = repository.buscarPorId(id);

    if (!admin) {
      return response.status(404).json({ erro: "Administrador não encontrado" });
    }

    response.json(admin);
  });

  app.post("/administradores", (requisite, response) => {
    try {
      const {nome_administrador,email_administrador,senha_administrador} = requisite.body;

      if (!nome_administrador) throw new Error("Nome obrigatório");
      if (!email_administrador || !email_administrador.includes("@")) throw new Error("Email inválido");
      if (!senha_administrador || senha_administrador.length < 6) throw new Error("Senha inválida");

      const admin = repository.salvar({nome_administrador,email_administrador,senha_administrador});
      response.status(201).json(admin);

    } catch (err) {
      response.status(400).json({
        erro: err instanceof Error ? err.message : "Erro ao cadastrar administrador"
      });
    }
  });
}