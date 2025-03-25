"use client";
import userRegister from "@/libs/userRegister";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Select, MenuItem, TextField, FormControl, InputLabel, Card, CardContent, Button} from "@mui/material";
import Swal from "sweetalert2";

export default function Register() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        tel: "",
        gender: "Male",
        birthdate: "",
        email: "",
        password: ""
    });

    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState({} as any);
    const [successMessage, setSuccessMessage] = useState("");

    // Handle Input Change
    const handleChange = (e: any) => {
        (e.target.name === "confirmPassword") ?
            setConfirmPassword(e.target.value)
        :
            setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Validate and Submit Form
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage("");

        const newErrors: any = {};

        // 🔹 Validations
        if (!formData.name.trim()) {
            newErrors.name = "Full name is required.";
        }

        if (!/^0\d{2}-\d{3}-\d{4}$/.test(formData.tel)) {
            newErrors.tel = "Invalid contact number format (e.g., 012-345-6789).";
        }

        if (!formData.birthdate || new Date(formData.birthdate) >= new Date()) {
            newErrors.birthdate = "Birthdate must be a past date.";
        }

        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Invalid email format.";
        }

        if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }
        
        if (formData.password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        // If Errors Exist, Stop Submission
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Send Data to API
        try {
            const response = await userRegister(formData);
            
            setSuccessMessage("Registration successful!");
            setFormData({
                name: "",
                tel: "",
                gender: "Male",
                birthdate: "",
                email: "",
                password: "",
            });
            setConfirmPassword("");

            Swal.fire({
                title: "You are now registered!",
                icon: "success",
                draggable: true
            }).then( () => {
                router.push("/api/auth/login");
            });

        } catch (error) {
            console.log(error);
            setErrors({ server: "Failed to register. Please try again." });
        }
    };

    return (
        <div className="flex h-[100vh] items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 mt-4 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-4">Register</h1>

                { successMessage && <p className="text-green-600 text-center">{ successMessage }</p> }
                { errors.server && <p className="text-red-600 text-center">{ errors.server }</p> }

                <form onSubmit={ handleSubmit } className="space-y-4">

                    {/* Name */}
                    <div>
                        <TextField
                            label="Full Name"
                            type="text"
                            name="name"
                            value={ formData.name }
                            onChange={ handleChange }
                            placeholder="Enter your fullname"
                            className="w-full p-2 border rounded-md"
                        />
                        { errors.name && <p className="text-red-500 text-sm">{ errors.name }</p> }
                    </div>

                    {/* Contact Number */}
                    <div>
                        <TextField
                            label="Tel"
                            type="text"
                            name="tel"
                            value={ formData.tel }
                            onChange={ handleChange }
                            placeholder="e.g. 012-345-6789"
                            className="w-full p-2 border rounded-md"
                        />
                        { errors.tel && <p className="text-red-500 text-sm">{ errors.tel }</p> }
                    </div>

                    {/* Gender */}
                    <div >
                    <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
                            label="Gender"
                            name="gender"
                            value={ formData.gender }
                            onChange={ handleChange }
                        >
                            <MenuItem key="Male" value="Male">Male</MenuItem>
                            <MenuItem key="Female" value="Female">Female</MenuItem>
                            <MenuItem key="Unidentified" value="Unidentified">Unidentified</MenuItem>
                            
                        </Select>
                     </FormControl>
                        
                    </div>

                    {/* Birthdate */}
                    <div>
                        <input
                            type="date"
                            name="birthdate"
                            value={ formData.birthdate }
                            onChange={ handleChange }
                            className="text-[#666666] w-full p-2 border border-[#C4C4C4] rounded-md h-[60px] focus:outline-none focus:ring-1 focus:ring-blue-500 hover:border-black"
                            
                        />
                        { errors.birthdate && <p className="text-red-500 text-sm">{ errors.birthdate }</p> }
                    </div>

                    {/* Email */}
                    <div>
                        <TextField
                            label="Email"
                            type="email"
                            name="email"
                            value={ formData.email }
                            onChange={ handleChange }
                            placeholder="Enter your email"
                            className="w-full p-2 border rounded-md"
                        />
                        { errors.email && <p className="text-red-500 text-sm">{ errors.email }</p> }
                    </div>

                    {/* Password */}
                    <div>
                        <TextField
                            label="Password"
                            type="password"
                            name="password"
                            value={ formData.password }
                            onChange={ handleChange }
                            placeholder="Enter password"
                            className="w-full p-2 border rounded-md"
                        />
                        { errors.password && <p className="text-red-500 text-sm">{ errors.password }</p> }
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <TextField
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            value={ confirmPassword }
                            onChange={handleChange}
                            placeholder="Confirm password"
                            className="w-full p-2 border rounded-md"
                        />
                        { errors.confirmPassword && <p className="text-red-500 text-sm">{ errors.confirmPassword }</p> }
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center items-center">
                    <button type="submit" className="w-[50%] bg-[#007AFF] text-white py-2 px-4 rounded-xl hover:bg-[#00BCD4] hover:text-white transition">
                        Register
                    </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
