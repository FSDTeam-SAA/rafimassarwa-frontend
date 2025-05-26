"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, User, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import googleImag from "../../../public/images/Authentication/google.png";
import appleImg from "../../../public/images/Authentication/apple.png";
import microsoft from "../../../public/images/Authentication/microsoft.png";
import { registerUser } from "@/app/actions/auth";
import Router from "next/router";
import { toast } from "sonner";

// Define the form schema with Zod
const formSchema = z
  .object({
    username: z.string().min(3, {
      message: "Username must be at least 3 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    // Handle form submission here
    try {
      const result = await registerUser({
        username: data?.username,
        email: data?.email,
        role: "user",
        password: data?.password,
        confirmPassword: data?.confirmPassword,
      });

      console.log("sign up", result);

      if (result.success) {
        toast("Account Successfully created");
        toast("Login to continue");
        Router.push("/login");
      } else {
        toast("Registration failed");
      }
    } catch (error) {
      toast("Something went wrong || " + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex lg:min-h-screen items-center justify-center  p-4 bg-gradient-to-l from-[white] to-[#e8f7eb]">
      <div className="w-full max-w-6xl lg:overflow-hidden rounded-[2rem] bg-white shadow-[0_0_40px_rgba(0,0,0,0.2)] h-[778px]">
        <div className="flex flex-col lg:flex-row">
          {/* Left side - Registration Form */}
          <div className="w-full p-10 md:w-1/2 mx-auto  lg:h-[778px] flex flex-col items-center justify-center">
            {/* ADDED: Benefit/Value Proposition */}
            <p className="mb-4 text-center text-lg text-gray-700">
              Join our community and unlock exclusive content!
            </p>

            <h1 className="mb-8 text-center text-3xl font-bold">
              Registration
            </h1>

            {/* Social login options */}
            <div className="mb-6 flex justify-center space-x-4">
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <Image src={googleImag} alt="Google" width={24} height={24} />
              </button>
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <Image src={microsoft} alt="Microsoft" width={24} height={24} />
              </button>
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <Image src={appleImg} alt="Apple" width={24} height={24} />
              </button>
            </div>

            <p className="mb-8 text-center text-gray-600">
              or use your email for registration
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 w-full"
            >
              {/* Username field */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full rounded border border-gray-300 py-3 pl-4 pr-10 outline-none focus:border-green-500"
                  {...register("username")}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                  <User size={20} />
                </div>
                {errors.username && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Email field */}
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded border border-gray-300 py-3 pl-4 pr-10 outline-none focus:border-green-500"
                  {...register("email")}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                  <Mail size={20} />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password field */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full rounded border border-gray-300 py-3 pl-4 pr-10 outline-none focus:border-green-500"
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password field */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full rounded border border-gray-300 py-3 pl-4 pr-10 outline-none focus:border-green-500"
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Register button */}
              <button
                type="submit"
                className="mt-2 w-full rounded bg-green-500 py-3 font-medium text-white transition-colors hover:bg-green-600"
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </form>
          </div>

          <div className="bg-[#eaf6ec] p-2 rounded-b-lg lg:hidden">
            <div className="flex flex-col items-center justify-center w-full h-full text-gray-700">
              <h1 className="mb-3 text-center text-3xl font-bold">
                Hello, Welcome!
              </h1>
              <p className="mb-3 text-center">
                Enter your personal details to use all of site features
              </p>
              <Link
                href="/login"
                className="w-32 rounded border border-green-500 py-3 text-center text-green-500 transition-colors hover:bg-green-500 hover:text-white"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Right side - Welcome message */}
          <div className="relative w-[70%]  h-[778px] hidden lg:block">
            <div className="bg-gradient-to-br from-[#f0f9f0] to-[#e6f7e6] p-10  skew-x-12 w-full h-full absolute ml-[76px] shadow-[0_0_40px_rgba(0,0,0,0.2)]"></div>

            <div className="absolute flex flex-col items-center justify-center w-full h-full text-gray-700">
              <h1 className="mb-4 text-center text-5xl font-bold">
                Hello, Welcome!
              </h1>
              <p className="mb-8 text-center">
                Enter your personal details to use all of site features
              </p>
              <Link
                href="/login"
                className="w-32 rounded border border-green-500 py-3 text-center text-green-500 transition-colors hover:bg-green-500 hover:text-white"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
