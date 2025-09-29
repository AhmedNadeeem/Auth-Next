"use client"
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log(response);
      console.log("Login success", response.data);
      router.push("/profile");
    } catch (error:any) {
      console.log("Login Failed!");
      toast.error(error.message);
    }
  };

  useEffect(()=> {
    if(user.password.length > 6 && user.username.length > 0) {
      setButtonDisabled(false);
    }
  }, [user])
  
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-2xl font-bold m-2'>{loading ? "Precessing" : "Login"}</h1>

      <label htmlFor="email">Email</label>
      <input 
      className="bg-white p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      value={user.email}
      onChange={(e)=> setUser({ ...user, email: e.target.value })}
      type="email" 
      id="email"  />

      <label htmlFor="password">Password</label>
      <input 
      className="bg-white p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      value={user.password}
      onChange={(e)=> setUser({ ...user, password: e.target.value })}
      type="password" 
      id="password"  />

      <button
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      onClick={onLogin}
      >
        {buttonDisabled ? "No Login" : "Login"}
      </button>

      <Link href="/signup">Visit Signup page</Link>
    </div>
  )
}