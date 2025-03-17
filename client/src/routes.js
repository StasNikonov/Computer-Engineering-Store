import {Admin} from "./pages/Admin/Admin";
import {Shop} from "./pages/Shop/Shop";
import {Auth} from "./pages/Auth/Auth";
import {ProductPage} from "./pages/ProductPage/ProductPage";
import {ADMIN_ROUTE, LOGIN_ROUTE, PRODUCT_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "./utils/consts";

export const authRoutes = [
    {
     path: ADMIN_ROUTE,
     Component: Admin
    }
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    }
]