import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { ThemeSettings, SettingsProvider } from "./components/settings";
import ThemeProvider from "./theme";
import { store, persistor } from "./redux/store";
import ScrollToTop from "./components/scroll-to-top";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ThemeLocalization from "./locales";
import SnackbarProvider from "./components/snackbar";
import { AuthProvider } from "./auth/JwtContext";

import HomePage from "./view/homepage";
import LoginPage from "./view/login";
import RegisterPage from "./view/register";
import ProductDetail from "./view/homepage/productdetail";

function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <SettingsProvider>
                <BrowserRouter>
                  <ScrollToTop />
                  <ThemeProvider>
                    <ThemeSettings>
                      <ThemeLocalization>
                        <SnackbarProvider>
                          <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/auth/login" element={<LoginPage />} />
                            <Route path="/auth/register" element={<RegisterPage/>} />
                            <Route path="/dashboard/e-commerce/product/:name" element={<ProductDetail/> } />
                          </Routes>
                        </SnackbarProvider>
                      </ThemeLocalization>
                    </ThemeSettings>
                  </ThemeProvider>
                </BrowserRouter>
              </SettingsProvider>
            </LocalizationProvider>
          </PersistGate>
        </ReduxProvider>
      </HelmetProvider>
    </AuthProvider>
  );
}

export default App;
