import db from '../database/database';
import { Frete } from '../models/Frete';

export class FreteRepository {

    salvar(f: Frete): Frete {
        const r = db.prepare('INSERT INTO fretes (id_pedido, valor, prazo, rua, numero, cidade, estado) VALUES (?, ?, ?, ?, ?, ?, ?)')
        .run(f.id_pedido, f.valor, f.prazo, f.rua, f.numero, f.cidade, f.estado);

        return { ...f, id_frete: r.lastInsertRowid as number };
    }

    listar() {
        return db.prepare('SELECT * FROM fretes').all();
    }

    listarPorCidade(cidade: string) {
        return db.prepare('SELECT * FROM fretes WHERE cidade = ?').all(cidade);
    }
}