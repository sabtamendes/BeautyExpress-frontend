import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import {
  screenColor,
  btnColor,
  priceLabel,
  secondaryText,
} from "../constants/colors";
import { Link } from "react-router-dom";

export default function CarPage() {
  const [car, setCar] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [totalBuy, setTotalBuy] = useState(0);

  useEffect(() => {
    calculetTotRequest();
  });

  function addOrRemoveOfCar(indexProduct, quantity) {
    let newCar = [...car];
    const newQuantify = newCar[indexProduct].quantity + quantity;

    if (newQuantify === 0) {
      newCar = newCar.filter((c, index) => index !== indexProduct);
    } else if (newCar[indexProduct].stock >= newQuantify) {
      newCar[indexProduct].quantity = newQuantify;
    } else return;
    setCar(newCar);
    localStorage.setItem("cart", JSON.stringify(newCar));
    calculetTotRequest();
  }

  function calculetTotRequest() {
    const total = car
      .map((c) => c.quantity * c.unitaryValue)
      .reduce((accumulator, item) => accumulator + item, 0);
    setTotalBuy(total);
  }

  function cleanCar() {
    localStorage.removeItem("cart");
    setCar([]);
  }

  return (
    <>
      <Container>
        <Top>
          <Link to="/">
            <ion-icon name="arrow-back-circle-outline" size="large"></ion-icon>
          </Link>
          <p>Shopping</p>
          <ion-icon
            name="trash-outline"
            size="large"
            onClick={() => cleanCar()}
          ></ion-icon>
        </Top>
        <ListCar>
          {car.length > 0 &&
            car.map((c, index) => {
              return (
                <ItenCar key={index}>
                  <img src={c.productUrl} alt="" />
                  <DescriptionIten>
                    <h1>
                      {c.productName}
                      <p>{c.category}</p>
                    </h1>
                    <h3>
                      {Intl.NumberFormat("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      }).format(c.unitaryValue)}
                    </h3>
                  </DescriptionIten>
                  <ButtonsCar>
                    <ion-icon
                      class="icone-remover"
                      name="remove-circle"
                      addOrRemoveOfCar
                      onClick={() => addOrRemoveOfCar(index, -1)}
                    ></ion-icon>
                    <h1>{c.quantity}</h1>
                    <ion-icon
                      class="icone-adicionar"
                      name="add-circle"
                      onClick={() => addOrRemoveOfCar(index, 1)}
                    ></ion-icon>
                  </ButtonsCar>
                </ItenCar>
              );
            })}
        </ListCar>
        <DetailOfBuy>
          <h6>Resumo do pedido</h6>

          <ItenDetail>
            <h1>Total do pedido</h1>
            <h2>
              {Intl.NumberFormat("pt-br", {
                style: "currency",
                currency: "BRL",
              }).format(totalBuy)}
            </h2>
          </ItenDetail>
        </DetailOfBuy>
      </Container>
    </>
  );
}

// const Containner = styled.div`
//   background-color: #f9f9f9;
//   height: 100vh;
//   padding: 20px;
// `;

const Container = styled.div`
  min-height: 100vh;
  padding: 31px;
  background-color: ${screenColor};
  margin-bottom: 60px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ion-icon {
    color: ${secondaryText};    
  }
  p {
    font-size: 20px;
  }
`;

const ListCar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;

const ItenCar = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
  background-color: #ffffff;
  width: 100%;
  img {
    width: 100px;
    height: 100px;
    border-radius: 10px;
  }
`;
const DescriptionIten = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  h1 {
    font-size: 16px;
    font-weight: bold;
    p {
      font-size: 14px;
      color: ${secondaryText};
    }
  }
  h3 {
    margin-top: 10px;
    color: ${priceLabel};
  }
`;

const ButtonsCar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  ion-icon {
    font-size: 25px;
  }

  .icone-remover {
    color: #f1f1f3;
  }

  .icone-adicionar {
    color: ${btnColor};
  }
`;
const DetailOfBuy = styled.div`
  margin-top: 30px;
  margin-bottom: 40px;

  h6 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
`;
const ItenDetail = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  h1 {
    font-size: 18px;
    color: ${secondaryText};
  }
  h2 {
    font-size: 18px;
    color: ${priceLabel};
  }
`;
