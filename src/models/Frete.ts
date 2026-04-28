export interface Frete  {
    id_frete: number;
    id_pedido: number;
    valor: number;
    prazo: string;
    rua: string;
    numero: string;
    cidade: string;
    estado: string;
}