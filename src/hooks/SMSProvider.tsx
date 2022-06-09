import React, { createContext, useContext, useState } from 'react';
import SMSService from '../service/SMSService';
import { User, ApplicationVerifier, ConfirmationResult, RecaptchaVerifier } from 'firebase/auth';

interface Value {
    user: User | undefined,
    setUser: any,
    error: string,
    SignInWithPhoneNumber: (phoneNumber: string) => Promise<any>,
    ConfirmationResult: (code: string) => Promise<any>,
}

const defaultValue: Value = {
    user: undefined,
    setUser: undefined,
    error: "",
    SignInWithPhoneNumber: (phoneNumber: string) => {
        return Promise.resolve('signInWithPhoneNumber');
    },
    ConfirmationResult: (code: string) => {
        return Promise.resolve('confirmationResult');
    }
}

export const smsAuthContext = createContext<Value>(defaultValue);

export const useAuth: any = () => {
    return useContext(smsAuthContext);
}

export const SMSAuthProvider = (props: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | undefined>();
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | undefined>();
    const [error, setError] = useState('');

    const SignInWithPhoneNumber = async (phoneNumber: string) => {
        await SMSService.SignInWithPhoneNumber(phoneNumber);
    }

    const ConfirmationResult = async (code: string) => {
        if (confirmationResult != undefined) {
            const { error, user } = await SMSService.ConfirmationResult(code);
            setUser(user ?? undefined);
            setError(error ?? "");
            return user;
        }
        return "error";
    }

    const value = { user, setUser, error, SignInWithPhoneNumber, ConfirmationResult };

    return <smsAuthContext.Provider value={value} {...props} />
};

export default { SMSAuthProvider, useAuth, smsAuthContext };