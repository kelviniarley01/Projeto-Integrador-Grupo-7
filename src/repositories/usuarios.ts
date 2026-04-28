import db from '../database/database';
import { usuarios } from '../models/usuarios';

export class UsuariosRepository {

    listar(): usuarios[] {
        return db.prepare('SELECT * FROM usuarios').all() as usuarios[];
    }

    listarPorCidade(cidade: string): usuarios[] {
        return db.prepare('SELECT * FROM usuarios WHERE cidade = ?').all(cidade) as usuarios[];
    }

    listarPorIdade(min: number, max: number): usuarios[] {
        return db
            .prepare('SELECT * FROM usuarios WHERE idade_usuario BETWEEN ? AND ? ORDER BY nome_usuario ASC')
            .all(min, max) as usuarios[];
    }

    buscarPedidos() {
        return db.prepare(`
            SELECT pedidos.id_pedido, usuarios.nome_usuario, pedidos.valor_total, pedidos.status
            FROM pedidos
            JOIN usuarios ON pedidos.nome_usuario = usuarios.nome_usuario
            ORDER BY pedidos.valor_total DESC
        `).all();
    }

    buscarFretes() {
        return db.prepare(`
            SELECT usuarios.nome_usuario, fretes.cidade, fretes.valor, fretes.prazo
            FROM fretes
            JOIN pedidos ON fretes.id_pedido = pedidos.id_pedido
            JOIN usuarios ON pedidos.nome_usuario = usuarios.nome_usuario
            ORDER BY fretes.valor DESC
        `).all();
    }
}