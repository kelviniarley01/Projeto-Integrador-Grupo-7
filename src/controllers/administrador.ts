import { app } from "../app";
import { AdministradorRepository } from "../repositories/administrador";
import { administrador } from "../models/administrador";

export function AdministradorController() {
  const repository = new AdministradorRepository();

  app.get("/administradores", (request, response) => {
    try {
      const lista = repository.listar();
      return response.json(lista);
    } catch (err) {
      return response.status(500).json({ erro: "Erro ao listar administradores" });
    }
  });

  app.get("/administradores/:id", (request, response) => {
    const id = Number(request.params.id);
    const admin = repository.listar().find(a => a.id_administrador === id);
    if (!admin) {
      return response.status(404).json({ erro: "Administrador não encontrado" });
    }
    return response.json(admin);
  });

  app.get("/administradores/nome/:nome", (request, response) => {
    try {
      const { nome } = request.params;
      const lista = repository.buscarPorNome(nome);
      return response.json(lista);
    } catch (err) {
      return response.status(400).json({ erro: "Erro ao buscar administrador por nome" });
    }
  });

  app.post("/administradores/login", (request, response) => {
    try {
      const { email_administrador, senha_administrador } = request.body;
      if (!email_administrador || !senha_administrador) throw new Error("Email e senha são obrigatórios");

      const admin = repository.buscarPorEmail(email_administrador);
      if (!admin || admin.senha_administrador !== senha_administrador) {
        return response.status(401).json({ erro: "Email ou senha inválidos" });
      }

      const { senha_administrador: _, ...semSenha } = admin;
      return response.json(semSenha);
    } catch (err) {
      return response.status(400).json({
        erro: err instanceof Error ? err.message : "Erro ao fazer login"
      });
    }
  });

  app.post("/administradores", (request, response) => {
    try {
      const { nome_administrador, email_administrador, senha_administrador } = request.body;

      if (!nome_administrador) throw new Error("Nome é obrigatório");
      if (!email_administrador || !email_administrador.includes("@")) throw new Error("Email inválido");
      if (!senha_administrador || senha_administrador.length < 6) throw new Error("Senha inválida");

      const novoAdmin: administrador = { nome_administrador, email_administrador, senha_administrador };
      const adminSalvo = repository.salvar(novoAdmin);

      return response.status(201).json(adminSalvo);

    } catch (err) {
      return response.status(400).json({
        erro: err instanceof Error ? err.message : "Erro ao criar administrador"
      });
    }
  });
}
