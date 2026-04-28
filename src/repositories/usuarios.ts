import db from '../database/database';
import {usuarios} from '../models/usuarios';

export class UsuariosRepository {;
    salvar(usuario: usuarios): usuarios {
        const result = db
        .prepare('INSERT INTO usuarios (nome_usuario, email_usuario, senha_usuario, idade_usuario, data_cadastro_ususrio, rua, numero, cidade, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
        .run(usuario.nome_usuario, usuario.email_usuario, usuario.senha_usuario, usuario.idade_usuario, new Date(), usuario.rua, usuario.numero, usuario.cidade, usuario.estado);

        return {...usuario, id_usuario: result.lastInsertRowid as number};
    }

    listar(): usuarios[] {
        const result = db.prepare('SELECT * FROM usuarios').all();
        return result as usuarios[];
    }

    buscarPorId(id_usuario: number): usuarios | null {
        const result = db.prepare('SELECT * FROM usuarios WHERE id_usuario = ?').get(id_usuario);
        return result as usuarios || null;
    }

    buscarPorEmail(email_usuario: string): usuarios | null {
        const result = db.prepare('SELECT * FROM usuarios WHERE email_usuario = ?').get(email_usuario);
        return result as usuarios || null;
    }

    buscarPorNome(nome_usuario: string): usuarios[] {
        const result = db.prepare('SELECT * FROM usuarios WHERE nome_usuario LIKE ?').all(`%${nome_usuario}%`);
        return result as usuarios[];
    }

    buscarPoriade(idade_usuario: number): usuarios[] {
        const result = db.prepare('SELECT * FROM usuarios WHERE idade_usuario = ?').all(idade_usuario);
        return result as usuarios[];
    }

    buscarPorCidade(cidade: string): usuarios[] {
        const result = db.prepare('SELECT * FROM usuarios WHERE cidade = ?').all(cidade);
        return result as usuarios[];
    }

    buscarPorEstado(estado: string): usuarios[] {
        const result = db.prepare('SELECT * FROM usuarios WHERE estado = ?').all(estado);
        return result as usuarios[];
    }
}