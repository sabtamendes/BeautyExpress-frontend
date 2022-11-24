import styled from "styled-components";
import { screenColor } from "../constants/colors.js";

export default function Products() {
  return (
    <>
      <Container>
        <Title>Beauty Express</Title>
        <h2>Makes para torcer pelo Brasil</h2>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  //padding: 25px 25px 16px 25px;
  background-color: ${screenColor};
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  color: #171f1e;
  margin-bottom: 15px;
`;
