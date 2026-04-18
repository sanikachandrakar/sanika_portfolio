import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import Home from "./pages/Home";
import CaseStudies from "./pages/CaseStudies";
import AdminDashboard from "./pages/AdminDashboard";
import { Toaster } from "./components/ui/toaster";

function PublicLayout() {
  return (
    <>
      <CustomCursor />
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case-studies" element={<CaseStudies />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    );
  }
  return <PublicLayout />;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
