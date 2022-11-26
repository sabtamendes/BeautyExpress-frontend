import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postSignUp } from "../../services/Services";
import swal from "sweetalert2";


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
                console.log(err.response)
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
                    placeholder="Digite o seu Nome"
                    required
                />


                <label>Email</label>

                <input
                    name="email"
                    value={form.email}
                    onChange={handleForm}
                    type="text"
                    placeholder="Digite o seu Email"
                    required
                />


                <label>Password</label>

                <input
                    name="password"
                    value={form.password}
                    onChange={handleForm}
                    type="number"
                    placeholder="Digite a sua Senha"
                    required
                />
                <button type="submit">Cadastrar</button>

                <StyleLink to={"/login"}>
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
span{
    color: #989F9D;
}
i{
    color: #171F1E;
}
`