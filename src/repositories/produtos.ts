import db from '../database/database';
import { produtos } from '../models/produtos';

export class ProdutosRepository {

    listar(): produtos[] {
        return db.prepare('SELECT * FROM produtos').all() as produtos[];
    }

    listarPorPreco(min: number, max: number): produtos[] {
        return db
            .prepare('SELECT * FROM produtos WHERE preco_produto BETWEEN ? AND ? ORDER BY preco_produto ASC')
            .all(min, max) as produtos[];
    }

    buscarItensPedidos() {
        return db.prepare(`
            SELECT pedidos.id_pedido, produtos.nome_produto, item_pedido.quantidade, item_pedido.preco
            FROM item_pedido
            JOIN pedidos ON item_pedido.id_pedido = pedidos.id_pedido
            JOIN produtos ON item_pedido.id_produto = produtos.id_produto
            ORDER BY pedidos.id_pedido
        `).all();
    }
}