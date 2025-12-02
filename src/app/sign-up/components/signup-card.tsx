import styles from '../styles/sign-up.module.css';

export default function SignupCard(){
    return(
        <>
            <div className={styles['signup-component']}>
                <header>
                    Sign Up
                </header>
                <form action="">

                    <div className={styles['input-bars']}>
                        <input name='email' id='email' type="email" placeholder="E-Mail address" required/>
                        <input name="username" id='username' placeholder='Username' required/>
                        <input name="password" id='password' type="password" placeholder='Password'/>
                    </div>

                    <div className={styles['button-container']}>
                        <button className={styles['sign-up']}>
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}