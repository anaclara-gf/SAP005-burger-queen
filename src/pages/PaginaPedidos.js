/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import ErrorModal from '../components/ModalError';
import Adicionar from '../images/Ícones/add-close.png';
import Vaca from '../images/Ícones/vaca.png';
import Frango from '../images/Ícones/frango.png';
import Veggie from '../images/Ícones/planta.png';
import Ovo from '../images/Ícones/ovo.png';
import Queijo from '../images/Ícones/queijo.png';
import Lixeira from '../images/Ícones/lixo.png';
import Loading from '../components/Loading';
import Logo from "../components/Logo";
import '../style/paginapedidos.css'

function PaginaPedidos(){
    const {mesa} = useParams();
    const history = useHistory();
    const token = localStorage.getItem("token");
    const atendente = localStorage.getItem("atendente");
    const role = localStorage.getItem('role');
    const [loading, setLoading] = useState(true);
    const [radioButton, setRadioButton] = useState(false);

    const [menuCafe, setMenuCafe] = useState([]);
    const [menuAlmoco, setMenuAlmoco] = useState([]);

    const [menus, setMenus] = useState(true);

    const [listaCompletaDeProdutos, setListaCompletaDeProdutos] = useState("");
    const [openExtrasBurgerSimples, setOpenExtrasBurgerSimples] = useState(false)
    const [openExtrasBurgerDuplo, setOpenExtrasBurgerDuplo] = useState(false)
    const [extrasBurgerSimples, setExtrasBurgerSimples] = useState('');
    const [extrasBurgerDuplo, setExtrasBurgerDuplo] = useState('');
    const [selectedBurger, setSelectedBurger] = useState({
        name: null,
        flavor: null,
        complement: null
    });
    const [resumoPedido, setResumoPedido] = useState([]);
    const [fazerPedido, setFazerPedido] = useState({"client": "", "table": mesa, "products": []});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const hamburguers = [{name: "carne", img: Vaca, label: "carne"}, {name: "frango", img: Frango, label: "frango"}, {name: "vegetariano", img: Veggie, label: "veggie"},];
    const adicionais = [{name: "ovo", img: Ovo}, {name:"queijo", img: Queijo}];

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
        };

        fetch('https://lab-api-bq.herokuapp.com/products', requestOptions)
            .then(response => response.json())
            .then(data => {

                const products = data;
                setListaCompletaDeProdutos(data)

                const slice1 = products.slice(0,5);
                const slice2 = products.slice(22);
                let listaDeProdutosSemRepeticao = [];
                listaDeProdutosSemRepeticao = listaDeProdutosSemRepeticao.concat(slice1, products[13], slice2);
                
                const listaCafeDaManha = listaDeProdutosSemRepeticao.slice(0,4);
                setMenuCafe(listaCafeDaManha);
                
                const listaAlmoco = listaDeProdutosSemRepeticao.slice(4,12);
                setMenuAlmoco(listaAlmoco);
                
                setLoading(false);
            })   
        
    }, [token]);

    useEffect(() => {
      console.log(radioButton)
    }, [radioButton])

    function extras() {
      return (
        <>
          <div className="escolhas-extras">
            <section className="opcoes-burguer">
              <p className="titulo-extras">Hambúrguer</p>
              <section className="img-input-extras">
              {hamburguers.map(tipoHamburguer => (
                <>
                  <input
                    key={tipoHamburguer.name}
                    type="radio"
                    name="escolher-hamburguer"
                    id={tipoHamburguer.name}
                    onClick={(event) => {
                      selectedBurger.flavor = event.currentTarget.id;
                      setSelectedBurger({...selectedBurger});
                    }}
                  />
                  <label for={tipoHamburguer.name}>
                    <img className="img-button-extra" alt={tipoHamburguer.name} src={tipoHamburguer.img} />
                  {tipoHamburguer.label}</label>
                </>
              ))}
              </section>
            </section>
              <section className="opcoes-adicionais">
                <p className="titulo-extras">Adicionais R$1</p>
                <section className="img-input-extras">
                {adicionais.map((tipoAdicional, index) => (
                  <>
                    <input
                      key={index}
                      type="radio"
                      name="escolher-adicional"
                      id={tipoAdicional.name}
                      onChange={(event) => {
                        selectedBurger.complement = event.currentTarget.id;
                        setSelectedBurger({...selectedBurger});
                      }}
                    />
                    <label for={tipoAdicional.name} key={index}>
                      <img className="img-button-extra" alt={tipoAdicional.name} src={tipoAdicional.img} />
                    {tipoAdicional.name}</label>
                  </> 
                ))}
              </section>
            </section>
          </div>

            <input 
              className="button-ok-extras"
              type="button"
              value="OK"
              onClick={(event) => {
                if(selectedBurger.flavor !== null) {
                  listaCompletaDeProdutos.filter(produto => {
                    if(produto.name === selectedBurger.name && produto.flavor === selectedBurger.flavor && produto.complement === selectedBurger.complement) {
                      setResumoPedido([...resumoPedido, {"id": produto.id, "name": [{"name": produto.name, "flavor": produto.flavor, "complement": produto.complement}], "price": produto.price, "qtd": 1}]);
                    }
                    return resumoPedido
                  })
                  setOpenExtrasBurgerSimples(false);
                  setOpenExtrasBurgerDuplo(false);
                  event.currentTarget.parentNode.parentNode.querySelector(".button-adicionar").classList.remove("rotate");
                  setSelectedBurger({
                    name: null,
                    flavor: null,
                    complement: null
                  });
                }else {
                  setIsModalVisible(true);
                  setErrorMessage("Você precisa escolher qual o hambúrguer!");
                }
                
              }}
            />
          </>
        )
    }

    function handleExtras(event) {
        if(event.target.id === "Hambúrguer simples"){
            if(openExtrasBurgerSimples === true){
                setOpenExtrasBurgerSimples(false);
                event.currentTarget.classList.remove("rotate");
            } else {
                event.currentTarget.classList.add("rotate");
                setExtrasBurgerSimples(extras());
                setOpenExtrasBurgerSimples(true);
            }
        }
        if(event.target.id === "Hambúrguer duplo"){
            if(openExtrasBurgerDuplo === true){
                setOpenExtrasBurgerDuplo(false);
                event.currentTarget.classList.remove("rotate");
            } else {
                event.currentTarget.classList.add("rotate");
                setExtrasBurgerDuplo(extras());
                setOpenExtrasBurgerDuplo(true);
            }
        }
    }

    function somarPrecoTotal(array) {
        return array.reduce((total, item) => total + (item.qtd*item.price), 0);
    }

  return (
    <>
      {isModalVisible ? (<ErrorModal onClose={() => setIsModalVisible(false)}>{errorMessage}</ErrorModal>) : null}
      {role !== "salao" ? (
        <>
          <Header />
          <main className="acessonegado-container">
              <p className="acessonegado-title">Ops!!!</p>
              <p className="acessonegado-message">Você não pode acessar essa página!</p>
              <Logo />
          </main>
          <Footer />
        </>
      ) : (
        <>
          <Header />
          <div className="align-button">
            <input
              className="button-back-table" 
              type="button" 
              value="Escolher Mesa" 
              onClick={() => {
                history.push({
                pathname: `/salao`,
                })
              }}
            />
          </div>
          <main className="pagina-pedido">
              {loading ? 
              (
                <Loading />
              ) : (
                  <>

                  <section className="menu-escolha">
                  <section className="buttons-menu-escolha">
                      <input 
                        id="button-cafe-da-manha"
                        type="radio"
                        name="menu"
                        defaultChecked
                        onClick={(event) => {
                          setMenus(true);
                          setOpenExtrasBurgerSimples(false);
                          setOpenExtrasBurgerDuplo(false);
                          document.querySelector(".button-adicionar").classList.remove("rotate");
                        }}
                      />
                      <label className="button-menu-escolha" htmlFor="button-cafe-da-manha">Café da Manhã</label>
                      <input 
                        id="button-almoco"
                        type="radio"
                        name="menu"
                        onClick={() => setMenus(false)}
                      />
                      <label className="button-menu-escolha" htmlFor="button-almoco">Almoço/Jantar</label>
                  </section>

              
                  {menus ? (
                      <ul className="lista-menu">
                          {menuCafe.map((produto, index) => (
                              <li key={index} className="item-lista-menu">
                                  <label>{`${produto.name} ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.price)}`}</label>
                                  <input
                                      className="button-adicionar"
                                      id={produto.name}
                                      type="image"
                                      alt="button-adicionar"
                                      src={Adicionar}
                                      onClick={() => {
                                          if(!resumoPedido.some(pedido => pedido.name === menuCafe[index].name)){
                                              setResumoPedido([...resumoPedido, {"id": menuCafe[index].id, "name": menuCafe[index].name, "price": menuCafe[index].price, "qtd": 1}]);
                                          } else {
                                              resumoPedido.map((produto, i) => {
                                                  if(produto.name === menuCafe[index].name) {
                                                    resumoPedido[i].qtd++; 
                                                    setResumoPedido([...resumoPedido]);
                                                  }
                                              })
                                          }
                                      }}
                                  />
                              </li>
                          ))}
                        </ul>
                      ) : (
                        <ul className="lista-menu">
                          {menuAlmoco.map((produto, index) => (
                            <li key={index} className="item-lista-menu">
                              <label>{`${produto.name} ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.price)}`}</label>
                              <input
                                className="button-adicionar"
                                id={produto.name}
                                type="image"
                                alt="button-adicionar"
                                src={Adicionar}
                                name={produto.id}
                                onClick={(event) => {
                                  handleExtras(event);
                                  if(produto.name === "Hambúrguer simples" || produto.name === "Hambúrguer duplo"){
                                    selectedBurger.name = menuAlmoco[index].name;
                                    setSelectedBurger({...selectedBurger});

                                  } else {
                                    if(!resumoPedido.some(pedido => pedido.name === menuAlmoco[index].name)){
                                      setResumoPedido([...resumoPedido, {"id": menuAlmoco[index].id, "name": menuAlmoco[index].name, "price": menuAlmoco[index].price, "qtd": 1}]);
                                    } else {
                                      resumoPedido.map((produto, i) => {
                                          if(produto.name === menuAlmoco[index].name) {
                                            resumoPedido[i].qtd++; 
                                            setResumoPedido([...resumoPedido]);
                                          }
                                      })
                                    }
                                  }                                        
                                }}
                              />
                              {openExtrasBurgerSimples === true && produto.name === "Hambúrguer simples" && <section className="menu-extras">{extrasBurgerSimples}</section>}
                              {openExtrasBurgerDuplo === true && produto.name === "Hambúrguer duplo" && <section className="menu-extras">{extrasBurgerDuplo}</section>}
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>

                    <section className="resumo-pedido">
                      <p className="titulo-resumo-pedido">Resumo do Pedido</p>
                      <p className="infos-resumo-pedido">Atendente: {atendente} | Mesa {mesa}</p>
                      <input className="cliente-resumo-pedido"
                        type="text" 
                        placeholder="Nome do Cliente"
                        onChange={(event) => {
                          setFazerPedido({...fazerPedido, "client": event.target.value})
                        }}
                      />

                      {resumoPedido !== [] && 
                        <>
                        <div className="resumo-pedido-itens">
                          <section className="titulo-lista-pedido">
                              <label className="item">Item</label>
                              <label className="valor">Valor</label>
                              <label className="quantidade">Quantidade</label> 
                              <label className="excluir">Excluir</label>
                            </section>
                          <ul className="lista-pedido">
                          {resumoPedido.map((item, index) => (
                            <>
                              <li className="item-lista-pedido" key={index}>
                                  <div className="comanda-nome-hamburgueres">
                                    {typeof item.name === "string" ? item.name : item.name.map((item) => 
                                      <>
                                        <label className="comanda-nome-hamburgueres-titulo">{item.name}</label> 
                                        <label className="comanda-nome-hamburgueres-complementos">{item.flavor}</label> 
                                        <label className="comanda-nome-hamburgueres-complementos">{item.complement}</label>
                                      </>
                                    )} 
                                  </div>
                                  <label className="item-lista-preco">
                                    {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price*item.qtd)}
                                  </label>
                                  <div className="item-lista-quantidade">
                                    <input
                                        className="button-manipular-qtd"
                                        id="diminuir-qtd"
                                        type="button"
                                        value="-"
                                        onClick={() => {
                                          if(item.qtd > 1 && item.name === resumoPedido[index].name) {
                                            resumoPedido[index].qtd--; 
                                            setResumoPedido([...resumoPedido]);
                                          } else if(item.name === resumoPedido[index].name && item.qtd === 1) {
                                            resumoPedido.splice(index, 1);
                                            setResumoPedido([...resumoPedido]);
                                          } 
                                        }}
                                    />
                                    <label>{item.qtd}</label>
                                    <input
                                        className="button-manipular-qtd"
                                        id="aumentar-qtd"
                                        type="button"
                                        value="+"
                                        onClick={() => {
                                          if(item.name === resumoPedido[index].name) {
                                            resumoPedido[index].qtd++; 
                                            setResumoPedido([...resumoPedido]);
                                          }
                                        }}
                                    />
                                  </div>
                                  <input
                                      className="button-excluir-item"
                                      id="excluir-item"
                                      type="image"
                                      src={Lixeira}
                                      alt="icone-lixeira"
                                      onClick={() => {
                                        resumoPedido.splice(index, 1);
                                        setResumoPedido([...resumoPedido]);
                                      }}
                                  />
                              </li>
                            </>
                          ))}
                          </ul>
                        </div>
                          
                          <p className="total-resumo-pedido">TOTAL: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(somarPrecoTotal(resumoPedido))}</p>
                          <section className="buttons-resumo-pedido">
                            <input className="button-resumo-pedido"
                              type="button"
                              value="Enviar Pedido"
                              onClick={() => {
                                if(fazerPedido.client !== "") {
                                  const products = resumoPedido.map(produto => {
                                    return {"id": produto.id, "qtd": produto.qtd};
                                  });
    
                                  fazerPedido.products = products;
    
                                  const requestOptions = {
                                    method: 'POST',
                                    headers: { 
                                        'Content-Type': 'application/json',
                                        'Authorization': `${token}`,
                                    },
                                    body: JSON.stringify(fazerPedido),
                                  };
                        
                                  fetch('https://lab-api-bq.herokuapp.com/orders', requestOptions)
                                      .then(response => response.json())
                                      .then(data => {
                                        if(data.id !== undefined){
                                          setIsModalVisible(true);
                                          setErrorMessage("Seu pedido foi enviado!");
                                          setResumoPedido([]);
                                          document.querySelector(".cliente-resumo-pedido").value = "";
                                        } else {
                                          setIsModalVisible(true)
                                          setErrorMessage(`${data.message}`)
                                        }
                                      })
                                }else{
                                  setIsModalVisible(true);
                                  setErrorMessage("Preencha o nome do cliente!");
                                }
                              }} 
                            />

                            <input className="button-resumo-pedido"
                              type="button"
                              value="Limpar Pedido"
                              onClick={() => {
                                setResumoPedido([]);
                              }}
                            />
                          </section>
                        </>
                      }
                    </section>
                  </>
                )
              }
          </main>
          <Footer />
        </>
        )}
        </>   
    )
}

export default PaginaPedidos;