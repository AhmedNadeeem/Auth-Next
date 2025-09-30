"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function profilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      console.log(response);
      setData(response.data.data._id);
    } catch (error:any) {
      console.error(error);
      toast.error(error.message)
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout success")
      router.push("/login");
    } catch (error:any) {
      console.error(error);
      toast.error(error.message)
    }
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile page</h1>
      <h2>
        {data === "nothing" ? 
        "Nothing" : 
        <Link href={`/profile/${data}`}>{data}</Link>}
      </h2>
      <hr />
      <button 
      onClick={logout}
      className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
      <button 
      onClick={getUserDetails}
      className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Get user details
      </button>
    </div>
  )
}