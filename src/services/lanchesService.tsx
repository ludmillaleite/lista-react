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

export const deleteLanche = async (idLanche: string): Promise<void> => {
  try {
    await axios.delete(`http://localhost:3000/lanches/${idLanche}`)
  } catch (error) {
    console.error("Erro ao deletar o bolo: ", error);
    throw error;
  }
}

export const enviarFotoParaAPI = async (file: File): Promise<string | undefined> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await axios.post("http://localhost:3000/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data.filename;
  } catch (error) {
    console.error("Erro no upload da imagem: ", error);
    return undefined;
  }
};

export const postLanche = async (lanche: Lanche): Promise<void> => {
  try {
    await axios.post("http://localhost:3000/lanches", lanche);
  } catch (error) {
    console.error("Erro ao cadastrar o lanche:", error);
    throw error;
  }
};