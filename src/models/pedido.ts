export interface pedido {
    id_pedido?: number;
    id_usuarios: number;
    data: Date;
    valor_total: number;
    status: string;
}