import React, { useState } from "react"
import { AuthProvider, useAuth } from "../hooks/AuthProvider";

type LoginDTO = {
    email: string
    password: string
}

const SignInPage = () => {
    const { user, SignInWithEmailAndPassword, LoginOut } = useAuth();
    console.log(user);
    const [form, setForm] = useState<LoginDTO>({
        email: '',
        password: ''
    });

    const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value });

    }

    const handlerOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await SignInWithEmailAndPassword(form.email, form.password);
    };


    return (
        <>
            <form onSubmit={handlerOnSubmit}>
                <div>
                    <label htmlFor="email">이메일 입력</label>
                    <input type="text" name="email" value={form.email} onChange={handlerOnChange} placeholder="로그인 시 필요"/>
                </div>
                <div>
                    <label htmlFor="password">비밀번호 입력</label>
                    <input type="password" name="password" value={form.password} onChange={handlerOnChange} placeholder="영문,숫자,특수문자 포함 8자 이상"/>
                </div>
                <button onClick={LoginOut}>로그아웃</button>
                <button type="submit">제출</button>
            </form>
        </>
    )
}

export default SignInPage