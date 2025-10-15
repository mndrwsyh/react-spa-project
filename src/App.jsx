import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "sonner";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import BookingPage from "./pages/BookingPage";
import ReviewsPage from "./pages/ReviewsPage";
import ServicesAdd from "./pages/ServicesAdd";
import ServicesEdit from "./pages/ServicesEdit";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import GalleryPage from "./pages/GalleryPage";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/new" element={<ServicesAdd />} />
          <Route path="/services/:id/edit" element={<ServicesEdit />} />
          <Route path="/bookings" element={<BookingPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
