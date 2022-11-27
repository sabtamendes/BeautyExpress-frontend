import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postSignUp } from "../../services/Services";
import swal from "sweetalert2";
import { btnColor, screenColor } from "../../constants/colors";

export default function SignUp() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });

    const navigate = useNavigate();


    function handleForm(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const body = { ...form }
        if (form.password.length < 6) {
            return swal.fire({
                title: 'A senha deve ter pelo menos 6 dígitos!',
                icon: 'error',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
        }
        postSignUp(body)
            .then(res => {
                navigate("/");
            })
            .catch((err) => {
                if (err.response.data.message === "Este Email já está em uso!") {
                    return swal.fire({
                        title: 'Este Email já está em uso!',
                        icon: 'error',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    })
                }
                if (err.response.data.includes('"email" must be a valid email')) {
                    return swal.fire({
                        title: 'Digite um email válido!',
                        icon: 'error',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    })
                }
            })
    }
    return (
        <Container >

            <Title>Beauty Express</Title>

            <Subtitle>Porque beleza, faz parte do jogo!</Subtitle>

            <Form onSubmit={handleSubmit}>

                <label>Nome</label>

                <input
                    name="name"
                    value={form.name}
                    onChange={handleForm}
                    type="text"
                    placeholder="Insira o seu Nome"
                    required
                />


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
                    placeholder="Insira o Senha"
                    required
                />
                <button type="submit">Cadastrar</button>

                <StyleLink to={"/conectar"}>
                    <span>Já tem uma conta?</span> <i>Entre agora!</i>
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
padding-left: 11%;
background-color: ${screenColor};
`
const Title = styled.h1`
display:flex;
justify-content:center;
align-items:center;
font-size: 36px;
color: #171F1E;
font-family: 'El Messiri', sans-serif;
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
margin-top: 10vh;
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
    border-radius: 10px;
    background-color: #c7f9cc;
    border:none;
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
margin-left: 16px;
span{
    color: #989F9D;
}
i{
    color: #171F1E;
}
`