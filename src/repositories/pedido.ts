import db from '../database/database';
import { pedido } from '../models/pedido';

export class PedidosRepository {

    salvar(p: pedido): pedido {
        const r = db.prepare('INSERT INTO pedidos (id_usuarios, data, valor_total, status) VALUES (?, ?, ?, ?)')
        .run(p.id_usuarios, p.data, p.valor_total, p.status);

        return { ...p, id_pedido: r.lastInsertRowid as number };
    }

    listar() {
        return db.prepare('SELECT * FROM pedidos').all();
    }

    listarPorUsuario(nome: string) {
        return db.prepare('SELECT * FROM pedidos WHERE nome_usuario = ?').all(nome);
    }

    listarPorValor(valor: number) {
        return db.prepare('SELECT * FROM pedidos WHERE valor_total > ?').all(valor);
    }
}