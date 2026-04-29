import db from '../database/database';
import { itens_carrinhos } from '../models/itens_carrinhos';

export class ItensCarrinhoRepository {

    listar(): itens_carrinhos[] {
        return db.prepare('SELECT * FROM item_carrinho').all() as itens_carrinhos[];
    }

    listarPorQuantidade(): itens_carrinhos[] {
        return db
            .prepare('SELECT * FROM item_carrinho WHERE quantidade >= 1')
            .all() as itens_carrinhos[];
    }

    buscarPorProduto(nome: string): itens_carrinhos[] {
        return db
            .prepare('SELECT * FROM item_carrinho WHERE nome_produto = ?')
            .all(nome) as itens_carrinhos[];
    }

    buscarPorProdutos() {
        return db.prepare(`
            SELECT item_carrinho.id_carrinho, produtos.nome_produto, item_carrinho.quantidade, item_carrinho.preco_unitario
            FROM item_carrinho
            JOIN produtos ON item_carrinho.nome_produto = produtos.nome_produto
            ORDER BY item_carrinho.quantidade DESC
        `).all();
    }
}