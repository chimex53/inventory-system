
import React from 'react'
import styles from "./auth.module.css"
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'
const Reset= () => {
  return (
    <div className={`container ${styles.auth}`}>
     <Card>
      <div className={styles.form }>
         <div className="--flex-center">
           
         </div> 
        <h2>Reset Password</h2>

        <form>
    <input type="password" placeholder=' New password' required name='password' />
    <input type="password" placeholder='confirm New password' required name='password' />
        <button type="submit"  className='--btn --btn-primary --btn-block '>Reset Password </button>
           <div className={styles.links}>
          <p> 
          <Link to="/">Home</Link> 
          </p>
          <p>
            <Link to="/login ">Login</Link>
          </p>
        </div> 
        </form> 
      </div>
     </Card>
    </div>
  )
}

export default Reset
