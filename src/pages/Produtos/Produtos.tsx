import './Produtos.css';
//import card_de_frango from '../../assets/card frango 5.png'
//import card_de_frango2 from '../../assets/card frango 2.png'
//import card_de_frango3 from '../../assets/card frango 3.png'
//import transferir from '../../assets/transferir (3) 1.png'
import whatsapp from '../../assets/Ícone Whatsapp Menu.png';
import logo from '../../assets/inicio.png';
import { useEffect, useState } from 'react';
import type { Lanche } from '../../types/Lanche';
import { getLanche } from '../../services/lanchesService';
import CardProduto from '../../components/CardProduto/CardProduto';





export default function Produtos() {

    const [lanche, setLanche] = useState<Lanche[]>([]);
    // o state é sempre formado por um par

    const fetchLanche = async () => {
        try {
            const dados = await getLanche();
            console.log("Dados retornados da API: ", dados);
            setLanche(dados);
        } catch (error) {
            console.error("Erro ao excutar getLanche: ", error)
        }
    }

    useEffect(() => {
        fetchLanche();
    }, [])

    return (
        <main className="iconedefundo_cardapio">

            <section>
                <div>
                    <img className={logo} src="../Menu/assets/Logo Menu.png" alt="" />
                </div>
            </section>

            <h1>LANCHES DE FRANGO</h1>

            <section className="cards">
                {
                    lanche.map((lanche: Lanche) => {
                        return (
                            <CardProduto
                                key={lanche.id}
                                nome={lanche.nome}
                                descricao={lanche.descricao}
                                preco={lanche.preco}
                                imagem={lanche.imagens[0] ?? ""} />
                        );
                    })
                }

                {/* <section className="container">
                <div className="sessao_card1">
                    <div className="div_img">
                        <img src= {card_de_frango} alt=""/>
                    </div>
                    <div className="descricao">
                        <h2>CHEDDAR A VAPOR </h2>
                        <p> Pão com gergelim, dois frangos, molho cremoso sabor queijo cheddar, maionese e alface</p>
                        <span> R$ 45,80</span>
                    </div>
                </div>
                
                <div className="sessao_card2">
                    <div className="div_img">
                        <img src= {card_de_frango2} alt=""/>
                    </div>
                    <div className="descricao">
                        <h2>EXPRESSO DUO </h2>
                        <p> Um suculento hambúrguer de frango, alface, tomate e um delicioso molho furioso de alho.
                        </p>
                        <span> R$46,99</span>
                    </div>
                </div>

                <div className="sessao_card3">
                    <div className="div_img">
                        <img src={card_de_frango3} alt=""/>
                    </div>
                    <div className="descricao">
                        <h2>PLATAFORMA CHICKEN </h2>
                        <p> Um delicioso e suculento filé de frango crocante, maionese e alface.</p>
                        <span> R$43,30</span>
                    </div>
                </div>

                <div className="sessao_card4">
                    <div className="div_img">
                        <img src= {transferir} alt=""/>
                    </div>
                    <div className="descricao">
                        <h2>COMBO FERROVIA</h2>
                        <p> Maionese, alface, tomate, cebola, ketchup, picles e fritas</p>
                        <span> R$58,70 </span>
                    </div>
                </div>
            </section> */}
            </section>

            <section>
                <a className="whatsaap" href="">
                    <img src={whatsapp} alt="" />
                </a>


            </section>

        </main>
    )
}
