import { RecaptchaVerifier, getAuth, signInWithPhoneNumber } from "firebase/auth";
import React, { useEffect, useState } from "react"
import firebase from "../service/FBConfig";

type LoginDTO = {
    phoneNumber: string
    code: string
}

const PhoneNumberPage = () => {
    const firebaseAuth = getAuth(firebase);

    useEffect(() => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, firebaseAuth);
    }, []);

    const [form, setForm] = useState<LoginDTO>({
        phoneNumber: '',
        code: ''
    });

    const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value });

    }

    const handlerOnSubmit = async () => {
        firebaseAuth.languageCode = 'ko';

        signInWithPhoneNumber(firebaseAuth, "+82" + form.phoneNumber, window.recaptchaVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                console.log(confirmationResult);
            }).catch((error) => {
                console.log(error);
            })
    };

    const handlerAuthCode = async () => {
        if (window.confirmationResult) {
            window.confirmationResult.confirm(form.code)
                .then((result) => {
                    alert(result.user.uid + ", 인증이 완료되었습니다")
                    console.log(result.user.uid)
                }).catch((error) => {
                    console.log(error);
                })
        }

    };

    return (
        <>
            <div>
                <label htmlFor="phoneNumber">전화번호 입력</label>
                <input type="text" name="phoneNumber" value={form.phoneNumber} onChange={handlerOnChange} />
            </div>
            <button onClick={handlerOnSubmit}>제출</button>

            <div>
                <label htmlFor="code">인증번호 입력</label>
                <input type="text" name="code" value={form.code} onChange={handlerOnChange} />
            </div>
            <button onClick={handlerAuthCode}>제출</button>
            <div id="recaptcha-container"></div>
        </>
    )
}

export default PhoneNumberPage