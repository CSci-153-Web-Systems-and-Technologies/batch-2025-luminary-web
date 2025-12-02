"use client";
import { useRouter } from "next/navigation"
import { login } from "../../../lib/auth-actions";



export default function LoginPage(){
    const {push} = useRouter();
    const signUp = () => {
        push('../sign-up');
    }
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
                        <input type="text" name="email" placeholder="E-Mail address" required/>
                        <input id="password" type="password" name="password" placeholder="Password" required/>
                        <button className="forgot-password">Forgot Password?</button>
                        <button type="submit" className="sign-in"
                        formAction={login}
                        >Sign in</button>
                        <div className="sign-with-email-div">
                            <button className="sign-with-email">Sign in with e-mail</button>
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