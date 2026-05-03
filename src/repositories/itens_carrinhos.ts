import db from '../database/database';
import { itens_carrinhos } from '../models/itens_carrinhos';

export class Itens_CarrinhosRepository {
    salvar(i: itens_carrinhos): itens_carrinhos {
        const r = db.prepare('INSERT INTO item_carrinho (id_carrinho, nome_produto, quantidade, preco_unitario) VALUES (?, ?, ?, ?)')
        .run(i.id_carrinho, i.nome_produto, i.quantidade, i.preco_unitario);

        return { ...i, id_item: r.lastInsertRowid as number };
    }

    listar() {
        return db.prepare('SELECT * FROM item_carrinho').all();
    }

    buscarPorProduto(nome: string) {
        return db.prepare('SELECT * FROM item_carrinho WHERE nome_produto = ?').all(nome);
    }
}