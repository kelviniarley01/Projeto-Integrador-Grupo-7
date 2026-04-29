import db from '../database/database';
import { item_pedido } from '../models/item_pedido';

export class ItemPedidoRepository {
    salvar(i: item_pedido): item_pedido {
        const r = db.prepare('INSERT INTO item_pedido (id_pedido, id_produto, quantidade, preco) VALUES (?, ?, ?, ?)')
        .run(i.id_pedido, i.id_produto, i.quantidade, i.preco);

        return { ...i, id_item_pedido: r.lastInsertRowid as number };
    }

    listar() {
        return db.prepare('SELECT * FROM item_pedido').all();
    }

    listarPorPedido(id: number) {
        return db.prepare('SELECT * FROM item_pedido WHERE id_pedido = ?').all(id);
    }
}