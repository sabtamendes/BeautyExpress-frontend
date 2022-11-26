import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
    screenColor,
    btnColor,
    priceLabel,
    secondaryText,
    labelColor,
} from "../../constants/colors";

import credicard from "../../assets/images/credicard.png";
import applepay from "../../assets/images/applepay.png";
import paypal from "../../assets/images/paypal.png";
import CartContext from "../../contexts/CartContext";
import { useContext, useState } from "react";
import swal from "sweetalert2";
import UserContext from "../../contexts/UserContext";

export default function Payment() {

    const { payment } = useContext(CartContext);
    const { user } = useContext(UserContext);
    const [disabled, setDisabled] = useState(false);

    const navigate = useNavigate();


    function sweetAlert() {

        swal.fire(user.name, 
            "Sua compra foi realizada com sucesso!", 
            "success");
        setTimeout(navigate("/"), 10000);

        if (disabled) {
            setDisabled(true);
            localStorage.removeItem("cart");
        }
    }

    return (
        <Container>
            <Top>
                <Link to="/">
                    <ion-icon name="arrow-back-circle-outline" size="large"></ion-icon>
                </Link>
                <h1>Pagamento</h1>
            </Top>

            <AddressContainer>
                <Address>
                    <input type="radio" />
                    <Text>
                        <p>Casa</p>
                        <span> 92  99321-1628</span>
                        <span>Rua Manaus 55</span>
                    </Text>
                </Address>
                <Address>
                    <input type="radio" />
                    <Text>
                        <p>Trabalho</p>
                        <span> 31  99322-1625</span>
                        <span>Rua Manaus 55</span>
                    </Text>
                </Address>
            </AddressContainer>

            <PaymentMethod>
                <Box>
                    <img src={credicard} alt="credicard logo" />
                    <span>Credi Card</span>
                    <input type="radio" />
                </Box>
                <Box>
                    <img src={applepay} alt="applepay logo" />
                    <span>Paypal</span>
                    <input type="radio" />
                </Box>
                <Box>
                    <img src={paypal} alt="paypal logo" />
                    <span>Apple Pay</span>
                    <input type="radio" />
                </Box>

            </PaymentMethod>

            <Total>
                <p>Total</p> <span>R$ {payment.toFixed(2).replace(".", ",")}</span>
            </Total>
            <Button onClick={sweetAlert} disabled={disabled}>Finalizar Pedido</Button>
        </Container>
    )
}
const Container = styled.div`
  min-height: 100vh;
  padding: 31px;
  background-color: ${screenColor};
  margin-bottom: 60px;
`
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ion-icon {
  color: ${secondaryText};
  }
  h1 {
    font-size: 20px;
    margin-right: 27vw;
  }
`
const AddressContainer = styled.div`
display:flex;
flex-direction: column;
margin-top: 5vh;
margin-left: 10px;
`
const Address = styled.div`
display:flex;
margin-top: 25px;
input{
    margin-top: 2px;
    margin-right: 4vw;
}
`
const Text = styled.div`
display:flex;
flex-direction: column;
span{
    font-size: 18px;
    color: ${secondaryText};
  }
`
const PaymentMethod = styled.div`
margin-top: 10vh;
img{
    width: 35px;
}
`
const Box = styled.div`
display:flex;
justify-content: space-between;
margin-bottom: 4vh;
span{
    font-size: 20px;
    font-weight: 540;
    margin-right: 35vw;
}
input{
    margin-top: -4px;
}
`
const Total = styled.div`
display: flex;
justify-content: space-between;
margin-top: 15vh;
p{
    font-weight: bold;
    font-size: 20px;
}
span{
    font-size: 18px;
    color: ${priceLabel};      
      
}
`
const Button = styled.button`
margin-top: 35px;
font-size: 20px;
background-color: ${btnColor};
color: ${labelColor};
width: 85vw;
padding: 15px;
border: none;
border-radius: 10px;
`