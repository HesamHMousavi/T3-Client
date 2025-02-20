import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/Home/HomePage";
import FAQs from "./Components/Pages/FAQs/FAQsPage";
import PlatesPage from "./Components/Pages/Plates/PlatesPage";
import AccPages from "./Components/Pages/Accs/AccPage";
import CheckoutPage from "./Components/Pages/CheckoutPage/CheckoutPage";
import ScrollTop from "./Components/ScrollTop";
import Alert from "./Components/Alert/Alert";
import Success from "./Components/Success/Success";

function App() {
  return (
    <Router>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/plates" element={<PlatesPage />} />
        <Route path="/acc" element={<AccPages />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/success" element={<Success />} />
      </Routes>
      <Alert />
    </Router>
  );
}

export default App;
