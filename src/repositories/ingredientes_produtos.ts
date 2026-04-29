import db from '../database/database';
import { ingredientes_produtos } from '../models/ingredientes_produtos';

export class IngredientesProdutosRepository {
    salvar(i: ingredientes_produtos): ingredientes_produtos {
        const r = db.prepare('INSERT INTO ingredientes_produto (id_produto, id_ingredientes) VALUES (?, ?)')
        .run(i.id_produto, i.id_ingredientes);

        return { ...i, id_ingredientes_produtos: r.lastInsertRowid as number };
    }

    listar() {
        return db.prepare('SELECT * FROM ingredientes_produto').all();
    }

    listarPorProduto(id: number) {
        return db.prepare('SELECT * FROM ingredientes_produto WHERE id_produto = ?').all(id);
    }
}