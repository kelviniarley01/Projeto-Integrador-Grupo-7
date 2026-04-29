import db from '../database/database';
import { pagamento } from '../models/pagamento';

export class PagamentosRepository {

    listar(): pagamento[] {
        return db.prepare('SELECT * FROM pagamentos').all() as pagamento[];
    }

    listarPorTipo(tipo: string): pagamento[] {
        return db
            .prepare('SELECT * FROM pagamentos WHERE tipo_pagamento = ?')
            .all(tipo) as pagamento[];
    }

    buscarComPedidos() {
        return db.prepare(`
            SELECT pagamentos.tipo_pagamento, pagamentos.status_pagamento, pedidos.valor_total
            FROM pagamentos
            JOIN pedidos ON pagamentos.id_pedido = pedidos.id_pedido
            ORDER BY pedidos.valor_total DESC
        `).all();
    }
}