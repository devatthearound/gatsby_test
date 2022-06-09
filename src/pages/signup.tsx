import { Link } from "gatsby";
import React, { useState } from "react"
import { AuthProvider, useAuth } from "../hooks/AuthProvider";

type LoginDTO = {
    email: string
    password: string
}

const SignUpPage = () => {
    const { user, CreateUserWithEmailAndPassword } = useAuth();

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

        const res = await CreateUserWithEmailAndPassword(form.email, form.password);
    };


    return (
        <>
            <form onSubmit={handlerOnSubmit}>
                <div>
                    <label htmlFor="email">이메일 입력</label>
                    <input type="text" name="email" value={form.email} onChange={handlerOnChange} />
                </div>
                <div>
                    <label htmlFor="password">비밀번호 입력</label>
                    <input type="password" name="password" value={form.password} onChange={handlerOnChange} />
                </div>

                <button type="submit">제출</button>
            </form>
            <Link to="/signin">로그인 하기</Link>
        </>
    )
}

export default SignUpPage