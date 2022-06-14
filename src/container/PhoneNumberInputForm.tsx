
import React from 'react';
import { RecaptchaVerifier, getAuth } from "firebase/auth";
import { useEffect } from 'react';
import firebase from "../service/FBConfig";

type Props = {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    sendAuthCode: () => Promise<void>
}

const PhoneNumberInputForm: React.FC<Props> = ({ value, onChange, sendAuthCode }) => {
    const firebaseAuth = getAuth(firebase);

    useEffect(() => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
        }, firebaseAuth);
    }, []);

    return (
        <>
            <div>
                <label htmlFor="phoneNumber">전화번호 입력</label>
                <input type="text" name="phoneNumber" value={value} onChange={onChange} />
            </div>
            <button id="recaptcha-container" onClick={sendAuthCode}>확인</button>
        </>
    )
}

export default PhoneNumberInputForm;