import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import RegistrationFormPage from "./RegistrationFormPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegistrationFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
