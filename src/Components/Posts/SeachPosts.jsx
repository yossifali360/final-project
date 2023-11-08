import React from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import { getPosts, searchPosts } from '../../MainServices/getPosts';

export const SeachPosts = ({setposts}) => {
    const onChange = async (text)=>{
        if(text == ""){
            const waitForData = async () => setposts(await getPosts());
            waitForData();
        }else{
            const waitForData = async () => setposts(await searchPosts(text));
        waitForData()
        }
    }
  return (
    <div className="flex items-center border rounded-full shadow-md my-5">
      <div className="p-2">
        <AiOutlineSearch className="text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search Here"
        onChange={(e) => onChange(e.target.value)}
        className="py-2 pr-4 pl-2 bg-transparent focus:outline-none w-48 sm:w-64 md:w-80 lg:w-96 rounded-full dark:text-white"
      />
    </div>
  )
}
