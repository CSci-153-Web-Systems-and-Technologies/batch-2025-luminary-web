"use client";
import { redirect, useRouter } from "next/navigation"
import { login, signInWithGoogle } from "../../../lib/auth-actions";
import { createClient } from "../../../utils/supabase/client";
import { useState, useEffect } from "react";
import { userAgent } from "next/server";

export default function LoginPage(){
    const supabase = createClient();
    const {push} = useRouter();
    const [user, setUser] = useState<any>(null);
    const signUp = () => {
        push('../sign-up');
    }
    const forgotPassword = () => {
        push('/forgot-password');
    }

    useEffect(
        ()=>{
            const getUser = async () => {
                const {data : {user}, error} = await supabase.auth.getUser();
                
                if(user){
                    setUser(user);
                    redirect('/main-page');
                }
            }
            getUser();
        }, [])
    return(
        <div className="login-page">
           <div className="component-flex">
                <div id="title-component">
                    <h2>LUMINARY</h2>
                    <div className="p-tags">
                        <p>All your books, </p> 
                        <p> in one click.</p> 
                     </div>
                </div>
                
                <form action="">
                    <div id="login-component">
                        <h2>Sign In</h2>
                        <input id="email" type="email" name="email" placeholder="E-Mail address" required/>
                        <input id="password" type="password" name="password" placeholder="Password" required/>
                        <button type="button" className="forgot-password" onClick={forgotPassword}>Forgot Password?</button>
                        <button type="submit" className="sign-in"
                        formAction={login}
                        >Sign in</button>
                        <div className="sign-with-email-div">
                            <button type='button' className="sign-with-email" onClick={signInWithGoogle}>Sign in with e-mail</button>
                        </div>
                        <div className="no-account">
                            <h3>Don{`'`}t have an account?</h3>
                            <button type="button"onClick={signUp}>Sign Up.</button>
                        </div>
                    </div>
                </form>
           </div>
        </div>
    )
}