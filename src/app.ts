import express from 'express';

import { UsuariosController } from "./controllers/usuarios";
import { ProdutosController } from "./controllers/produtos";
import { PedidosController } from "./controllers/pedido";
import { PagamentosController } from "./controllers/pagamento";
import { CarrinhosController } from "./controllers/carrinhos";
import { ItensCarrinhosController } from "./controllers/itens_carrinhos";
import { ItemPedidoController } from "./controllers/item_pedido";
import { IngredientesController } from "./controllers/ingredientes";
import { IngredientesProdutosController } from "./controllers/ingredientes_produtos";
import { InformacoesProdutoController } from "./controllers/informações_produto";
import { FreteController } from "./controllers/Frete";
import { LojaController } from "./controllers/loja";
import { AjudasController } from "./controllers/ajudas";
import { AdministradorController } from "./controllers/administrador";


export const app = express();
app.use(express.json());

UsuariosController();
ProdutosController();
PedidosController();
PagamentosController();
CarrinhosController();
ItensCarrinhosController();
ItemPedidoController();
IngredientesController();
IngredientesProdutosController();
InformacoesProdutoController();
FreteController();
LojaController();
AjudasController();
AdministradorController();

app.listen(3000, () => {
  console.log("Aplicação no ar 🚀");
});