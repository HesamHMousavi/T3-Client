import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/Home/HomePage";
import FAQs from "./Components/Pages/FAQs/FAQsPage";
import PlatesPage from "./Components/Pages/Plates/PlatesPage";
import AccPages from "./Components/Pages/Accs/AccPage";
import CheckoutPage from "./Components/Pages/CheckoutPage/CheckoutPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/plates" element={<PlatesPage />} />
        <Route path="/acc" element={<AccPages />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
