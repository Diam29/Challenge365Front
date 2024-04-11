import {  useAuth } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import styles from './PopUp.module.css'
const PopUp = () => {

  const { user, logout } = useAuth()
  console.log('user popUP', user.displayName)

  const navigate = useNavigate()
  const handlerLogout =  async () => {
    try {
      await logout()
      navigate('/')
      toast.success('Te esperamos de regreso!!')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className={styles.container}>
      {user && 
      <ul className={styles.contain__list}>
        <li className={styles.list__item}>{user.email}</li>
        <li className={styles.list__item}><button className={styles.button}  onClick={handlerLogout}>Cerrar Sesion</button></li>
      </ul>
      }
    </div>
  )
}

export default PopUp
