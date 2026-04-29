import db from '../database/database';
import { pedido } from '../models/pedido';

export class PedidosRepository {

    listar(): pedido[] {
        return db.prepare('SELECT * FROM pedidos').all() as pedido[];
    }

    listarPorUsuario(nome: string): pedido[] {
        return db
            .prepare('SELECT * FROM pedidos WHERE nome_usuario = ?')
            .all(nome) as pedido[];
    }

    listarPorValor(valor: number): pedido[] {
        return db
            .prepare('SELECT * FROM pedidos WHERE valor_total > ?')
            .all(valor) as pedido[];
    }

    buscarComUsuarios() {
        return db.prepare(`
            SELECT pedidos.id_pedido, usuarios.nome_usuario, pedidos.valor_total, pedidos.status
            FROM pedidos
            JOIN usuarios ON pedidos.nome_usuario = usuarios.nome_usuario
            ORDER BY pedidos.valor_total DESC
        `).all();
    }
}