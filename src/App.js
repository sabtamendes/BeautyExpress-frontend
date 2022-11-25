/*Sabta*/
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./assets/styles/GlobalStyles";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import ProductsPage from "./pages/ProductsPage.js";
import CarPage from "./pages/CarPage.js";

function App() {
  const [user, setUser] = useState(undefined);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          {/* <Route path="/cart" element={<CarPage />}></Route> */}
          <Route path="/login" element={<SignIn />} />
          <Route path="/cadastro" element={<SignUp />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
