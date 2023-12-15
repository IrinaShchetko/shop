import React from 'react'
import background from '../../assets/header/form_background.png'
import openEye from '../../assets/header/openEye.png'
import closeEye from '../../assets/header/closeEye.png'
import styles from './styles.module.css'
import { AuthFormProps } from '../../shared/api/types'

export const AuthForm: React.FC<AuthFormProps> = ({
  showPassword,
  seePassword,
  login,
  password,
  handleLoginChange,
  handlePasswordChange,
  handleLogin,
  handleRegistration,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img className={styles.background} src={background} alt="background" />

        <div className={styles.form}>
          <h2 className={styles.title}>Sign-In</h2>
          <label htmlFor="login" className={styles.label}>
            Login:
            <input type="text" value={login} onChange={handleLoginChange} placeholder="Enter your login.." />
          </label>
          <label htmlFor="password" className={styles.label}>
            Password:
            <input value={password} onChange={handlePasswordChange} type={showPassword ? 'text' : 'password'} placeholder="Enter your password..." />
            <button className={styles.eye} type="button" onClick={seePassword}>
              {showPassword ? <img src={closeEye} alt="closeEye" /> : <img src={openEye} alt="openEye" />}
            </button>
          </label>
          <button className={styles.submit} onClick={handleLogin}>
            Login
          </button>
          <div className={styles.desc}>New to zebra.com</div>
          <button className={styles.submit} onClick={handleRegistration}>
            Create your ZEBRA account
          </button>
        </div>
      </div>
    </div>
  )
}
