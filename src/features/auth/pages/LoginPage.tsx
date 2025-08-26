"use client"

import { LoginForm } from "../components/login-form"
import Image from "next/image"


export default function Login() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10 bg-primary-foreground">
            <div className="w-full max-w-sm md:max-w-3xl ">
                <div className="relative md:hidden p-20 mb-5 ">
                    <Image
                        src="/images/lloyds-logo.png"
                        width={400}
                        height={400}
                        alt="Image"
                        className="absolute bg-white  inset-0 h-full w-full rounded-2xl object-contain dark:brightness-[0.8] "
                    />
                </div>

                <LoginForm />
            </div>
        </div>
    )
}