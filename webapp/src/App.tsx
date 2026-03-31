import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { TrpcProvider } from "./lib/trpc";
import { AllRecipiesPage } from "./pages/recipies/AllRecipiesPage";
import { ViewRecipePage } from "./pages/recipies/ViewRecipePage";
import * as routes from "./lib/routes";
import { Layout } from "./components/Layout";
import "./styles/global.scss";
import { NewRecipePage } from "./pages/recipies/NewRecipePage";
import { SignUpPage } from "./pages/auth/SignUpPage";
import { SignInPage } from "./pages/auth/SignInPage";
import { SignOutPage } from "./pages/auth/SignOutPage";
import { EditRecipePage } from "./pages/recipies/EditRecipePage";
import { AppContextProvider } from "./lib/ctx";
import { NotFoundPage } from "./pages/other/NotFoundPage";
import { EditProfilePage } from "./pages/auth/EditProfilePage";
import { NotAuthRouteTracker } from "./components/NotAuthRouteTracker";

export const App = () => {
  return (
    <HelmetProvider>
      <TrpcProvider>
        <AppContextProvider>
          <BrowserRouter>
            <NotAuthRouteTracker />
            <Routes>
              <Route
                path={routes.getSignOutRoute.definition}
                element={<SignOutPage />}
              />
              <Route element={<Layout />}>
                <Route
                  path={routes.getAllRecipiesRoute.definition}
                  element={<AllRecipiesPage />}
                />
                <Route
                  path={routes.getViewRecipeRoute.definition}
                  element={<ViewRecipePage />}
                />
                <Route
                  path={routes.getNewRecipeRoute.definition}
                  element={<NewRecipePage />}
                />
                <Route
                  path={routes.getEditProfileRoute.definition}
                  element={<EditProfilePage />}
                />
                <Route
                  path={routes.getSignUpRoute.definition}
                  element={<SignUpPage />}
                />
                <Route
                  path={routes.getSignInRoute.definition}
                  element={<SignInPage />}
                />
                <Route
                  path={routes.getEditRecipeRoute.definition}
                  element={<EditRecipePage />}
                />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AppContextProvider>
      </TrpcProvider>
    </HelmetProvider>
  );
};
