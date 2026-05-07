import Database from 'better-sqlite3';
import path from "path";

const db = new Database(path.join(__dirname, 'database.db'));

db.pragma("foreign_keys = ON");

db.exec(`
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_usuario TEXT NOT NULL,
    email_usuario TEXT UNIQUE NOT NULL,
    senha_usuario TEXT NOT NULL,
    idade_usuario INTEGER,
    data_cadastro_usuario datetime,
    rua TEXT,
    numero TEXT,
    cidade TEXT,
    estado TEXT
);

CREATE TABLE IF NOT EXISTS produtos (
    id_produto INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_produto TEXT NOT NULL,
    descricao_produto TEXT,
    preco_produto REAL NOT NULL,
    quantidade_produto INTEGER
);

CREATE TABLE IF NOT EXISTS ingredientes (
    id_ingrediente INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_ingrediente TEXT NOT NULL,
    tipo_ingrediente TEXT
);

CREATE TABLE IF NOT EXISTS carrinhos (
    id_carrinho INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER NOT NULL,
    preco_total REAL,
    valor_frete REAL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);


CREATE TABLE IF NOT EXISTS itens_carrinho (
    id_item_carrinho INTEGER PRIMARY KEY AUTOINCREMENT,
    id_carrinho INTEGER NOT NULL,
    id_produto INTEGER NOT NULL,
    quantidade INTEGER NOT NULL,
    FOREIGN KEY (id_carrinho) REFERENCES carrinhos(id_carrinho),
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
);

CREATE TABLE IF NOT EXISTS pedidos (
    id_pedido INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER NOT NULL,
    data DATETIME,
    valor_total REAL,
    status TEXT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE IF NOT EXISTS itens_pedido (
    id_item_pedido INTEGER PRIMARY KEY AUTOINCREMENT,
    id_pedido INTEGER NOT NULL,
    id_produto INTEGER NOT NULL,
    quantidade INTEGER NOT NULL,
    preco_unitario REAL,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
);

CREATE TABLE IF NOT EXISTS pagamentos (
    id_pagamento INTEGER PRIMARY KEY AUTOINCREMENT,
    id_pedido INTEGER NOT NULL,
    tipo_pagamento TEXT,
    status_pagamento TEXT,
    valor_pagamento REAL,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido)
);

CREATE TABLE IF NOT EXISTS fretes (
    id_frete INTEGER PRIMARY KEY AUTOINCREMENT,
    id_pedido INTEGER NOT NULL,
    valor REAL,
    prazo_entrega TEXT,
    rua TEXT,
    numero INTEGER,
    cidade TEXT,
    estado TEXT,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido)
);

CREATE TABLE IF NOT EXISTS administradores (
    id_administrador INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_administrador TEXT NOT NULL,
    email_administrador TEXT UNIQUE NOT NULL,
    senha_administrador TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS ajudas (
    id_pergunta INTEGER PRIMARY KEY AUTOINCREMENT,
    pergunta TEXT NOT NULL,
    resposta TEXT
);


CREATE TABLE IF NOT EXISTS loja (
    id_loja INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_loja TEXT NOT NULL,
    descricao_loja TEXT
);

CREATE TABLE IF NOT EXISTS informacoes_produto (
    id_informacao INTEGER PRIMARY KEY AUTOINCREMENT,
    id_produto INTEGER NOT NULL,
    beneficios_produto TEXT,
    modo_uso TEXT,
    conservacao TEXT,
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
);
`);

export default db;