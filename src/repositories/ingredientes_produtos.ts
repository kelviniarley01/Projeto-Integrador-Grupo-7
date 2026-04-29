import db from '../database/database';
import { ingredientes_produtos } from '../models/ingredientes_produtos';

export class IngredientesProdutosRepository {

    listar(): ingredientes_produtos[] {
        return db.prepare('SELECT * FROM ingredientes_produto').all() as ingredientes_produtos[];
    }

    listarPorProduto(id: number): ingredientes_produtos[] {
        return db
            .prepare('SELECT * FROM ingredientes_produto WHERE id_produto = ?')
            .all(id) as ingredientes_produtos[];
    }
}