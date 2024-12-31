import {Card, Input, Checkbox, Button, Typography, Radio} from '@material-tailwind/react';
import {Link, useNavigate} from 'react-router-dom';
import {useState} from "react";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import {checkUsername, createAccount} from "@/service/admin/Account.jsx";
import Swal from "sweetalert2";

export function SignUp() {
    const navigate = useNavigate();

    const [account, setAccount] = useState({
        username: "",
        password: "",
        role: "",
        email: "",
        name: "",
        birthday: "",
        gender: "",
        phone: ""
    })

    const [errors, setErrors] = useState({
        username: "",
        password: "",
        role: "",
        email: "",
        name: "",
        birthday: "",
        gender: "",
        phone: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setAccount((prevState) => ({
            ...prevState,
            [name]: name === "birthday" ? new Date(value) : value,
        }));

        let error = "";

        if (!value) {
            error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        } else {
            if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
                error = "Invalid email format";
            }
            if (name === "phone" && !/^[0-9]{10,15}$/.test(value)) {
                error = "Phone must be a valid number with 10-15 digits";
            }
            if (name === "username" && value.length <= 6) {
                error = "Username must be longer than 6 characters";
            }
            if (name === "password" && value.length <= 6) {
                error = "Password must be longer than 6 characters";
            }
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error
        }));
    };
    const validateForm = async () => {
        let formIsValid = true;
        let newErrors = {...errors};

        for (const key in account) {
            if (!account[key]) {
                formIsValid = false;
                newErrors[key] = `${key} Information Required`;
            } else {
                newErrors[key] = "";
            }
        }

        if (account.username) {
            try {
                const usernameExists = await checkUsername(account.username);
                console.log(usernameExists)
                if (usernameExists) {
                    formIsValid = false;
                    newErrors.username = "Username already exists.";
                }
            } catch (error) {
                console.error("Error checking username:", error);
                newErrors.username = "Error checking username. Please try again later.";
                formIsValid = false;
            }
        }
        setErrors(newErrors);
        return formIsValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (await validateForm()) {
            const isSuccess = await createAccount(account);
            if (isSuccess) {
                    Swal.fire({
                        icon: "success",
                        title: "Created Successfully",
                    }).then(() => {
                        navigate("/auth/sign-in")
                    });
            } else {
                    Swal.fire({
                        icon: "error",
                        title: "Created failed",
                        text: "Something went wrong!",
                    });
            }
        }
    };

    return (
        <section className="m-8 flex">
            <div className="w-2/5 h-full hidden lg:block">
                <img src="/img/pattern.png" className="h-full w-full object-cover rounded-3xl"/>
            </div>
            <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
                <div className="text-center">
                    <Typography variant="h2" className="font-bold mb-4">
                        Register
                    </Typography>
                </div>
                <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}>
                    <div className="mb-1 flex flex-col gap-3">

                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Username
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="username"
                            name="username"
                            value={account.username}
                            onChange={handleChange}
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{className: 'before:content-none after:content-none'}}
                        />
                        {errors.username && <div className="text-red-500 text-sm">{errors.username}</div>}

                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Password
                        </Typography>
                        <div className="relative">
                            <Input
                                size="lg"
                                placeholder="******"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={account.password}
                                onChange={handleChange}
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{className: 'before:content-none after:content-none'}}
                            />
                            {account.password && (
                                <span
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{zIndex: 1}}
                                >
              {showPassword ? <AiOutlineEye size={24}/> : <AiOutlineEyeInvisible size={24}/>}
            </span>
                            )}
                        </div>
                        {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}

                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Select your role
                        </Typography>
                        <div className="flex gap-2">
                            <label className="flex items-center">
                                <Radio
                                    name="role"
                                    value="TEACHER"
                                    checked={account.role === 'TEACHER'}
                                    onChange={handleChange}
                                    className="hover:!text-blue-gray-900"
                                />
                                Teacher
                            </label>
                            <label className="flex items-center">
                                <Radio
                                    name="role"
                                    value="STUDENT"
                                    checked={account.role === 'STUDENT'}
                                    onChange={handleChange}
                                    className="hover:!text-blue-gray-900"
                                />
                                Student
                            </label>
                        </div>
                        {errors.role && <div className="text-red-500 text-sm">{errors.role}</div>}

                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Your email
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="name@mail.com"
                            name="email"
                            value={account.email}
                            onChange={handleChange}
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{className: 'before:content-none after:content-none'}}
                        />
                        {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}

                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Your Fullname
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="Nguyễn Văn A"
                            name="name"
                            value={account.name}
                            onChange={handleChange}
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{className: 'before:content-none after:content-none'}}
                        />
                        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}

                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Your Birthday
                        </Typography>
                        <Input
                            type="date"
                            size="lg"
                            name="birthday"
                            value={account.birthday ? new Date(account.birthday).toISOString().slice(0, 10) : ""}
                            onChange={handleChange}
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{className: 'before:content-none after:content-none'}}
                        />
                        {errors.birthday && <div className="text-red-500 text-sm">{errors.birthday}</div>}

                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Gender
                        </Typography>
                        <select
                            name="gender"
                            value={account.gender}
                            onChange={handleChange}
                            className="p-3 rounded-md border border-blue-gray-200"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.gender && <div className="text-red-500 text-sm">{errors.gender}</div>}

                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Your Phone
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="0912345678"
                            name="phone"
                            value={account.phone}
                            onChange={handleChange}
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{className: 'before:content-none after:content-none'}}
                        />
                        {errors.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}

                    </div>
                    <Button className="mt-6" fullWidth type="submit">
                        Register Now
                    </Button>

                    <Typography
                        variant="paragraph"
                        className="text-center text-blue-gray-500 font-medium mt-4"
                    >
                        Already have an account?
                        <Link to="/auth/sign-in" className="text-gray-900 ml-1">
                            Sign in
                        </Link>
                    </Typography>
                </form>
            </div>
        </section>
    );
}

export default SignUp;