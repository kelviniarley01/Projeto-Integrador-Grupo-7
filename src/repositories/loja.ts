import db from '../database/database';
import { loja } from '../models/loja';

export class LojaRepository {

    listar(): loja[] {
        return db.prepare('SELECT * FROM Loja').all() as loja[];
    }

    buscarPorNome(nome: string): loja | null {
        return (db.prepare('SELECT * FROM Loja WHERE nome = ?').get(nome) as loja) || null;
    }

    listarPorNome(): loja[] {
        return db
            .prepare('SELECT * FROM Loja ORDER BY nome ASC')
            .all() as loja[];
    }

    listarPorIdDesc(): loja[] {
        return db
            .prepare('SELECT * FROM Loja ORDER BY id_loja DESC')
            .all() as loja[];
    }
}