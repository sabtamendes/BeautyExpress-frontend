import styled from "styled-components";
import {
  btnColor,
  labelColor,
  screenColor,
  secondaryText,
  priceLabel,
} from "../constants/colors.js";

import { useState, useEffect } from "react";

export default function Products() {
  const [listProducts, setProducts] = useState([]);

  const [categorys, setCategorys] = useState([]);

  useEffect(() => {
    showProducts();
  }, []);
  useEffect(() => {
    showCategorys();
  }, []);

  async function showProducts() {}

  async function showCategorys() {}

  return (
    <>
      <Container>
        <Title>Beauty Express</Title>
        {/* <h2>Makes para torcer pelo Brasil</h2> */}
        <SearchProducts>
          <IconSearch>
            <ion-icon name="search-outline" size="large"></ion-icon>
          </IconSearch>

          <input type="text" />
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
                          <ion-icon name="cart" size="large"></ion-icon>
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
        <ItemFood show={true}>
          <ion-icon name="cart" size="large"></ion-icon>
          <p>Carrinho</p>
        </ItemFood>

        <ItemFood show={false}>
          <ion-icon name="home" size="large"></ion-icon>
          <p>Home</p>
        </ItemFood>

        <ItemFood show={true}>
          <ion-icon name="person" size="large"></ion-icon>
          <p>Login</p>
        </ItemFood>
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

const ItemFood = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  gap: 10px;
  p {
    font-size: 12px;
    color: ${secondaryText};
  }

  ion-icon {
    color: ${secondaryText};
    cursor: pointer;
  }
`;
