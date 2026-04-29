import Database from 'better-sqlite3';
import path from "path";

const db = new Database(path.join(__dirname, 'database.db'));
const db = new Database(dbPath);

db.pragma("foreign_keys = ON");

db.exec(`

    CREATE TABLE IF NOT EXISTS usuarios (
        id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_usuario TEXT,
        email_usuario TEXT UNIQUE,
        senha_usuario TEXT,
        idade_usuario INTEGER,
        data_cadastro_usuario TEXT,
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
        nome_ingrediente TEXT,
        tipo_ingrediente TEXT,
    );

    CREATE TABLE IF NOT EXISTS ingredientes_produtos (
        id_ingrediente_produto INTEGER PRIMARY KEY AUTOINCREMENT,
        id_produto INTEGER,
        id_ingrediente INTEGER,
        FOREIGN KEY (id_produto) REFERENCES produtos(id_produto),
        FOREIGN KEY (id_ingrediente) REFERENCES ingredientes(id_ingrediente)
    );

    CREATE TABLE IF NOT EXISTS ingredientes_produtos (
        id_ingrediente_produto INTEGER PRIMARY KEY AUTOINCREMENT,
        id_produto INTEGER,
        id_ingrediente INTEGER,
        FOREIGN KEY (id_produto) REFERENCES produtos(id_produto),
        FOREIGN KEY (id_ingrediente) REFERENCES ingredientes(id_ingrediente)
    );

    CREATE TABLE IF NOT EXISTS carrinhos (
        id_carrinho INTEGER PRIMARY KEY AUTOINCREMENT,
        id_usuario INTEGER,
        preco_total REAL,
        valor_frete REAL,
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
    );

    CREATE TABLE IF NOT EXISTS itens_carrinho (
        id_item_carrinho INTEGER PRIMARY KEY AUTOINCREMENT,
        if_carrinho INTEGER,
        nome_usuario TEXT,
        data DATETIME,
        valor_total REAL,
        status TEXT,
        FOREIGN KEY (id_carrinho) REFERENCES carrinhos(id_carrinho)
    );

    CREATE TABLE IF NOT EXISTS pedidos (
        id_pedido INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_usuario TEXT,
        data DATETIME,
        valor_total REAL,
        status TEXT
        FOREIGN KEY (nome_usuario) REFERENCES usuarios(nome_usuario)
    );

    CREATE TABLE IF NOT EXISTS itens_pedido (
        id_item_pedido INTEGER PRIMARY KEY AUTOINCREMENT,
        id_pedido INTEGER,
        id_produto INTEGER,
        quantidade INTEGER,
        preco_unitario REAL,
        FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
        FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
    );

    CREATE TABLE IF NOT EXISTS pagamentos (
        id_pagamento INTEGER PRIMARY KEY AUTOINCREMENT,
        id_pedido INTEGER,
        tipo_pagamento TEXT,
        status_pagamento TEXT,
        valor_pagamento REAL,
        FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido)
    );

    CREATE TABLE IF NOT EXISTS fretes (
        id_frete INTEGER PRIMARY KEY AUTOINCREMENT,
        id_pedido INTEGER,
        valor REAL,
        prazo_entrega TEXT,
        rua TEXT,
        numero INTEGER,
        cidade TEXT,
        estado TEXT,
        FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido)
    );

    CREATE TABLE IF NOT EXISTS administradore(
        id_administrador INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_administrador TEXT,
        email_administrador TEXT,
        senha_administrador TEXT
    );

    CREATE TABLE IF NOT EXISTS ajudas (
        id_pergunta INTEGER PRIMARY KEY AUTOINCREMENT,
        pergunta TEXT,
        resposta TEXT
    );


    CREATE TABLE IF NOT EXISTS loja (
        id_loja INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_loja TEXT,
        descricao_loja TEXT,
    );

    CREATE TABLE IF NOT EXISTS informacoes_produto (
        id_informacao INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_produto TEXT,
        beneficios_produto TEXT,
        modo_uso TEXT,
        conservacao TEXT
        FOREIGN KEY (nome_produto) REFERENCES produtos(nome_produto)
    );

    -----INSERTS--------------

    NSERT INTO usuarios(nome_usuario, email_usuario, senha_usuario, idade_usuario, data_cadastro, rua, numero, cidade, estado)
 VALUES
 ('Raphael','raphaelsilvadefarias@gmail.com', 1234, 16, '2026-04-22', 'rua marechal teodoro', 15, 'Guarujá', 'SP');


 INSERT INTO produtos(nome_produto, descricao, preco_produto, desconto, estoque)
 VALUES
 ('Hidratante Labial', 'utilizar para hidratar os lábios', 35.99, 12.89, 23);

insert into ingredientes( nome, tipo)
VALUES
('Hortelã', 'planta');

INSERT INTO ingredientes_produto(id_produto, id_ingredientes)
VALUES
(1,1);

INSERT INTO carrinhos (id_usuario, preco_produto, valor_frete)
VALUES
(1, 35.99, 5.99);

INSERT INTO item_carrinho( id_carrinho, nome_produto, quantidade, preco_unitario)
VALUES
(1, 'Hidratante Labial', 1, 35.99);

INSERT INTO pedidos(nome_usuario, data, valor_total, status)
VALUES
('Raphael', '2026-04-22', 41.98,'Pagamento feito com sucesso e Pedido pendente');

INSERT INTO item_pedido (id_pedido, id_produto, quantidade, preco)
VALUES
(1,1,1, 35.99);

INSERT INTO pagamentos (id_pedido, tipo_pagamento, status_pagamento, valor_pagamento)
VALUES
(1,'Pix', 'Pagamento feito', 41.98);

INSERT INTO fretes (id_pedido, valor, prazo, rua, numero, cidade, estado)
VALUES
(1, 5.99,'3 a 4 dias', 'rua marechal teodoro', 15, 'Guarujá', 'SP');

INSERT INTO administrador( nome_administrador, email_adminsitrador, senha_administrador)
VALUES
('Kelvin', 'kelviniarley6@gmail.com', 'bola012212');

INSERT INTO ajudas (pergunta, resposta)
VALUES
('Qual é o prazo de entrega do produto?', 'Cada produto tem um prazo de entrega diferente.'),
('É possível adicionar mais de um produto no carrinho?', 'Sim, é possível adicionar mais de um produto no carrinho.');

INSERT INTO Loja (id_loja, nome, descricao)
VALUES
(1, 'Mentha Lab', 'site de venda de produtos cosméticos');

INSERT INTO informacoes_produto (nome_produto, beneficios, modo_uso, conservacao)
VALUES
('Hidratante Labial', 'Hidratar os lábios', 'aplique uma pequena quantidade sobre os lábios limpos, deslizando o bastão ou usando a ponta dos dedos, do centro para as bordas', 'guarde-o em locais frescos, secos e longe da luz');

´);

export default db;