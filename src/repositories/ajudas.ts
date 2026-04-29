import db from '../database/database';
import { ajudas } from '../models/ajudas';

export class AjudasRepository {
    salvar(a: ajudas): ajudas {
        const r = db
            .prepare('INSERT INTO ajudas (id_pergunta, pergunta, resposta) VALUES (?, ?, ?)')
            .run(a.id_pergunta, a.pergunta, a.resposta);

        return { ...a, id_ajuda: r.lastInsertRowid as number };
    }

    listar(): ajudas[] {
        return db.prepare('SELECT * FROM ajudas').all() as ajudas[];
    }

    buscarPorPergunta(texto: string): ajudas[] {
        return db
            .prepare('SELECT * FROM ajudas WHERE pergunta LIKE ?')
            .all(`%${texto}%`) as ajudas[];
    }
}