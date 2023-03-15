import { createBrowserRouter } from "react-router-dom";
import { CartPage } from "../pages/cart-page";
import { Contacts } from "../pages/contacts";
import { MadeInAlfa } from "../pages/made-in-alfa";
import { MainPage } from "../pages/main-page";
import { Policy } from "../pages/policy";
import { YourDesignPage } from "../pages/your-design-page";
import { ProductPage } from "../pages/product-page";
import { ErrorPage } from "../hocs/error-boundaries/error-page";

export const useRouter = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/sdelano-v-alfe",
      element: <MadeInAlfa />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/svoy-dizain",
      element: <YourDesignPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/contact-us",
      element: <Contacts />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/tcart",
      element: <CartPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/policy",
      element: <Policy />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/product-page/:id",
      element: <ProductPage />,
      errorElement: <ErrorPage />,
    },
  ]);
};
