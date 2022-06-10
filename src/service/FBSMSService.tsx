import { getAuth, signOut, signInWithPhoneNumber, ConfirmationResult, RecaptchaVerifier, ApplicationVerifier } from 'firebase/auth';
import firebase from './FBConfig';

const firebaseAuth = getAuth(firebase);
export const isBrowser = () => typeof window !== "undefined"

export const getRecaptchaVerifier = () => isBrowser() && window.recaptchaVerifier

window.recaptchaVerifier = new RecaptchaVerifier('sign-in-buttons', {
    'size': 'invisible',
    'callback': (response: any) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
    }
}, firebaseAuth);

const SMSService = {
    SignInWithPhoneNumber: async (phoneNumber: string) => {
        try {
            const confirmationResult = await signInWithPhoneNumber(firebaseAuth, phoneNumber, window.recaptchaVerifier)
            window.confirmationResult = confirmationResult;
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log(err);
                return {
                    error: err.message,
                };
            } else {
                return { error: "error" }
            }
        }
    },
    ConfirmationResult: async (code: string) => {
        try {
            const userCred = await window.confirmationResult.confirm(code);
            return {
                user: userCred.user
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log(err);
                return {
                    error: err.message,
                };
            } else {
                return { error: "error" }
            }
        }
    },
    LoginOut: async () => {
        await signOut(firebaseAuth);
    }
};

export default SMSService;