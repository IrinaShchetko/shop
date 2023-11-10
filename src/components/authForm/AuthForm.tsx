import styles from './styles.module.css'
import background from '../../assets/header/form_background.png'

export const AuthForm = () => {
    return (
        <div className={styles.container}>
            <img className={styles.background} src={background} alt="background" />
        <form className={styles.form}>
            <label
                htmlFor="email"
                className={styles.label}>
                Email
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
                Password
            </label>
            <input
                className={styles.input}
                type="password"
                name="password"
                id="password"
                placeholder='Enter your password...' />
            <button className={styles.submit} type='submit'>Sign in</button>
        </form>
        </div>
    )
}
