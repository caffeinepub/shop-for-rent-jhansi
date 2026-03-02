import { Toaster } from "@/components/ui/sonner";
import ShopPage from "./pages/ShopPage";

export default function App() {
  return (
    <>
      <ShopPage />
      <Toaster position="top-right" richColors />
    </>
  );
}
