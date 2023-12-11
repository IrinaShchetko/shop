import React from 'react'
import styles from './styles.module.css'
import background from '../../assets/header/form_background.png'
import openEye from '../../assets/header/openEye.png'
import closeEye from '../../assets/header/closeEye.png'

interface AuthFormProps {
  handleSubmit: () => void
  showPassword: boolean
  seePassword: () => void
}

export const AuthForm: React.FC<AuthFormProps> = ({ handleSubmit, showPassword, seePassword }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img className={styles.background} src={background} alt="background" />
        <h2 className={styles.title}>Sign-In</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="email" className={styles.label}>
            Email
            <input className={styles.input} type="email" name="email" id="email" placeholder="Enter your email.." />
          </label>
          <label htmlFor="password" className={styles.label}>
            Password:
            <input type={showPassword ? 'text' : 'password'} name="password" id="password" placeholder="Enter your password..." />
            <button className={styles.eye} type="button" onClick={seePassword}>
              {showPassword ? <img src={closeEye} alt="closeEye" /> : <img src={openEye} alt="openEye" />}
            </button>
          </label>
          {/* <button className={styles.submit} type="submit">
            Login
          </button> */}
          {/* <div className={styles.registration}> */}
          <button className={styles.submit} type="submit">
            Create your ZEBRA account
          </button>
          {/* </div> */}
        </form>
      </div>
    </div>
  )
}
