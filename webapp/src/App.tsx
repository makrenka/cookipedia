import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TrpcProvider } from "./lib/trpc";
import { AllRecipiesPage } from "./pages/AllRecipiesPage";
import { ViewRecipePage } from "./pages/ViewRecipePage";
import {
  getAllRecipiesRoute,
  getViewRecipeRoute,
  viewRecipeRouteParams,
} from "./lib/routes";

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route path={getAllRecipiesRoute()} element={<AllRecipiesPage />} />
          <Route
            path={getViewRecipeRoute(viewRecipeRouteParams)}
            element={<ViewRecipePage />}
          />
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  );
};
