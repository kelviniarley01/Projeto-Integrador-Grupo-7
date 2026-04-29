import db from '../database/database';
import { produtos } from '../models/produtos';

export class ProdutosRepository {
    salvar(p: produtos): produtos {
        const r = db.prepare('INSERT INTO produtos (nome_produto, descricao_produto, preco_produto, estoque_produto) VALUES (?, ?, ?, ?)')
        .run(p.nome_produto, p.descricao_produto, p.preco_produto, p.estoque_produto);

        return { ...p, id_produto: r.lastInsertRowid as number };
    }

    listar() {
        return db.prepare('SELECT * FROM produtos').all();
    }

    listarPorPreco(min: number, max: number) {
        return db.prepare('SELECT * FROM produtos WHERE preco_produto BETWEEN ? AND ? ORDER BY preco_produto ASC').all(min, max);
    }
}