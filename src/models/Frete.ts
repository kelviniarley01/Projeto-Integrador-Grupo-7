export interface Frete  {
    id_frete: number;
    id_pedido: number;
    valor: number;
    prazo: string;
    rua: string;
    numero: number;
    cidade: string;
    estado: string;
}