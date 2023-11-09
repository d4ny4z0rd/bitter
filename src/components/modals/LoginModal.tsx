"use client";

import { useCallback, useState } from "react";

import Input from "../Input";

import useLoginModal from "@/hooks/useLoginModal";
import Modal from "../Modal";
import RegisterModal from "./RegisterModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();

	const onToggle = useCallback(() => {
		loginModal.onClose();
		registerModal.onOpen();
	}, [loginModal, RegisterModal]);

	const onSubmit = useCallback(async () => {
		try {
			setIsLoading(true);

			await signIn("credentials", {
				email,
				password,
			});

			loginModal.onClose();
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}, [loginModal, email, password]);

	const bodyContent = (
		<div className="flex flex-col gap-4">
			{isError && (
				<div className="px-4 py-3 mb-4 text-sm text-white rounded-md bg-amber-600">
					<p className="text-2xl font-semibold text-center">
						Invalid username or password
					</p>
				</div>
			)}
			<Input
				placeholder="Email"
				onChange={(e) => setEmail(e.target.value)}
				value={email}
				disabled={isLoading}
			/>
			<Input
				placeholder="Password"
				type="password"
				onChange={(e) => setPassword(e.target.value)}
				value={password}
				disabled={isLoading}
			/>
		</div>
	);

	const footerContent = (
		<div className="mt-4 text-center text-neutral-400">
			<p>
				Don’t have an account?{" "}
				<span
					onClick={onToggle}
					className="cursor-pointer text-sky-600 hover:underline">
					Sign Up
				</span>
			</p>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title="Sign in"
			actionLabel="Sign in"
			onClose={loginModal.onClose}
			onSubmit={onSubmit}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default Login;
