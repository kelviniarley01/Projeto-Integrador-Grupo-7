import db from '../database/database';
import { item_pedido } from '../models/item_pedido';

export class ItemPedidoRepository {

    listar(): item_pedido[] {
        return db.prepare('SELECT * FROM item_pedido').all() as item_pedido[];
    }

    listarPorPedido(id: number): item_pedido[] {
        return db
            .prepare('SELECT * FROM item_pedido WHERE id_pedido = ?')
            .all(id) as item_pedido[];
    }

    listarPorQuantidade(): item_pedido[] {
        return db
            .prepare('SELECT * FROM item_pedido WHERE quantidade >= 1')
            .all() as item_pedido[];
    }

    buscarPorProdutos() {
        return db.prepare(`
            SELECT pedidos.id_pedido, produtos.nome_produto, item_pedido.quantidade, item_pedido.preco
            FROM item_pedido
            JOIN pedidos ON item_pedido.id_pedido = pedidos.id_pedido
            JOIN produtos ON item_pedido.id_produto = produtos.id_produto
            ORDER BY pedidos.id_pedido
        `).all();
    }

    buscarFretesPorUsuarios() {
        return db.prepare(`
            SELECT usuarios.nome_usuario, fretes.cidade, fretes.valor, fretes.prazo
            FROM fretes
            JOIN pedidos ON fretes.id_pedido = pedidos.id_pedido
            JOIN usuarios ON pedidos.nome_usuario = usuarios.nome_usuario
            ORDER BY fretes.valor DESC
        `).all();
    }
}