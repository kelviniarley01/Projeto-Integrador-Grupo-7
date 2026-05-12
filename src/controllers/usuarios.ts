import { app } from "../app";
import { UsuariosRepository } from "../repositories/usuarios";

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
      const { nome_usuario, email_usuario, senha_usuario, idade_usuario } = request.body;

      if (!nome_usuario) throw new Error("Nome obrigatório");
      if (!email_usuario || !email_usuario.includes("@")) throw new Error("Email inválido");
      if (!senha_usuario || senha_usuario.length < 6) throw new Error("Senha deve ter pelo menos 6 caracteres");

      const existente = repository.buscarPorEmail(email_usuario);
      if (existente) throw new Error("Email já cadastrado");

      const novoUsuario = repository.salvar({
        nome_usuario,
        email_usuario,
        senha_usuario,
        idade_usuario: Number(idade_usuario) || 18,
        data_cadastro_usuario: new Date().toISOString(),
        rua: "",
        numero: "",
        cidade: "",
        estado: "",
      });

      const { senha_usuario: _, ...semSenha } = novoUsuario;
      return response.status(201).json(semSenha);

    } catch (err) {
      return response.status(400).json({
        erro: err instanceof Error ? err.message : "Erro ao cadastrar usuário"
      });
    }
  });

  app.post("/usuarios/login", (request, response) => {
    try {
      const { email_usuario, senha_usuario } = request.body;

      if (!email_usuario || !senha_usuario) throw new Error("Email e senha são obrigatórios");

      const usuario = repository.buscarPorEmail(email_usuario);
      if (!usuario || usuario.senha_usuario !== senha_usuario) {
        return response.status(401).json({ erro: "Email ou senha inválidos" });
      }

      const { senha_usuario: _, ...semSenha } = usuario;
      return response.json(semSenha);

    } catch (err) {
      return response.status(400).json({
        erro: err instanceof Error ? err.message : "Erro ao fazer login"
      });
    }
  });
}
