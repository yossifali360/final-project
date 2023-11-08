import React from "react";
import "./Dashboard.css"
import { AiOutlineDelete } from "react-icons/ai";
import { deletePostData } from "../../MainServices/getPosts";
import { useState } from "react";

export const PostsDataDiv = ({PostsData}) => {
    const deletePost = async (id)=>{
        await deletePostData(id)
		setDbPostsData((PostsData) => PostsData.filter((post) => post.id !== id)
      );
    }
    const [DbPostsData, setDbPostsData] = useState(PostsData)
	return (
		<table className="w-full text-center border-separate border border-slate-400 my-5 text-black dark:text-white">
			<caption className="caption-top my-3 text-xl">
				Table 3 : Posts of Elite States ( <span className="text-red-500">{DbPostsData.length}</span> Posts )
			</caption>
			<thead>
				<tr className="bg-gray-400">
					<th className="border border-slate-300 w80PX">Image</th>
					<th className="border border-slate-300">Header</th>
					<th className="border border-slate-300">Delete</th>
				</tr>
			</thead>
			<tbody>
				{DbPostsData.map((post, index) => (
					<tr key={index}>
						<td className="border border-slate-300 w80PX"><img className="dashPostImg" src={post.MainImg} alt="post Img" /></td>
						<td className="border border-slate-300">
							{post.header}
						</td>
						<td className="border border-slate-300"><AiOutlineDelete onClick={() => deletePost(post.id)} className="text-red-500 m-auto hover:text-red-700" /></td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
