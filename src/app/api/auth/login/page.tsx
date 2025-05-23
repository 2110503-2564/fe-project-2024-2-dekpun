"use client";
import { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import Link from "next/link";
import { TextField } from "@mui/material";
export default function SignIn() {
    const [providers, setProviders] = useState<any>({});

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");

    useEffect(() => {
        ( async () => {
            const res = await getProviders();
            setProviders(res || {});
        })();
    }, []);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
        return emailRegex.test(email);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setEmail(value);
        setEmailError(validateEmail(value) ? "" : "Invalid email format");
    };

    const handleSignIn = (providerId: string) => {
        if (!validateEmail(email)) {
            setEmailError("Invalid email format");
            return;
        }
        signIn(providerId, { email, password, callbackUrl: window.history.length > 1 ? document.referrer : "/" }); // Set proper callbackUrl
    };

    return (
        <div className="flex h-[80vh] items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 px-10 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
                {/* Email Input */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Email</label>
                    <TextField
                        type="email"
                        fullWidth 
                        required
                        value={ email }
                        onChange={ handleEmailChange }
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                    />
                    { emailError && <p className="text-red-500 text-sm mt-1">{ emailError }</p> }
                </div>

                {/* Password Input */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Password</label>
                    <TextField
                        type="password"
                        fullWidth 
                        required
                        value={ password }
                        onChange={ (e) => setPassword(e.target.value) }
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                    />
                </div>

                {/* Login Button */}
                <div className="flex justify-center items-center">
                {
                    providers ?
                        Object.values(providers).map((provider: any) => (
                            <button
                                key={provider.id}
                                onClick={() => handleSignIn(provider.id)}
                                className="w-[50%] bg-[#007AFF] text-white py-2 px-4 rounded-xl hover:bg-[#00BCD4] hover:text-white transition"
                            >
                                Login
                            </button>
                        ))
                    :
                        <></>
                }
                </div>
                

                <p className="pt-5 text-center text-blue-600">
                    Don't have an account? <Link href={"/api/auth/register"} className="underline hover:text-blue-900 transition">Register Here!</Link>
                </p>
            </div>
        </div>
    );
}
