import db from '../database/database';
import { carrinhos } from '../models/carrinhos';

export class CarrinhosRepository {

    salvar(c: carrinhos): carrinhos {
        const r = db.prepare('INSERT INTO carrinhos (id_usuario, preco_produto, valor_frete) VALUES (?, ?, ?)')
        .run(c.id_usuario, c.preco_produto, c.valor_frete);

        return { ...c, id_carrinhos: r.lastInsertRowid as number };
    }

    listar() {
        return db.prepare('SELECT * FROM carrinhos').all();
    }

    listarPorUsuario(id: number) {
        return db.prepare('SELECT * FROM carrinhos WHERE id_usuario = ?').all(id);
    }

    listarPorFrete(valor: number) {
        return db.prepare('SELECT * FROM carrinhos WHERE valor_frete > ?').all(valor);
    }
}