import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TrpcProvider } from "./lib/trpc";
import { AllRecipiesPage } from "./pages/AllRecipiesPage";
import { ViewRecipePage } from "./pages/ViewRecipePage";
import * as routes from "./lib/routes";
import { Layout } from "./components/Layout";
import "./styles/global.scss";
import { NewRecipePage } from "./pages/NewRecipePage";
import { SignUpPage } from "./pages/SignUpPage";
import { SignInPage } from "./pages/SignInPage";
import { SignOutPage } from "./pages/SignOutPage";

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route path={routes.getSignOutRoute()} element={<SignOutPage />} />
          <Route element={<Layout />}>
            <Route
              path={routes.getAllRecipiesRoute()}
              element={<AllRecipiesPage />}
            />
            <Route
              path={routes.getViewRecipeRoute(routes.viewRecipeRouteParams)}
              element={<ViewRecipePage />}
            />
            <Route
              path={routes.getNewRecipeRoute()}
              element={<NewRecipePage />}
            />
            <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
            <Route path={routes.getSignInRoute()} element={<SignInPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  );
};
