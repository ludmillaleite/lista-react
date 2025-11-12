import axios from "axios";
import type { Lanche } from "../types/Lanche";

export const getLanche = async (): Promise<Lanche[]> => {
    try {
        const resposta = await axios.get("http://localhost:3000/lanches");
        return resposta.data;
    } catch (error) {
      console.error("Erro ao buscar os dados: ", error);
      throw error;
    }
    //try = contém o código que pode gerar um erro.
    //catch = executa um código de tratamento quando o erro ocorre.
}