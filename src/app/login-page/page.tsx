
export default function LoginPage(){
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
                <div id="login-component">
                    <h2>Sign In</h2>
                    <input type="text" placeholder="Username" />
                    <input type="text" placeholder="Password" />
                    <button className="forgot-password">Forgot Password?</button>
                    <button className="sign-in">Sign in</button>
                    <div className="sign-with-email-div">
                        <button className="sign-with-email">Sign in with e-mail</button>
                    </div>
                    <div className="no-account">
                        <h3>Don{`'`}t have an account?</h3>
                        <button>Sign Up.</button>
                    </div>
                </div>
           </div>
        </div>
    )
}