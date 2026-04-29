-----USUARIOS --------------
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_usuario TEXT,
    email_usuario TEXT,
    senha_usuario TEXT,
    idade_usuario INTEGER,
    data_cadastro_usuario TEXT,
    rua_usuario TEXT,
    numero_usuario INTEGER,
    cidade_usuario TEXT
    estado_usuario TEXT
);

-----PRODUTOS --------------
CREATE TABLE IF NOT EXISTS produtos (
    id_produto INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_produto TEXT,
    descricao_produto TEXT,
    preco_produto REAL,
    estoque_produto INTEGER
);

-----INGREDIENTES --------------
CREATE TABLE IF NOT EXISTS ingredientes (
    id_ingrediente INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_ingrediente TEXT,
    descricao_ingrediente TEXT
);

----- INGREDIENTES_PRODUTOS --------------
CREATE TABLE IF NOT EXISTS ingredientes_produtos (
    id_ingrediente_produto INTEGER PRIMARY KEY AUTOINCREMENT,
    id_produto INTEGER,
    id_ingrediente INTEGER,
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto),
    FOREIGN KEY (id_ingrediente) REFERENCES ingredientes(id_ingrediente)
);

------CARRINHO -------
CREATE TABLE IF NOT EXISTS carrinho (
    id_carrinho INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER,
    preco_produto REAL,
    valor_frete REAL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

----- ITEMS_CARRINHO --------------
CREATE TABLE IF NOT EXISTS item_carrinho (
    id_item_carrinho INTEGER PRIMARY KEY AUTOINCREMENT,
    id_carrinho INTEGER,
    id_produto INTEGER,
    quantidade INTEGER,
    FOREIGN KEY (id_carrinho) REFERENCES carrinho(id_carrinho),
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
);

-----PEDIDOS --------------
CREATE TABLE IF NOT EXISTS pedidos (
    id_pedido INTEGER PRIMARY KEY AUTONICREMENT,
    nome_usuario TEXT,
    data DATETIME,
    valor_total REAL,
    status_pedido TEXT
    FOREIGN KEY (nome_usuario) REFERENCES usuarios(nome_usuario)
);

-----ITEMS_PEDIDOS --------------
CREATE TABLE IF NOT EXISTS item_pedido (
    id_item_pedido INTEGER PRIMARY KEY AUTOINCREMENT,
    id_pedido INTEGER,
    id_produto INTEGER,
    quantidade INTEGER,
    preco_unitario REAL,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
);

---- PAGAMENTOS --------------
CREATE TABLE IF NOT EXISTS pagamentos (
    id_pagamento INTEGER PRIMARY KEY AUTOICREMENT,
    id_pedido INTEGER,
    tipo_pagamento TEXT,
    status_pagamento TEXT,
    valor_pagamento REAL,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido)
);

----FRETES --------------
CREATE TABLE IF NOT EXISTS fretes (
    id_frete INTEGER  PRIMARY KEY AUTOINCREMENT,
    id_pedido INTEGER,
    valor_frete REAL,
    prazo_entrega TEXT,
    rua TEXT,
    numero INTEGER,
    cidade TEXT,
    estado TEXT,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido)
);

----- ADMINISTRADORES --------------
CREATE TABLE IF NOT EXISTS administradores (
    id_administrador INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_administrador TEXT,
    email_administrador TEXT,
    senha_administrador TEXT
);

--- AJUDAS --------------
CREATE TABLE IF NOT EXISTS ajudas (
    id_pergunta INTEGER PRIMARY KEY AUTOINCREMENT,
    pergunta TEXT,
    resposta TEXT
);

--- LOJA --------------
CREATE TABLE IF NOT EXISTS loja (
    id_loja INTEGER PRIMARY KEY AUTONICREMENT,
    nome_loja TEXT,
    descricao_loja TEXT,
);

----INFORMAÇÕES_PRODUTO----------------------
CREATE TABLE IF NOT EXISTS informacoes_produto (
    id_informacao INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_produto TEXT,
    beneficios TEXT,
    modo_uso TEXT,
    conservacao TEXT,
    FOREIGN KEY (nome_produto) REFERENCES produtos(nome_produto)
);