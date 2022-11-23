import { Link } from "react-router-dom";
import styled from "styled-components";

export default function SignIn(){
    return(
        <Container >
            <Title>Welcome Back</Title>
            <Subtitle>Welcome Back! Please Enter Your Details.</Subtitle>
            <Form>
                <label>Email</label>
                <input placeholder="Insira o Email" />
                <label>Password</label>
                <input placeholder="Insira a Senha"/>
                <button>Entrar</button>

                <StyleLink to={"/cadastro"}><span>Ainda não tem conta?</span> <i>Cadastre-se!</i> </StyleLink>

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
font-size: 28px;
color: #171F1E;
margin-bottom: 15px;
`
const Subtitle = styled.h6`
font-size: 15px;
color: #989F9D;
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
margin-top: 10vh;
font-size: 18px;
span{
    color: #989F9D;
}
i{
    color: #171F1E;
}

`