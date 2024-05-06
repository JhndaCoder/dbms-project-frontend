/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import withSuspense from "./hoc/withSuspense";

const Home = withSuspense(lazy(() => import("./pages/Home")))
const Customers = withSuspense(lazy(() => import("./components/Customers")))
const Orders = withSuspense(lazy(() => import("./components/Orders")))
const Waiters = withSuspense(lazy(() => import("./components/Waiters")))
const Tips = withSuspense(lazy(() => import("./components/Tips")))
const Chefs = withSuspense(lazy(() => import("./components/Chefs")))
const FoodItems = withSuspense(lazy(() => import("./components/FoodItems")))
const Bills = withSuspense(lazy(() => import("./components/Bills")))

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
        },
    },
});

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
        children: [
            {
                index: true,
                element: <Customers></Customers>
            },
            {
                path: 'orders',
                element: <Orders></Orders>
            },
            {
                path: 'waiters',
                element: <Waiters></Waiters>
            },
            {
                path: 'tips',
                element: <Tips></Tips>
            },
            {
                path: 'chefs',
                element: <Chefs></Chefs>
            },
            {
                path: 'foodItems',
                element: <FoodItems></FoodItems>
            },
            {
                path: 'bills',
                element: <Bills></Bills>
            }
        ]
    }
])

export default router;