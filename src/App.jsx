import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import Header from "./components/header";
import Footer from "./components/footer";
import ContactUs from "./pages/contactUs"; 
import SignIn from "./pages/signIn";
import HomePage from "./pages/home";

function App() {
  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />  {/* Fallback route */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
