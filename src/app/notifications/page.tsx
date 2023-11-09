"use client";

import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Notifications = () => {
	const { data: session } = useSession({
		required: true,
		onUnauthenticated() {
			redirect("/");
		},
	});

	return (
		<>
			<Header showBackArrow label="Notifications" />
			<NotificationsFeed />
		</>
	);
};

export default Notifications;
