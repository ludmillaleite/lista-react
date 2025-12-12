import React, { useEffect, useState, type ChangeEvent } from 'react';
import Header from '../../components/Header/Header';
import { deleteLanche, enviarFotoParaAPI, getLanche, postLanche } from '../../services/lanchesService';
import type { Lanche } from '../../types/Lanche';
import './Cadastro.css'
import Footer from '../../components/Footer/Footer';
import { formatosService } from '../../services/formatosService';
import ModalCustomizado from '../../components/ModalCustomizado/ModalCustomizado';
import { NumericFormat } from 'react-number-format';

export default function Cadastro() {

    const [lanches, setLanches] = useState<Lanche[]>([]);
    const [nomeLanche, setNomeLanche] = useState<string>("");
    const [categorias, setCategorias] = useState<string>("");
    const [bgImagemInputColor, setBgImagemInputColor] = useState<string>(" #ffffff");
    const [imagem, setImagem] = useState<File | undefined>(undefined);
    const [preco, setPreco] = useState<number | undefined>(undefined);
    const [descricao, setDescricao] = useState<string>("");

    const [clicouNaLixeira, setClicouNaLixeira] = useState<boolean>(false);
    const [idParaDeletar, setIdParaDeletar] = useState<string>("");
    const [aposConfirmacaoDeBoloRemovido, setAposConfirmacaoDeBoloRemovido] = useState<boolean>(false);
    const [propsModalDeErroOuSucesso, setPropsModalDeErroOuSucesso] = useState<{ exibir: boolean; titulo: string; corpo: string; }>({ exibir: false, titulo: "", corpo: "" });


    const abrirModalParaConfirmarDelete = (id: string) => {
        setClicouNaLixeira(true);
        setIdParaDeletar(id);
    }

    const fecharModalConfirmacaoDelete = () => {
        setClicouNaLixeira(false);
    }

    const exibirModalDeErroOuSucesso = (titulo: string, corpo: string) => (
        setPropsModalDeErroOuSucesso({ exibir: true, titulo, corpo })
    );

    const removerItemAposCOnfirmacao = async (id: string) => {
        try {
            await deleteLanche(id);
            setAposConfirmacaoDeBoloRemovido(true);
            await fetchLanches();
            fecharModalConfirmacaoDelete();
        } catch (error) {
            exibirModalDeErroOuSucesso("Erro", "Erro ao deletar o bolo.");

        }
    }

    const fecharModalDeErroOuSucesso = () => {
        setPropsModalDeErroOuSucesso({ ...propsModalDeErroOuSucesso, exibir: false });
    };

    const carregarImagem = (img: ChangeEvent<HTMLInputElement>) => {
        const file = img.target.files?.[0];
        if (file?.type.includes("image")) {
            setImagem(file);
            setBgImagemInputColor(" #5cb85c")
        }
        else {
            setImagem(undefined);
            setBgImagemInputColor(" #ff2c2c");
        }
    }

    const limparDados = () => {
        setNomeLanche("");
        setCategorias("");
        setImagem(undefined);
        setPreco(undefined);
        setDescricao("");
        setBgImagemInputColor(" #ffffff");
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!nomeLanche || !categorias || !preco) {
            exibirModalDeErroOuSucesso("Campos obrigatórios", "Preencha o nome, categoria(s) e preço do lanche");
            return;
        }

        let uploadedFileName: string | undefined;

        if (imagem) {
            uploadedFileName = await enviarFotoParaAPI(imagem);
            if (!uploadedFileName) {
                exibirModalDeErroOuSucesso("Erro", "Cadastro cancelado por falha no upload da imagem.");
                return;
            }
        }

        const novoLanche: Lanche = {
            id: undefined,
            nome: nomeLanche,
            descricao: descricao,
            preco: preco,
            categorias: categorias.toLowerCase().split(",").map(c => c.trim()),
            imagens: uploadedFileName ? [uploadedFileName] : []
        };

        try {
            await postLanche(novoLanche);
            exibirModalDeErroOuSucesso("Sucesso", "Novo lanche cadastrado com sucesso!");
            limparDados();
            fetchLanches();
        } catch {
            exibirModalDeErroOuSucesso("Erro", "Erro ao cadastrar novo lanche.");
        }
    };

    const fetchLanches = async () => {
        try {
            const dados = await getLanche();
            setLanches(dados);
        } catch (error) {
            console.error("Erro ao executar getLanches: ", error);
        }
    };

    useEffect(() => {
        fetchLanches();
    }, [])


    return (
        <>
            <Header />
            <main className="iconedefundo_cadastro">

                <section>
                    <div>
                        <img className="img_logo" src="../BurguerStation/assets/Logo Menu.png" alt="" />
                    </div>
                </section>

                <form onSubmit={handleSubmit} className="container_cadastro">
                    <div className="titulo">
                        <h2 className="">Cadastro</h2>
                        <img src="../BurguerStation/assets/desenho hamburger.png" alt="hamburger" />
                    </div>


                    <div className="container_busca">
                        <div className="prod_cat">
                            <div className="linha1">
                                <div>
                                    <label htmlFor="prod">Lanche</label>
                                    <input className="linhas_1e2"
                                        type="text"
                                        id="prod"
                                        placeholder="Insira o nome do lanche"
                                        value={nomeLanche}
                                        onChange={c => setCategorias(c.target.value)}>
                                    </input>
                                </div>

                                <div className='valor'>
                                    <label htmlFor="val">Valor</label>
                                    <NumericFormat
                                        id="valor"
                                        placeholder="Insira o preço (R$)"
                                        value={preco ?? ""}
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        prefix='R$ '
                                        decimalScale={2}
                                        fixedDecimalScale
                                        allowNegative={false}
                                        onValueChange={(values) => {
                                            setPreco(values.floatValue ?? undefined);
                                        }}
                                        inputMode="decimal"
                                    />
                                </div>

                                <div className="categoria-div">
                                    <div className="categoria">
                                        <label htmlFor="cat">Categoria</label>
                                        <input className="linhas_1e2"
                                            type="text"
                                            id="cat"
                                            placeholder="Frango, Vegetariano, Carne..."
                                            value={categorias}
                                            onChange={c => setCategorias(c.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="seta" htmlFor="img">
                                            <img src="../BurguerStation/assets/Vector (1).png" alt="" />
                                        </label>
                                        <input type="file" id="img"> </input>
                                    </div>
                                </div>
                            </div>

                            <div className="img">
                                <label htmlFor="img">
                                    <span>Imagem</span>
                                    <div style={{ backgroundColor: bgImagemInputColor }} >
                                        img???
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    id="img"
                                    alt="imagem_do_lanche"
                                    accept="image/*"
                                    onChange={carregarImagem}
                                />
                            </div>

                            <div className="descricao">

                                <div className="cadastro_coluna2">
                                    <label className="Descricaotexto" htmlFor="desc">Descrição</label>
                                    <textarea
                                        id="desc"
                                        maxLength={200}
                                        placeholder="Escreva detalhes sobre o lanche"
                                        value={descricao}
                                        onChange={d => setDescricao(d.target.value)}
                                    />

                                </div>
                                {/* <div className="botaodeconfirmar">
                                    <button className="botao" type="submit">
                                        <img className="Botao_confirmar" src="../BurguerStation/assets/Vector (2).png" alt="confirmar" />
                                    </button>
                                </div> */}

                            </div>
                        </div>
                    </div>
                </form>

                <section className="container_lista">
                    <h1></h1>
                    <h2>Lista</h2>

                    <table>
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Categoria</th>
                                <th>Descrição</th>
                                <th>Preco</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                lanches.map((l: Lanche) => (
                                    <tr key={l.id}>
                                        <td data-cell="Lanche: ">{l.nome}</td>
                                        <td data-cell="Categoria: ">{l.categorias.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(", ")}</td>
                                        <td data-cell="Descrição: ">{l.descricao || "Não informada"}</td>

                                        <td data-cell="Valor: ">{formatosService.PrecoBR(l.preco) || "Não informada"}</td>
                                        <td>
                                            <img onClick={() => abrirModalParaConfirmarDelete(l.id!)} src={"Excluir"} alt="Excluir" />
                                        </td>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </section>




            </main>
            <Footer />

            <ModalCustomizado
                mostrarModalQuando={clicouNaLixeira}
                aoCancelar={fecharModalConfirmacaoDelete}
                titulo='Confirmar exclusão'
                corpo="Tem certeza que deseja remover o bolo?"
                customizarBotoes={true}
                textoBotaoConfirmacao='Excluir'
                textoBotaoCancelamento='Cancelar'
                aoConfirmar={() => removerItemAposCOnfirmacao(idParaDeletar)}
                exibirConteudoCentralizado={true}
            />

            <ModalCustomizado
                mostrarModalQuando={aposConfirmacaoDeBoloRemovido}
                aoCancelar={() => setAposConfirmacaoDeBoloRemovido(false)}
                titulo='Sucesso'
                corpo='Lanche removido!'
            />

            <ModalCustomizado
                mostrarModalQuando={propsModalDeErroOuSucesso.exibir}
                aoCancelar={fecharModalDeErroOuSucesso}
                titulo={propsModalDeErroOuSucesso.titulo}
                corpo={propsModalDeErroOuSucesso.corpo}
                exibirConteudoCentralizado={true}
            />

        </>
    )
}
