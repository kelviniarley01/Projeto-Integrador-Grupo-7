import db from '../database/database';
import { ingredientes } from '../models/ingredientes';

export class IngredientesRepository {
    salvar(i: ingredientes): ingredientes {
        const r = db.prepare('INSERT INTO ingredientes (nome_ingredientes, tipo_ingredientes) VALUES (?, ?)')
        .run(i.nome_ingredientes, i.tipo_ingredientes);

        return { ...i, id_ingredientes: r.lastInsertRowid as number };
    }

    listar() {
        return db.prepare('SELECT * FROM ingredientes').all();
    }

    listarPorTipo(tipo: string) {
        return db.prepare('SELECT * FROM ingredientes WHERE tipo_ingredientes = ?').all(tipo);
    }
}