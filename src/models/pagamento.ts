export interface pagamento {
    id_pagamento: number;
    id_pedido: number;
    tipo_pagamento: string;
    status_pagamento: string;
    valor_pagamento: number;
}