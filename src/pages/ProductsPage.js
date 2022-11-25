import styled from "styled-components";
import {
  btnColor,
  labelColor,
  screenColor,
  secondaryText,
  priceLabel,
} from "../constants/colors.js";

import { useState, useEffect } from "react";
import { BASE_URL } from "../constants/urls.js";
import axios from "axios";
import { Link } from "react-router-dom";
import { estaLogado } from "../constants/auth.js";

export default function Products() {
  const [listProducts, setListProducts] = useState([]);

  const [categorys, setCategorys] = useState([]);

  useEffect(() => {
    showProducts();
  }, []);
  useEffect(() => {
    showCategorys();
  }, []);

  async function showProducts(category, productName) {
    try {
      await axios
        .get(`${BASE_URL}/products`, { params: { category, productName } })
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
        .get(`${BASE_URL}/categorys`)
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
              console.log("adicionei mais 1");
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
      }
    }

    if (estaLogado) {
      //console.log('estou logado')
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        // console.log("user =", user);
        const iduser = user._id;
        const dia = Intl.NumberFormat({ minimumIntegerDigits: 2 }).format(
          new Date().getDate()
        );
        const mes = Intl.NumberFormat({ minimumIntegerDigits: 2 }).format(
          new Date().getMonth() + 1
        );
        await axios.post(`${BASE_URL}/sales-order`, {
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
  }

  return (
    <>
      <Container>
        <Title>Beauty Express</Title>
        {/* <h2>Makes para torcer pelo Brasil</h2> */}
        <SearchProducts>
          <IconSearch>
            <ion-icon name="search-outline" size="large"></ion-icon>
          </IconSearch>

          <input
            type="text"
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
          {listProducts.map((p) => {
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
        <ItemFoot to="/cart" show={true}>
          <ion-icon name="cart" size="large"></ion-icon>
          <p>Carrinho</p>
        </ItemFoot>

        <ItemFoot show={false}>
          <ion-icon name="home" size="large"></ion-icon>
          <p>Home</p>
        </ItemFoot>

        <ItemFoot to="/login" show={true}>
          <ion-icon name="person" size="large"></ion-icon>
          <p>Login</p>
        </ItemFoot>
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
  font-size: 32px;
  color: #171f1e;
  margin-bottom: 15px;
`;

const SearchProducts = styled.div`
  display: flex;
  width: 100%;
  border: 1px;
  border-color: transparent;
  border-radius: 3px;
  margin-top: 20px;
  background-color: white;
  padding: 10px 0px 10px 0px;

  input {
    border: none;
    outline: 0;
    border-color: transparent;
    font-size: 20px;
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
  padding: 20px;
  img {
    opacity: ${(props) => (props.productFinished ? 0.2 : 1)};
    width: 150px;
    height: 150px;
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
  width: 100%;
  background-color: #ffffff;
  padding: 10px;

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
    color: ${secondaryText};
  }

  ion-icon {
    color: ${secondaryText};
    cursor: pointer;
  }
`;
