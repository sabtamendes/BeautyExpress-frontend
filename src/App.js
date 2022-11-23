import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./assets/styles/GlobalStyles";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";

function App() {
  const [user, setUser] = useState(undefined);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/cadastro" element={<SignUp />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
