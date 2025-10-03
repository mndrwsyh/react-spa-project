import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster, toast } from "sonner";
import HomePage from "./pages/HomePage";
// import { CookiesProvider } from "react-cookie";

function App() {
  return (
    // <CookiesProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
    // </CookiesProvider>
  );
}

export default App;
