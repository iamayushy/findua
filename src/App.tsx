import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ApplicationRoutes from "@/router";
import { CartProvider } from "@/store/CartContext";
import { CartDrawer } from "@/components/shared/cart-drawer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,

      retry: (failureCount, error: any) => {
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      staleTime: 60 * 1000,
    },
    mutations: {
      retry: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <ApplicationRoutes />
        <CartDrawer />
      </CartProvider>
    </QueryClientProvider>
  );
};

export default App;