
import React from 'react'
import styles from "./auth.module.css"
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'
const Forgot = () => {
  return (
    <div className={`container ${styles.auth}`}>
     <Card>
      <div className={styles.form }>
         <div className="--flex-center">
           
         </div> 
        <h2>Forgot</h2>

        <form>
    <input type="email" placeholder='Email' required name='Email' />
        <button type="submit"  className='--btn --btn-primary --btn-block '>Get reset Email</button>
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

export default Forgot
