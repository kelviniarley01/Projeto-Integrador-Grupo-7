import db from '../database/database';
import { informacoes_Produto } from '../models/informações_produto';

export class InformacoesProdutoRepository {
    salvar(i: informacoes_Produto): informacoes_Produto {
        const r = db.prepare('INSERT INTO informacoes_produto (nome_produto, beneficios, modo_uso, conservacao) VALUES (?, ?, ?, ?)')
        .run(i.nome_produto, i.beneficios, i.modo_uso, i.conservacao);

        return { ...i, id_informacao: r.lastInsertRowid as number };
    }

    listar() {
        return db.prepare('SELECT * FROM informacoes_produto').all();
    }

    buscarPorNome(nome: string) {
        return db.prepare('SELECT * FROM informacoes_produto WHERE nome_produto = ?').all(nome);
    }
}