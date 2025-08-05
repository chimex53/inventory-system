
import React from 'react'
import styles from "./auth.module.css"
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'
const Register = () => {
  return (
    <div className={`container ${styles.auth}`}>
     <Card>
      <div className={styles.form }>
         <div className="--flex-center">
           
         </div>
        <h2>Register</h2>
        <form>  
    <input type="text" placeholder='name' required name='Name' />
    <input type="email" placeholder='Email' required name='Email' />
    <input type="password" placeholder='Password' name='password'  required/>
    <input type="password" placeholder=' confirm Password' name='password'  required/>
        <button type="submit"  className='--btn --btn-primary --btn-block '>Register</button>
        </form> 
        <span className={styles.register}>
          <Link to="/">Home</Link>
          <p>&nbsp; Already have an account ? &nbsp;</p>
          <Link to="/login">Login</Link>
        </span> 
      </div>
     </Card>
    </div>
  )
}

export default Register
