"use client";

import { useParams } from "next/navigation";
import { ClipLoader } from "react-spinners";
import usePost from "@/hooks/usePost";
import Header from "@/components/Header";
import PostItem from "@/components/posts/PostItem";
import Form from "@/components/Form";
import CommentFeed from "@/components/posts/CommentFeed";

const PostView = () => {
	const { postid } = useParams();
	const { data: fetchedPost, isLoading } = usePost(postid as string);

	if (isLoading || !fetchedPost) {
		return (
			<div className="flex items-center justify-center h-full">
				<ClipLoader color="lightblue" size={80} />
			</div>
		);
	}

	return (
		<>
			<Header showBackArrow label="Tweet" />
			<PostItem data={fetchedPost} />
			<Form
				postId={postid as string}
				isComment
				placeholder="Tweet your reply!"
			/>
			<CommentFeed comments={fetchedPost?.comments} />
		</>
	);
};

export default PostView;
