import { LandingPage } from "pages/landing";
import LoginPage from "pages/platform/login/login.page";
import PricingPage from "pages/pricing/pricing.page";
import { Route, Routes } from "react-router-dom";
import Platform from "./platform";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const Routing = {
  landing: "/",
  pricing: "pricing",
  login: 'login',
  platformModule: 'platform',
  platform: {
    root: 'platform/*',
    rooms: 'rooms',
    room: 'room',
  }
};

export const RoutingConfiguration = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='*' element={<LandingPage />} />

        <Route path={Routing.landing} element={<LandingPage />} />
        <Route path={Routing.pricing} element={<PricingPage />} />
        <Route path={Routing.login} element={<LoginPage />} />
        <Route path="platform/*" element={<Platform />} />

      </Routes>
    </ThemeProvider>
  );
};
