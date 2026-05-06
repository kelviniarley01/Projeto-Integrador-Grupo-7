import { app } from "../app";
import { UsuariosRepository } from "../repositories/usuarios";
import { usuarios } from "../models/usuarios";

export function UsuariosController() {
  const repository = new UsuariosRepository();

  app.get("/usuarios/:id", (request, response) => {
    const id = Number(request.params.id);

    const usuario = repository.buscarPorId(id);

    if (!usuario) {
      return response.status(404).json({ erro: "Usuário não encontrado" });
    }

    return response.json(usuario);
  });

  app.post("/usuarios", (request, response) => {
    try {
      const {nome_usuario,email_usuario,senha_usuario,idade_usuario,data_nascimento_usuario,rua,numero,cidade,estado} = request.body;

      if (!nome_usuario) throw new Error("Nome obrigatório");
      if (!email_usuario || !email_usuario.includes("@")) throw new Error("Email inválido");
      if (!senha_usuario || senha_usuario.length < 6) throw new Error("Senha inválida");
      if (!idade_usuario || idade_usuario <= 0) throw new Error("Idade inválida");
      if (!data_nascimento_usuario) throw new Error("Data de nascimento é obrigatória");
      if (!rua) throw new Error("Rua é obrigatória");
      if (!numero) throw new Error("Número é obrigatório");
      if (!cidade) throw new Error("Cidade é obrigatória");
      if (!estado) throw new Error("Estado é obrigatório");

      const usuario: usuarios = {nome_usuario,email_usuario,senha_usuario,idade_usuario,data_nascimento_usuario,rua,numero,cidade,estado};

      const novoUsuario = repository.salvar(usuario);

      return response.status(201).json(novoUsuario);

    } catch (err) {
      return response.status(400).json({
        erro: err instanceof Error ? err.message : "Erro ao cadastrar usuário"
      });
    }
  });
}