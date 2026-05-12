import db from '../database/database';
import { pedido } from '../models/pedido';

export class PedidosRepository {

    salvar(p: pedido): pedido {
        const r = db.prepare('INSERT INTO pedidos (id_usuario, data, valor_total, status) VALUES (?, ?, ?, ?)')
        .run(p.id_usuarios, p.data, p.valor_total, p.status);

        return { ...p, id_pedido: r.lastInsertRowid as number };
    }

    listar() {
        return db.prepare('SELECT * FROM pedidos ORDER BY id_pedido DESC').all();
    }

    listarPorUsuario(id: number) {
        return db.prepare('SELECT * FROM pedidos WHERE id_usuario = ? ORDER BY id_pedido DESC').all(id);
    }

    listarPorValor(valor: number) {
        return db.prepare('SELECT * FROM pedidos WHERE valor_total > ?').all(valor);
    }
}