import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import AppRouting from "./routes/AppRouting";
import { AuthProvider } from "./providers/AuthProvider";
import { createTheme, ThemeProvider } from "@mui/material";

function App() {
  const queryClient = new QueryClient();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <AuthProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={darkTheme}>
            <AppRouting />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
