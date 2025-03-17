import React, { useContext } from 'react';
import './NavBar.scss';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../../utils/consts";
import { Context } from "../../index";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

export const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
    };

    return (
        <header className="navbar">
            <div className="navbarContainer">
                <Link to={SHOP_ROUTE} className="navbarLogo">
                    ComputerParadise
                </Link>
                {user.isAuth ? (
                    <nav className="navbarNavigation">
                        <button
                            className="navbarButton"
                            onClick={() => navigate(ADMIN_ROUTE)}
                        >
                            Admin
                        </button>
                        <button
                            className="navbarButton"
                            onClick={logOut}
                        >
                            Sign out
                        </button>
                    </nav>
                ) : (
                    <nav className="navbarNavigation">
                        <button
                            className="navbarButton"
                            onClick={() => navigate(LOGIN_ROUTE)}
                        >
                            Sign in
                        </button>
                    </nav>
                )}
            </div>
        </header>
    );
});
