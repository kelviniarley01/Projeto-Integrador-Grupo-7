import db from '../database/database';
import { administrador } from '../models/administrador';

export class AdministradorRepository {
    salvar(a: administrador): administrador {
        const r = db
            .prepare('INSERT INTO administrador (nome_administrador, email_administrador, senha_administrador) VALUES (?, ?, ?)')
            .run(a.nome_administrador, a.email_administrador, a.senha_administrador);

        return { ...a, id_administrador: r.lastInsertRowid as number };
    }

    listar(): administrador[] {
        return db.prepare('SELECT * FROM administrador').all() as administrador[];
    }

    buscarPorNome(nome: string): administrador[] {
        return db
            .prepare('SELECT * FROM administrador WHERE nome_administrador = ?')
            .all(nome) as administrador[];
    }
}