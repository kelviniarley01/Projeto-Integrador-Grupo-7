import db from '../database/database';
import { ingredientes } from '../models/ingredientes';

export class IngredientesRepository {

    listar(): ingredientes[] {
        return db.prepare('SELECT * FROM ingredientes').all() as ingredientes[];
    }

    listarPorTipo(tipo: string): ingredientes[] {
        return db
            .prepare('SELECT * FROM ingredientes WHERE tipo = ?')
            .all(tipo) as ingredientes[];
    }
}