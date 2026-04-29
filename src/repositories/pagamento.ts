import db from '../database/database';
import { pagamento } from '../models/pagamento';

export class PagamentosRepository {
    salvar(p: pagamento): pagamento {
        const r = db.prepare('INSERT INTO pagamentos (id_pedido, tipo_pagamento, status_pagamento, valor_pagamento) VALUES (?, ?, ?, ?)')
        .run(p.id_pedido, p.tipo_pagamento, p.status_pagamento, p.valor_pagamento);

        return { ...p, id_pagamento: r.lastInsertRowid as number };
    }

    listar() {
        return db.prepare('SELECT * FROM pagamentos').all();
    }

    listarPorTipo(tipo: string) {
        return db.prepare('SELECT * FROM pagamentos WHERE tipo_pagamento = ?').all(tipo);
    }
}