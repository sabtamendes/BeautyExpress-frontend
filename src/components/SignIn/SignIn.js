import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postSignIn } from "../../services/Services";
import UserContext from "../../contexts/UserContext";

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
                navigate("/home");
            })

            .catch(err => {
                console.error(err);

            });
        console.log(form)
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


                <label>Password</label>

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
background-color: #FFFFFFF;
padding: 15%;
`
const Title = styled.h1`
display:flex;
justify-content:center;
align-items:center;
font-size: 32px;
color: #171F1E;
margin-bottom: 15px;
`
const Subtitle = styled.h6`
display:flex;
justify-content:center;
align-items:center;
font-size: 13px;
color: #F4BD90;
font-weight: 600;
`
const Form = styled.form`
display:flex;
flex-direction:column;
justify-content: space-between;
margin-top: 15vh;
label{
    color: #171F1E;
    font-size: 18px;
    margin-bottom: 8px;
}
button{
    align-items: center;
    background-color: #0C8A7C;
    color: #FFFFFF;
    border-radius: 10px;
    border:none;
    width: 70.1vw;
    height: 45px; 
}
input{
    width: 70.1vw;
    height: 45px;
    margin-bottom: 20px;
    background-color: #F9F9F9;
    border:none;
    &::placeholder{
    font-family: 'Raleway', sans-serif;
    font-size:16px;
    font-weight: 500;
    color: #989F9D;
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
}
i{
    color: #171F1E;
}

`