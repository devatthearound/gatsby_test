import { Link } from "gatsby";
import React, { useState } from "react"
import { SMSAuthProvider, useAuth } from "../hooks/SMSProvider";

type LoginDTO = {
    phoneNumber: string
}

const PhoneNumberPage = () => {
    const { SignInWithPhoneNumber } = useAuth();

    const [form, setForm] = useState<LoginDTO>({
        phoneNumber: '',
    });

    const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value });

    }

    const handlerOnSubmit = async () => {
      const res = await SignInWithPhoneNumber(form.phoneNumber);
    };


    return (
        <>
            <form onSubmit={handlerOnSubmit}>
                <div>
                    <label htmlFor="phoneNumber">전화번호 입력</label>
                    <input type="text" name="phoneNumber" value={form.phoneNumber} onChange={handlerOnChange} />
                </div>
                <input id="sign-in-button" type="submit" value="제출"/>
            </form>
        </>
    )
}

export default PhoneNumberPage