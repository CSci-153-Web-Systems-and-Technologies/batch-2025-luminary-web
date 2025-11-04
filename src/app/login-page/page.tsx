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
                    <button>Sign in with e-mail?</button>
                </div>
           </div>
        </div>
    )
}