import SplashScreen from "@/components/layout/SplashScreen";
import { store } from "@/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import HolyLoader from "holy-loader";
import SocketProvider from "./SocketProvider";
import { Theme } from "@radix-ui/themes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function AppProvider({ children, pageProps }: { children: React.ReactNode; pageProps?: any }) {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <SocketProvider>
            <Theme accentColor="indigo">
              <HolyLoader />
              <SplashScreen />
              <ToastContainer autoClose={3000} />
              {children}
            </Theme>
          </SocketProvider>
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default AppProvider;
