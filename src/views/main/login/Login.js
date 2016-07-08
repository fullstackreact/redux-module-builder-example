import React from 'react';
import styles from './login.module.css'

export const Login = (props) => {
  const authorizeTwitter =
    () => props.actions.users.loginWithTwitter()
  return (
    <div className={styles.container}>
      <button className={styles.button}
              onClick={authorizeTwitter}>
                Login with Twitter
      </button>
    </div>
  )
}

export default Login;
