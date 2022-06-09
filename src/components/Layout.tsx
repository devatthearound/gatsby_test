import React from "react"
import { useAuth } from "../hooks/AuthProvider"
import { navigate } from "@reach/router"

type Props = {
    children: React.ReactNode
}
const Layout: React.FC<Props> = ({ children }) => {
    const { user } = useAuth();

    if (!user) navigate('/signin');

    return (
        <>
            <div>
                {children}
            </div>
        </>
    )
}

export default Layout;