import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postSignIn } from "../../services/Services";
import UserContext from "../../contexts/UserContext";
import swal from "sweetalert2";
import 'animate.css';
import {
    btnColor,
    screenColor
  } from "../../constants/colors";

export default function SignIn() {

    const [form, setForm] = useState({ email: "", password: "" });

    const navigate = useNavigate();

    const { setUser } = useContext(UserContext);

    function handleForm(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();

        const body = { ...form };

        postSignIn(body)
            .then(res => {
                setUser(res.data);
                navigate("/pagamento");
            })
            .catch(err => {
                swal.fire({
                    title: 'Email ou senhas incorretos!',
                    icon: 'error',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
            });
    }
    return (
        <Container >

            <Title>Beauty Express</Title>

            <Subtitle>Porque beleza, faz parte do jogo!</Subtitle>

            <Form onSubmit={handleSubmit}>
                <label>Email</label>

                <input
                    name="email"
                    value={form.email}
                    onChange={handleForm}
                    type="text"
                    placeholder="Insira o Email"
                    required
                />


                <label>Senha</label>

                <input
                    name="password"
                    value={form.password}
                    onChange={handleForm}
                    type="number"
                    placeholder="Insira a Senha"
                    required
                />
                <button type="submit">Entrar</button>

                <StyleLink to={"/cadastro"}>
                    <span>Não tem conta? </span> <i>Cadastre-se!</i>
                </StyleLink>
            </Form>

        </Container >
    )
}
const Container = styled.div`
width: 100%;
height: 100vh;
background-color: ${screenColor};
padding: 15%;
padding-left: 11%;
`
const Title = styled.h1`
display:flex;
justify-content:center;
align-items:center;
font-family: 'El Messiri', sans-serif;
font-size: 36px;
color: #171F1E;
margin-bottom: 15px;
`
const Subtitle = styled.h6`
display:flex;
justify-content:center;
align-items:center;
font-size: 14px;
color: #F4BD90;
font-weight: bold;
font-family: 'Open Sans', sans-serif;
color: ${btnColor};
`
const Form = styled.form`
display:flex;
flex-direction:column;
justify-content: space-between;
margin-top: 14vh;
font-family: 'Open Sans', sans-serif;
label{
    color: #171F1E;
    font-size: 18px;
    margin-bottom: 8px;
    margin-left: 6px;
}
button{
    align-items: center;
    background-color: ${btnColor};
    color: #FFFFFF;
    border-radius: 10px;
    border:none;
    margin-top: 15%;
    width: 78.1vw;
    height: 45px; 
}
input{
    width: 78.1vw;
    height: 48px;
    margin-bottom: 20px;
    background-color: #c7f9cc;
    border:none;
    border-radius: 10px;
    padding-left: 8px;
    &::placeholder{
    font-size:16px;
    font-weight: 500;
    color: #fffff;
    }
}
`
const StyleLink = styled(Link)`
text-decoration: none;
margin-top: 8vh;
font-size: 18px;
display: flex;
justify-content:center;
span{
    color: #989F9D;
    margin-right: 5px;
}
i{
    color: #171F1E;
}
`