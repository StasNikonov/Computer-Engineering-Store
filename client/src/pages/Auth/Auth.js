import React, { useContext, useState } from 'react';
import './Auth.scss';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../../utils/consts";
import { login, registration } from "../../http/userAPI";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";

export const Auth = observer(() => {
    const { user } = useContext(Context);
    const location = useLocation();
    const history = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(user);
            user.setIsAuth(true);
            history(SHOP_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    return (
        <div className="authPage">
            <div className="authCard">
                <h2 className="authTitle">{isLogin ? "Authorization" : "Registration"}</h2>
                <form className="authForm">
                    <input
                        className="inputField"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        className="inputField"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div className="links">
                        {isLogin ?
                            <span>Don't have an account? <Link to={REGISTRATION_ROUTE}>Sign up</Link></span>
                            :
                            <span>Have an account? <Link to={LOGIN_ROUTE}>Log in</Link></span>
                        }
                    </div>
                    <button
                        className="submitButton"
                        type="button"
                        onClick={click}
                    >
                        {isLogin ? 'Log in' : 'Sign in'}
                    </button>
                </form>
            </div>
        </div>
    );
});
