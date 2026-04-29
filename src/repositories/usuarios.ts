import db from '../database/database';
import { usuarios } from '../models/usuarios';

export class UsuariosRepository {
    salvar(usuario: usuarios): usuarios {
        const r = db.prepare('INSERT INTO usuarios (nome_usuario, email_usuario, senha_usuario, idade_usuario, data_nascimento_usuario, rua, numero, cidade, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
        .run(usuario.nome_usuario, usuario.email_usuario, usuario.senha_usuario, usuario.idade_usuario, usuario.data_nascimento_usuario, usuario.rua, usuario.numero, usuario.cidade, usuario.estado);

        return { ...usuario, id_usuario: r.lastInsertRowid as number };
    }

    listar() {
        return db.prepare('SELECT * FROM usuarios').all();
    }

    listarPorCidade(cidade: string) {
        return db.prepare('SELECT * FROM usuarios WHERE cidade = ?').all(cidade);
    }

    listarPorIdade(min: number, max: number) {
        return db.prepare('SELECT * FROM usuarios WHERE idade_usuario BETWEEN ? AND ? ORDER BY nome_usuario ASC').all(min, max);
    }
}