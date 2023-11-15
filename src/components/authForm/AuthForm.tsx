import styles from './styles.module.css'
import background from '../../assets/header/form_background.png'

export const AuthForm = () => {
    return (
        <div className={styles.container}>
            <img className={styles.background} src={background} alt="background" />
            <div className={styles.wrapper}>
                <h2 className={styles.title}>Sign-In</h2>
                <form className={styles.form}>
                    <label
                        htmlFor="email"
                        className={styles.label}>
                    </label>
                    <input
                        className={styles.input}
                        type="email"
                        name="email"
                        id="email"
                        placeholder='Enter your email...' />
                    <label
                        htmlFor="password"
                        className={styles.label}>
                    </label>
                    <input
                        className={styles.input}
                        type="password"
                        name="password"
                        id="password"
                        placeholder='Enter your password...' />
                    <button className={styles.submit} type='submit'>Sign in</button>
                </form>
                {/* <div className={styles.addititional}>
        <p className={styles.desc} >More sign in options</p>
        <button className={styles.submit}>Login with Google</button>
        </div> */}
                <div className={styles.registration}>
                    <p className={styles.desc}>New to zebra.com</p>
                    <button className={styles.submit}>Create your ZEBRA account</button>
                </div>
            </div>
        </div>
    )
}
