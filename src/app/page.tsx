"use client";
import Image from "next/image";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";
import MainPage from "./main-page/page";
export default function Home() {
  const supabase = createClient();
  const {push} = useRouter();

  useEffect(() => {
    const fetchUser = async()=>{
      const {data : {user}, error} = await supabase.auth.getUser();
      if(!user){
        push('/login-page');
      }
    }
    
  },[])
  return (
    <>
      <MainPage></MainPage>
    </>
  );
}
