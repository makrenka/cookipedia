import { TrpcProvider } from "./lib/trpc";
import { AllRecipiesPage } from "./pages/AllRecipiesPage";

export const App = () => {
  return (
    <TrpcProvider>
      <AllRecipiesPage />
    </TrpcProvider>
  );
};
