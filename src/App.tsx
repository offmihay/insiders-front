import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import AppRouting from "./routes/AppRouting";
import { AuthProvider } from "./providers/AuthProvider";

function App() {
  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AppRouting />
        </QueryClientProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
