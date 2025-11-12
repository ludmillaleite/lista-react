export interface Lanche {
    id: string | undefined;
    nome: string;
    descricao: string;
    preco: number;
    peso: number | null;
    categorias: string[];
    imagens: string[]; //lista de string é mostrada dessa forma
}