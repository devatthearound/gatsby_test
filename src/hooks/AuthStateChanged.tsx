import firebase from '../service/FBConfig';
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { useAuth } from './AuthProvider';
import React, { useEffect, useState } from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

const AuthStateChanged = ({ children }: LayoutProps) => {
    const { setUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const firebaseAuth = getAuth(firebase);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, user => {
            setUser(user);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return null
    }

    return (
        <>
            {children}
        </>
    );
};

export default AuthStateChanged;