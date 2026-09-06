import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./LandingPage/Navbar.jsx";
import Footer from "./LandingPage/Footer.jsx";
import Home from "./LandingPage/Home/HomePage.jsx";
import Signup from "./LandingPage/Signup/Signup.jsx";
import About from "./LandingPage/About/AboutPage.jsx";
import Product from "./LandingPage/Products/ProductsPage.jsx";
import Pricing from "./LandingPage/Pricing/PricingPage.jsx";
import Support from "./LandingPage/Support/SupportPage.jsx";
import NotFound from "./LandingPage/NotFound.jsx";
import ScrollToTop from "./LandingPage/ScrollToTop.jsx";

function App() {
  return (
  <BrowserRouter>
  <ScrollToTop />
  <Navbar/>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/product" element={<Product />}/>
      <Route path="/pricing" element={<Pricing />}/>
      <Route path="/support" element={<Support />}/>
      <Route path="*" element={<NotFound />}/>
    </Routes>
    <Footer/>
  </BrowserRouter>
);
}
export default App;
