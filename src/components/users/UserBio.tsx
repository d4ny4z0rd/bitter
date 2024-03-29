import { useMemo } from "react";
import { BiCalendar } from "react-icons/bi";
import { format } from "date-fns";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import useFollow from "@/hooks/useFollow";
import useEditModal from "@/hooks/useEditModal";

import Button from "../Button";

interface UserBioProps {
	userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
	const { data: currentUser } = useCurrentUser();
	const { data: fetchedUser } = useUser(userId);
	const editModal = useEditModal();
	const { isFollowing, toggleFollow } = useFollow(userId);

	const createdAt = useMemo(() => {
		if (!fetchedUser?.createdAt) return null;

		return format(new Date(fetchedUser.createdAt), "MMMM yyyy");
	}, [fetchedUser?.createdAt]);

	return (
		<div className="border-b-[1px] border-neutral-800 pb-4">
			<div className="flex justify-end p-2">
				{currentUser?.id === userId ? (
					<Button secondary label="Edit" onClick={editModal.onOpen} />
				) : (
					<Button
						onClick={toggleFollow}
						label={isFollowing ? "Unfollow" : "Follow"}
						secondary={!isFollowing}
						outline={isFollowing}
					/>
				)}
			</div>
			<div className="px-4 mt-8">
				<div className="flex flex-col">
					<p className="text-2xl font-semibold text-white">
						{fetchedUser?.name}
					</p>
					<p className="text-md text-neutral-500">@{fetchedUser?.username}</p>
				</div>
				<div className="flex flex-col mt-4">
					<p className="text-white">{fetchedUser?.bio}</p>
					<div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
						<BiCalendar size={24} />
						<p>Joined {createdAt}</p>
					</div>
				</div>
				<div className="flex flex-row items-center gap-6 mt-4">
					<div className="flex flex-row items-center gap-1 border-b border-transparent hover:border-white hover:cursor-pointer">
						<p className="text-white">{fetchedUser?.followingIds?.length}</p>
						<p className="text-neutral-500">Following</p>
					</div>
					<div className="flex flex-row items-center gap-1 border-b border-transparent hover:border-white hover:cursor-pointer">
						<p className="text-white">{fetchedUser?.followerCount || 0}</p>
						<p className="text-neutral-500">Followers</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserBio;
