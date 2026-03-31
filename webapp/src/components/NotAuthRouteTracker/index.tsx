import { atom } from "nanostores";
import {
  getAllRecipiesRoute,
  getSignInRoute,
  getSignOutRoute,
  getSignUpRoute,
} from "../../lib/routes";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export const lastVisitedNotAuthRouteStore = atom<string>(getAllRecipiesRoute());

export const NotAuthRouteTracker = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const authRoutes = [getSignUpRoute(), getSignInRoute(), getSignOutRoute()];
    const isAuthRoute = authRoutes.includes(pathname);
    if (!isAuthRoute) {
      lastVisitedNotAuthRouteStore.set(pathname);
    }
  }, [pathname]);

  return null;
};
