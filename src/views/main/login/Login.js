import React from 'react';
import styles from './login.module.css'
import classnames from 'classnames'

export const Login = (props) => {
  const authorizeTwitter =
    () => props.actions.users.loginWithTwitter()

  return (
    <div className='ui middle aligned center aligned grid'>
      <div className={classnames(['column', styles.loginColumn])}>

          <div className="ui message">
            <p>This app is a demo for the blog post <a href="#">Better Redux with Redux Modules</a></p>

            <p>When you authenticate with Twitter below we will use the token to
            show you a demo app which shows a live stream of tweets.</p>
          </div>

          <form className="ui large form">
            <div className="ui stacked segment">

              <div className="ui fluid large pink submit button"
                   onClick={authorizeTwitter}
              >Login with Twitter</div>
            </div>
          </form>
      </div>
    </div>
  )
}

export default Login;
