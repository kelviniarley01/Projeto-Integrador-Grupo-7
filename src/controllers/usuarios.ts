import { app } from "../server";
import { UsuariosRepository } from "../repositories/usuariosRepository";

export function UsuariosController() {
  const repository = new UsuariosRepository();

  app.get("/usuarios", (requisite, response) => {
    const { nome } = requisite.query;

    if (nome) {
      const usuario = repository.buscarPorNome(nome as string);
      if (!usuario) return response.status(404).json({ erro: "Usuário não encontrado" });
      return response.json(usuario);
    }

    response.json(repository.listar());
  });

  app.get("/usuarios/:id", (requisite, response) => {
    const id = Number(requisite.params.id);
    const usuario = repository.buscarPorId(id);

    if (!usuario) return response.status(404).json({ erro: "Usuário não encontrado" });

    response.json(usuario);
  });

  app.post("/usuarios", (requisite, response) => {
    try {
      const {nome_usuario,email_usuario,senha_usuario,idade_usuario,data_nascimento_usuario,rua,numero,cidade,estado } = requisite.body;

      if (!nome_usuario) throw new Error("Nome obrigatório");
      if (!email_usuario || !email_usuario.includes("@")) throw new Error("Email inválido");
      if (!senha_usuario || senha_usuario.length < 6) throw new Error("Senha inválida");
      if (!idade_usuario || idade_usuario <= 0) throw new Error("Idade inválida");
      if (!data_nascimento_usuario) throw new Error("Data de nascimento é obrigatória");
      if (!rua) throw new Error("Rua é obrigatória");
      if (!numero) throw new Error("Número é obrigatório");
      if (!cidade) throw new Error("Cidade é obrigatória");
      if (!estado) throw new Error("Estado é obrigatório");

      const usuario = repository.salvar({nome_usuario,email_usuario,senha_usuario,idade_usuario,data_nascimento_usuario,rua,numero,cidade,estado
      });
      response.status(201).json(usuario);

    } catch (err) {
      response.status(400).json({
        erro: err instanceof Error ? err.message : "Erro ao cadastrar usuário"
      });
    }
  });
}