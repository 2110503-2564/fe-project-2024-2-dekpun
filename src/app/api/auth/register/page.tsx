"use client";
import { BACKEND_URL } from "@/backend-config";
import { useState } from "react";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        tel: "",
        gender: "Male",
        birthdate: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({} as any);
    const [successMessage, setSuccessMessage] = useState("");

    // 🔹 Handle Input Change
    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 🔹 Validate and Submit Form
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage("");

        const newErrors: any = {};

        // 🔹 Validations
        if (!formData.name.trim()) newErrors.name = "Full name is required.";
        if (!/^0\d{2}-\d{3}-\d{4}$/.test(formData.tel)) newErrors.tel = "Invalid contact number format (e.g., 012-345-6789).";
        if (!formData.birthdate || new Date(formData.birthdate) >= new Date()) newErrors.birthdate = "Birthdate must be a past date.";
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format.";
        if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";

        // If Errors Exist, Stop Submission
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // 🔹 Send Data to API
        const response = await fetch(`${BACKEND_URL}/api/v1/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            setSuccessMessage("Registration successful!");
            setFormData({
                name: "",
                tel: "",
                gender: "Male",
                birthdate: "",
                email: "",
                password: "",
                confirmPassword: ""
            });
        } else {
            setErrors({ server: "Failed to register. Please try again." });
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-4">Register</h1>

                {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}
                {errors.server && <p className="text-red-600 text-center">{errors.server}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your fullname"
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    {/* Contact Number */}
                    <div>
                        <input
                            type="text"
                            name="tel"
                            value={formData.tel}
                            onChange={handleChange}
                            placeholder="e.g. 012-345-6789"
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.tel && <p className="text-red-500 text-sm">{errors.tel}</p>}
                    </div>

                    {/* Gender */}
                    <div>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Unidentified">Unidentified</option>
                        </select>
                    </div>

                    {/* Birthdate */}
                    <div>
                        <input
                            type="date"
                            name="birthdate"
                            value={formData.birthdate}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.birthdate && <p className="text-red-500 text-sm">{errors.birthdate}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm password"
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
