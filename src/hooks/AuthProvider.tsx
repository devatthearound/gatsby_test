import React, { createContext, useContext, useState } from 'react';
import AuthService from '../service/FBAuthService';
import { User } from 'firebase/auth';


interface Value {
    user: User | undefined,
    setUser: any,
    error: string,
    SignInWithEmailAndPassword: (email: string, password: string) => Promise<any>,
    CreateUserWithEmailAndPassword: (email: string, password: string) => Promise<any>,
    LoginOut: () => Promise<any>,
}

const defaultValue: Value = {
    user: undefined,
    setUser: undefined,
    error: "",
    SignInWithEmailAndPassword: (email: string, password: string) => {
        return Promise.resolve('SignInWithEmailAndPassword');
    },
    CreateUserWithEmailAndPassword: (email: string, password: string) => {
        return Promise.resolve('SignInWithEmailAndPassword');
    },
    LoginOut: () => { return Promise.resolve('LoginOut') }
}

export const authContext = createContext<Value>(defaultValue);

export const useAuth: any = () => {
    return useContext(authContext);
}

export const AuthProvider = (props: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | undefined>();
    const [error, setError] = useState('');

    const SignInWithEmailAndPassword = async (email: string, password: string) => {
        const { error, user } = await AuthService.SignInWithEmailAndPassword(email, password);
        setUser(user ?? undefined);
        setError(error ?? "");
        return user;
    }

    const CreateUserWithEmailAndPassword = async (email: string, password: string) => {
        const { error, user } = await AuthService.CreateUserWithEmailAndPassword(email, password);
        setUser(user ?? undefined);
        setError(error ?? "");
        return user;
    }

    const LoginOut = async () => {
        await AuthService.LoginOut();
        setUser(undefined);
    }

    const value = { user, setUser, error, SignInWithEmailAndPassword, LoginOut, CreateUserWithEmailAndPassword };

    return <authContext.Provider value={value} {...props} />
};

export default { AuthProvider, useAuth, authContext };