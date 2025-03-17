import React, { useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { authRoutes, publicRoutes } from "../routes";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { NavBar } from "./NavBar/NavBar";

export const AppRouter = observer(() => {
    const { user } = useContext(Context);
    const location = useLocation();

    return (
        <>
            {(location.pathname !== LOGIN_ROUTE && location.pathname !== REGISTRATION_ROUTE) && <NavBar />}
            <Routes>
                {user.isAuth && authRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} element={<Component />} exact />
                )}
                {publicRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} element={<Component />} exact />
                )}
                <Route path="*" element={<Navigate to={SHOP_ROUTE} />} />
            </Routes>
        </>
    );
});
