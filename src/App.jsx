import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./pages/Home/Home";
import Discover from "./pages/Discover/Discover";
import Search from "./pages/Search/Search";
import MediaDetails from "./pages/MediaDetails/MediaDetails";
import NotFound from "./pages/NotFound/NotFound";

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <NotFound /> },
  { path: "descobrir", element: <Discover /> },
  { path: "busca", element: <Search /> },
  { path: "titulo/:type/:id", element: <MediaDetails /> },
  { path: "*", element: <NotFound /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
}

export default App
