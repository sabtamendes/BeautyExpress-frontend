import styled from "styled-components";
import {
  btnColor,
  labelColor,
  screenColor,
  secondaryText,
  priceLabel,
} from "../constants/colors.js";

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { estaLogado } from "../constants/auth.js";
import UserContext from "../contexts/UserContext.js";
import { IoNotificationsSharp } from "react-icons/io5";
import { IoLogOutSharp } from "react-icons/io5";
import CartContext from "../contexts/CartContext.js";
// import { loggingOut } from "../services/Services.js";

export default function Products() {
  const [listProducts, setListProducts] = useState([]);

  const [categorys, setCategorys] = useState([]);

  const { user } = useContext(UserContext);

  const { setSales } = useContext(CartContext);

  useEffect(() => {
    showProducts();
  }, []);
  useEffect(() => {
    showCategorys();
  }, []);

  async function showProducts(category, productName) {
    try {
      await axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/products`, { params: { category, productName } })
        .then((response) => {
          const { data } = response;
          setListProducts(data);
        })
        .catch((error) => alert(error.message));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  async function showCategorys() {
    try {
      await axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/categorys`)
        .then((response) => {
          const { data } = response;
          setCategorys(data);
        })
        .catch((error) => alert(error.message));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  async function addCar(product) {
    //Para obter o carrinho atualizado , basta pegar no localStorage da seguinte forma: JSON.parse(localStorage.getItem('cart'))
    //Para obter o token e os dados do usuário, basta fazer da mesma forma acima
    const car = JSON.parse(localStorage.getItem("cart"));
    let carUpdate = [];

    if (car === null) {
      carUpdate = [...carUpdate, { ...product, quantity: 1 }];
    } else {
      carUpdate = [...car];
      const exitsCar = car.filter((c) => c._id === product._id).length > 0;

      if (exitsCar) {
        carUpdate = car.map((p) => {
          if (p._id === product._id) {
            if (product.stock >= p.quantity + 1) {
              return { ...p, quantity: p.quantity + 1 };
            } else {
              return p;
            }
          } else {
            return p;
          }
        });
      } else {
        carUpdate = [...carUpdate, { ...product, quantity: 1 }];
        setSales(...carUpdate);
      }
    }

    if (estaLogado) {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const iduser = user._id;
        const dia = Intl.NumberFormat({ minimumIntegerDigits: 2 }).format(
          new Date().getDate()
        );
        const mes = Intl.NumberFormat({ minimumIntegerDigits: 2 }).format(
          new Date().getMonth() + 1
        );
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/sales-order`, {
          iduser,
          date: `${dia}/${mes}/${new Date().getFullYear()}`,
          paymentType: "n",
          status: "P",
          productsList: carUpdate.map((c) => {
            return {
              idProduct: c._id,
              quantity: c.quantity,
              valorProduto: c.unitaryValue,
            };
          }),
        });
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }

    localStorage.setItem("cart", JSON.stringify(carUpdate));
    setSales(...carUpdate);
  }

  // function logout() {
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${user.token}`
  //     }
  //   }

  //   loggingOut(config)
  //     .then(() => {
  //       localStorage.removeItem("token");
  //       //dá um refresh na página
  //     }).catch((err) => {
  //       swal.fire("Algo deu errado ao tentar desconectar da conta!", "error")
  //     })
  // }
  return (
    <>
      <Container>
        {user === undefined || estaLogado === undefined
          ? <Title>Beauty Express</Title>
          : <UserTitle>
            <p>Olá, {user.name.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase())}</p>
            <IoNotificationsSharp size="28px" color="#818A89" />
          </UserTitle>
        }
        {/* <h2>Makes para torcer pelo Brasil</h2> */}
        <SearchProducts>
          <IconSearch>
            <ion-icon name="search-outline" size="large"></ion-icon>
          </IconSearch>

          <input
            type="text"
            placeholder="Procurar"
            onChange={(e) => showProducts(null, e.target.value)}
          />
        </SearchProducts>

        <Categorys>
          {categorys.map((c, index) => {
            return (
              <>
                {" "}
                <button
                  key={index}
                  onClick={async () => {
                    await showProducts(c);
                  }}
                >
                  {c}
                </button>
              </>
            );
          })}
        </Categorys>

        <ContainerProducts>
          {listProducts.map((p, i) => {
            return (
              <div key={p._id}>
                <ProductNotice productFinished={p.stock === 0}>
                  <img src={p.productUrl} alt="" />
                  <TitleNotice>
                    <DescriptionProduct>
                      <h1>{p.productName}</h1>
                      <h2>{p.category}</h2>
                      {p.stock === 0 ? (
                        <span>Produto esgotado</span>
                      ) : (
                        <h3>
                          {Intl.NumberFormat("pt-br", {
                            style: "currency",
                            currency: "BRL",
                          }).format(p.unitaryValue)}
                        </h3>
                      )}
                    </DescriptionProduct>
                    {
                      // se o estoque for verdadeiro, o javascript não executa o que está após o &&; caso contrário, executa
                      p.stock !== 0 && (
                        <IconAddCar>
                          <ion-icon
                            name="cart"
                            size="large"
                            onClick={() => addCar(p)}
                          ></ion-icon>
                          <span>+</span>
                        </IconAddCar>
                      )
                    }
                  </TitleNotice>
                </ProductNotice>
              </div>
            );
          })}
        </ContainerProducts>
      </Container>
      <ContainerFoot>
        <ItemFoot to="/carrinho" show={true}>
          <ion-icon name="cart" size="large"></ion-icon>
          <p>Carrinho</p>
        </ItemFoot>

        <ItemFoot show={false}>
          <ion-icon name="home" size="large"></ion-icon>
          <p>Home</p>
        </ItemFoot>

        {user === undefined || estaLogado === undefined
          ?
          <ItemFoot to="/conectar" show={true}>
            <ion-icon name="person" size="large"></ion-icon>
            <p>Login</p>
          </ItemFoot>
          :
          <ItemFoot to="/" show={true}>
            <IoLogOutSharp size="30px" color="#818A89" onClick={() => window.location.reload()} />
            <p>Logout</p>
          </ItemFoot>
        }
      </ContainerFoot>
    </>
  );
}
const Container = styled.div`
  min-height: 100vh;
  /* width: 100%; */
  padding: 31px;
  background-color: ${screenColor};
  /* display: flex;
	flex-direction: column;  */
  margin-bottom: 60px;
`;
const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  right: 15%;
  font-size: 32px;
  font-weight:600;
  font-family: 'El Messiri', sans-serif;
  color: ${btnColor};
  margin-bottom: 15px;
`;
const UserTitle = styled.h1`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #171f1e;
  margin-bottom: 15px;
 p{
  font-family: 'Open Sans', sans-serif;
  font-size: 25px;
  color: #000000;
 } 
`;
const SearchProducts = styled.div`
  display: flex;
  width: 100%;
  border-color: transparent;
  border-radius: 50px;
  margin-top: 20px;
  background-color: white;
  padding: 10px 0px 10px 0px;
  box-shadow: 1px 3px 15px -7px rgba(0,0,0,0.79);
  -webkit-box-shadow: 1px 3px 15px -7px rgba(0,0,0,0.79);
  -moz-box-shadow: 1px 3px 15px -7px rgba(0,0,0,0.79);
  input {
    border: none;
    outline: 0;
    border-color: transparent;
    font-size: 20px;
    ::placeholder{
      font-size: 16px;
      font-family: 'Open Sans', sans-serif;
    }
  }
`;
const IconSearch = styled.div`
  width: 40px;
  text-align: left;
  margin-left: 10px;

  ion-icon {
    color: ${secondaryText};
    cursor: pointer;
  }
`;
const Categorys = styled.div`
  /* width: 100%; */
  margin-top: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  font-family: "Roboto";
  font-size: 12px;

  button {
    border-radius: 10px;
    padding: 10px;
    border: none;
    background-color: #ffffff;
    color: #c6c6c6;
    font-size: 12px;
    font-family: "Arial";
    letter-spacing: 1px;
  }

  button:active,
  button:hover {
    background-color: ${btnColor};
    color: ${labelColor};
  }
`;
const ContainerProducts = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
  background-color: none;
  justify-content: center;
`;
const ProductNotice = styled.div`
  border-radius: 5px;
  background-color: white;
  padding: 13px;
  box-shadow: 1px 3px 15px -7px rgba(0,0,0,0.79);
  -webkit-box-shadow: 1px 3px 15px -7px rgba(0,0,0,0.79);
  -moz-box-shadow: 1px 3px 15px -7px rgba(0,0,0,0.79);
  img {
    opacity: ${(props) => (props.productFinished ? 0.2 : 1)};
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
`;
const TitleNotice = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;
const DescriptionProduct = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  h1 {
    font-weight: bold;
    font-size: 16px;
    font-family: 'Open Sans', sans-serif;
  }
  h2 {
    font-size: 12px;
    color: ${secondaryText};
  }
  h3 {
    font-size: 14px;
    color: ${priceLabel};
    font-weight: bold;
  }
  span {
    color: ${secondaryText};
    font-size: 12px;
    font-style: italic;
  }
`;
const IconAddCar = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  color: ${secondaryText};

  ion-icon {
    width: 25px;
  }
`;
const ContainerFoot = styled.div`
  position: fixed;
  bottom: 0;
  z-index:2;
  width: 100%;
  background-color: #ffffff;
  padding: 10px;
  box-shadow: 1px 2px 11px -7px rgba(0,0,0,0.79);
  -webkit-box-shadow: 1px 2px 11px -7px rgba(0,0,0,0.79);
  -moz-box-shadow: 1px 2px 11px -7px rgba(0,0,0,0.79);

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const ItemFoot = styled(Link)`
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  p {
    font-size: 12px;
    font-family: 'Open Sans', sans-serif;
    color: ${secondaryText};
  }
  ion-icon {
    color: ${secondaryText};
    cursor: pointer;
  }
`;