import React from "react"
import type { GatsbyBrowser } from "gatsby"
import { AuthProvider } from "./src/hooks/AuthProvider"
import AuthSateChanged from "./src/hooks/AuthStateChanged"

import "firebase/auth"
import "firebase/firestore"
import "firebase/functions"

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
    element,
}) => {
    return (
        <>
            <AuthProvider>
                <AuthSateChanged>
                    {element}
                </AuthSateChanged>
            </AuthProvider>
        </>
    )
}