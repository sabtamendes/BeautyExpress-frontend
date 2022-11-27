import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./assets/styles/GlobalStyles";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import ProductsPage from "./pages/ProductsPage.js";
import CarPage from "./pages/CarPage.js";
import Payment from "./components/Payment/Payment";
import CartContext from "./contexts/CartContext";

function App() {
  const [user, setUser] = useState(undefined);
  const [payment, setPayment] = useState(0);
  const [sales, setSales] = useState("");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <CartContext.Provider value={{ payment, setPayment, sales, setSales }}>
        <Router>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/carrinho" element={<CarPage />} />
            <Route path="/conectar" element={<SignIn />} />
            <Route path="/cadastro" element={<SignUp />} />
            <Route path="/pagamento" element={<Payment />} />
          </Routes>
        </Router>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}
export default App;