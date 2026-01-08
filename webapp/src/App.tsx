import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TrpcProvider } from "./lib/trpc";
import { AllRecipiesPage } from "./pages/AllRecipiesPage";
import { ViewRecipePage } from "./pages/ViewRecipePage";
import {
  getAllRecipiesRoute,
  getViewRecipeRoute,
  viewRecipeRouteParams,
} from "./lib/routes";
import { Layout } from "./components/Layout";
import "./styles/global.scss";

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={getAllRecipiesRoute()} element={<AllRecipiesPage />} />
            <Route
              path={getViewRecipeRoute(viewRecipeRouteParams)}
              element={<ViewRecipePage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  );
};
