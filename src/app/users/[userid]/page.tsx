"use client";
import { ClipLoader } from "react-spinners";
import useUser from "@/hooks/useUser";
import Header from "@/components/Header";
import UserHero from "@/components/users/UserHero";
import UserBio from "@/components/users/UserBio";
import PostFeed from "@/components/posts/PostFeed";

const UserView = ({ params }: any) => {
	const { userid: userId } = params;
	const { data: fetchedUser, isLoading } = useUser(userId as string);

	if (isLoading || !fetchedUser) {
		return (
			<div className="flex items-center justify-center h-full">
				<ClipLoader color="lightblue" size={80} />
			</div>
		);
	}

	return (
		<>
			<Header
				showBackArrow
				label={fetchedUser?.name}
				tweetCount={fetchedUser?.postCount || 0}
			/>
			<UserHero userId={userId as string} />
			<UserBio userId={userId as string} />
			<PostFeed userId={userId as string} />
		</>
	);
};

export default UserView;
