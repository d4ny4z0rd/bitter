import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import { BiLogOut } from "react-icons/bi";
import TweetButton from "./TweetButton";
import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";

const Sidebar = () => {
	const { data: currentUser } = useCurrentUser();
	const items = [
		{
			icon: BsHouseFill,
			label: "Home",
			href: "/",
		},
		{
			icon: BsBellFill,
			label: "Notifications",
			href: "/notifications",
			auth: true,
		},
		{
			icon: FaUser,
			label: "Profile",
			href: `/users/${currentUser?.id}`,
			auth: true,
		},
	];
	return (
		<div className="h-full col-span-1 pr-4 md:pr-6">
			<div className="flex flex-col items-end">
				<div className="space-y-2 lg:w-[230px]">
					<SidebarLogo />
					{items.map((item) => (
						<SidebarItem
							key={item.href}
							href={item.href}
							label={item.label}
							icon={item.icon}
							auth={item.auth}
						/>
					))}
					{currentUser && (
						<SidebarItem
							onClick={() => signOut()}
							icon={BiLogOut}
							label="Log Out"
						/>
					)}
					<TweetButton />
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
