import React, { useEffect, useContext, useState } from 'react';
import LoginForm from './components/LoginForm';
import { Context } from './index';
import { observer } from 'mobx-react-lite';
import { IUser } from './models/response/IUser';
import UserService from './services/UserService';

function App() {
    const { store } = useContext(Context);
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, []);

    async function getUsers() {
        try {
            const response = await UserService.fetchUsers();
            // @ts-ignore
            setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    if (store.isLoading) {
        return <div>Loading...</div>;
    }

    if (!store.isAuth) {
        return (
            <div>
                <LoginForm />
                <button onClick={getUsers}>Get users</button>
            </div>
        );
    }

    return (
        <>
            <h1>{store.isAuth ? `User is authorized ${store.user.email}` : 'Please log in'}</h1>
            <h1>{store.user.isActivated ? 'Account is authorized' : 'Check your email'}</h1>
            <button onClick={() => store.logout()}>Log out</button>
            <div>
                <button onClick={getUsers}>Get users</button>
            </div>
            {users.map((user) => (
                <div key={user.email}>{user.email}</div>
            ))}
        </>
    );
}

export default observer(App);
