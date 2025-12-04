import './Home.css';

export default function Home() {
  return (
    <>
    
    <main className="iconedefundo_menu">
        <section>
            <div>
                <img className="img_logo" src="../BurguerStation/assets/Logo Menu.png" alt="logo"/>
                <img className="banners" src="../BurguerStation/assets/Group 5 (1).png" alt=""/>
            </div>
        </section>

        <h1 className="acessível">Pagina inicial</h1>

        <section className="secao_cards">

            <a className="card card_frango" href="">
                <img className="plus" src="../BurguerStation/assets/Vector Frango.png" alt=""/>
                <img src="../BurguerStation/assets/hambuguer frango.png" alt=""/>
                <img className="etiqueta" src="../BurguerStation/assets/etiqueta frango.png" alt=""/>
                <h2>FRANGO</h2>
            </a>

            <a className="card card_vegetariano" href="">
                <img className="plus" src="../BurguerStation/assets/Vector Frango.png" alt=""/>
                <img src="../BurguerStation/assets/hamburguer vegetariano.png" alt=""/>
                <img className="etiqueta" src="../BurguerStation/assets/etiqueta frango.png" alt=""/>
                <h2>VEGETARIANO</h2>
            </a>

            <a className="card card_bovino" href="">
                <img className="plus" src="../BurguerStation/assets/Vector Frango.png" alt=""/>
                <img src="../BurguerStation/assets/hamburguer bovino.png" alt=""/>
                <img className="etiqueta" src="../BurguerStation/assets/etiqueta frango.png" alt=""/>
                <h2>CARNE</h2>
            </a>

            <a className="card card_acompanhamento" href="">
                <img className="plus" src="../BurguerStation/assets/Vector Frango.png" alt=""/>
                <img src="../BurguerStation/assets/Batata frita.png" alt=""/>
                <img className="etiqueta" src="../BurguerStation/assets/etiqueta frango.png" alt=""/>
                <h2>ACOMPANHAMENTOS</h2>
            </a>

            <a className="card card_sobremesas" href="">
                <img className="plus" src="../BurguerStation/assets/Vector Frango.png" alt=""/>
                <img src="../BurguerStation/assets/Sorvete.png" alt=""/>
                <img className="etiqueta" src="../BurguerStation/assets/etiqueta frango.png" alt=""/>
                <h2>SOBREMESAS</h2>
            </a>

            <a className="card card_bebidas" href="">
                <img className="plus" src="../BurguerStation/assets/Vector Frango.png" alt=""/>
                <img src="../BurguerStation/assets/Bebida.png" alt=""/>
                <img className="etiqueta" src="../BurguerStation/assets/etiqueta frango.png" alt=""/>
                <h2>BEBIDAS</h2>
            </a>


        </section>

        <a className="whatsapp" href="https://wa.me/5511999999999?text=Olá%20,%20gostaria%20de%20mais%20informações."
            target="_blank">
            <img src="../BurguerStation/assets/Ícone Whatsapp Menu.png" alt="icone do whatsapp"/>
        </a>
    </main>

    <footer className="rodape">
        <p>ONDE CADA MORDIDA É UMA VIAGEM DE SABOR - BURGER STATION</p>
    </footer>

    </>
  )
}
