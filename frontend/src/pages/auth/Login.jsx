
import React from 'react'
import styles from "./auth.module.css"
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'
const Login = () => {
  return (
    <div className={`container ${styles.auth}`}>
     <Card>
      <div className={styles.form }>
         <div className="--flex-center">
           
         </div>
        <h2>Login</h2>

        <form>
    <input type="text" placeholder='Email' required name='Email' />
    <input type="password" placeholder='Password' name='password'  required/>
        <button type="submit"  className='--btn --btn-primary --btn-block '>Login</button>
        </form> 
        <Link to="/forgot">Forgot Password</Link>
        <span className={styles.register}>
          <Link to="/">Home</Link>
          <p>&nbsp; Don't have an account? &nbsp;</p>
          <Link to="/register">Register</Link>
        </span> 
      </div>
     </Card>
    </div>
  )
}

export default Login
