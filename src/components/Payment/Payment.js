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
    const [card, setCard] = useState("");
    const navigate = useNavigate();
    const [credicardCheck, setCredicarCheck] = useState(false);
    const [applepayCheck, setApplePayCheck] = useState(false)
    const [paypalCheck, setPayPalCheck] = useState(false)
    const { setSales } = useContext(CartContext);


    function handleSubmit(e) {
        e.preventDefault();

        if (!credicardCheck && !applepayCheck && !paypalCheck) {
            return swal.fire({
                title: user.name.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase()),
                text: "Selecione uma forma de pagamento válida!", type: "error"
            });
        }
        else if (credicardCheck && applepayCheck && paypalCheck) {
            return swal.fire({
                title: user.name.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase()),
                text: 'Selecione apenas uma forma de pagamento!', icon: 'error'
            });
        } else if (credicardCheck && applepayCheck) {
            return swal.fire({
                title: user.name.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase()),
                text: 'Selecione apenas uma forma de pagamento!', icon: 'error'
            });
        } else {
            swal.fire({
                title: user.name.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase()),
                text: 'Compra realizada com sucesso!', icon: 'success'
            });
            setDisabled(true);
            setTimeout(() => {navigate("/")}, 3000);
        }
    }

    return (
        <Container>
            <Top>
                <Link to="/">
                    <ion-icon name="arrow-back-circle-outline" size="large"></ion-icon>
                </Link>
                <h1>Formas de Pagamento</h1>
            </Top>

            <PaymentMethod onSubmit={handleSubmit}>
                <Box>
                    <img src={credicard} alt="credicard logo" />
                    <span>Credi Card</span>
                    <input
                        onClick={() => setCredicarCheck(!credicardCheck)}
                        type="radio"
                        value="credicard"
                        onChange={(e) => setCard(e.target.value)}
                        disabled={disabled}
                        checked={credicardCheck}
                    />
                </Box>
                <Box>
                    <img src={applepay} alt="applepay logo" />
                    <span>Apple Pay</span>
                    <input
                        onClick={() => setApplePayCheck(!applepayCheck)}
                        type="radio"
                        value="applepay"
                        onChange={(e) => setCard(e.target.value)}
                        disabled={disabled}
                        checked={applepayCheck}
                    />
                </Box>
                <Box>
                    <img src={paypal} alt="paypal logo" />
                    <span>Pay Pal</span>
                    <input
                        onClick={() => setPayPalCheck(!paypalCheck)}
                        type="radio"
                        value="paypal"
                        onChange={(e) => setCard(e.target.value)}
                        disabled={disabled}
                        checked={paypalCheck}
                    />
                </Box>

                <Total>
                    <p>Total</p> <span>R$ {payment.toFixed(2).replace(".", ",")}</span>
                </Total>

                {payment === ""
                    ? ""
                    : <Button onClick={() => setSales("")} disabled={disabled} type="submit">Finalizar Compra</Button>
                }

            </PaymentMethod>

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
    margin-right: 22vw;
  }
`
const PaymentMethod = styled.form`
margin-top: 10vh;
img{
    width: 35px;
    height: auto;
    object-fit: cover;
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
    background-color: ${props => props === true ? "green" : "gray"
    }

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
letter-spacing: 1px;
font-size: 16px;
background-color: ${btnColor};
color: ${labelColor};
width: 85vw;
padding: 15px;
border: none;
border-radius: 10px;
`