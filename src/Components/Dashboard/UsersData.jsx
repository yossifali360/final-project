import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { deleteUserData } from "../../MainServices/authentication";
import { useState } from "react";

export const UsersDataDiv = ({ UsersData }) => {
	console.log(UsersData);
	const [UsersInfo, setUsersInfo] = useState(UsersData);
	const deleteUser = async (id) => {
		await deleteUserData(id);
		setUsersInfo((UsersData) => UsersData.filter((user) => user.id !== id));
		console.log(UsersInfo);
	};
	return (
		<div className="relative">
			<span className="hidden dark:block absolute mainGradient -top-24 left-0 w-44	h-44"></span>
			<span className="hidden dark:block absolute mainGradient top-1/2 left-1/2 w-44	h-44"></span>
			<span className="hidden dark:block absolute mainGradient  -bottom-8 right-0 w-72 h-44"></span>
			<table className="w-full relative text-center border-separate border border-slate-400 my-5 text-black dark:text-white">
				<caption className="caption-top my-3 text-xl">
					Table 1: Users of Elite States ({" "}
					<span className="text-red-500">{UsersInfo.length}</span>{" "}
					Users )
				</caption>
				<thead>
					<tr className="bg-gray-400">
						<th className="border border-slate-300">ID</th>
						<th className="border border-slate-300">Name</th>
						<th className="border border-slate-300">Email</th>
						<th className="border border-slate-300">Role</th>
						<th className="border border-slate-300">Delete</th>
					</tr>
				</thead>
				<tbody>
					{UsersInfo.map((user, index) => (
						<tr key={index}>
							<td className="border border-slate-300">
								{user.id}
							</td>
							<td className="border border-slate-300">
								{user.name}
							</td>
							<td className="border border-slate-300">
								{user.email}
							</td>
							<td className="border border-slate-300">
								{user.Role}
							</td>
							<td className="border border-slate-300">
								<AiOutlineDelete
									onClick={() => deleteUser(user.id)}
									className="text-red-500 m-auto hover:text-red-700"
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
