import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import AppRouting from "./routes/AppRouting";

function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppRouting />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
