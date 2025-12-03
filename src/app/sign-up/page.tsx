import SignupCard from "./components/signup-card"
import styles from './styles/sign-up.module.css'
export default function SignUpPage(){
    return(
        <>
        <header className={styles["signup-header"]}>
            LUMINARY
        </header>
        <SignupCard></SignupCard>
        </>
    )
}