import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import TodoList from "./pages/TodoList/index.tsx";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoList />
    </QueryClientProvider>
  );
}

export default App;
