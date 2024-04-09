import Login from '../Login/Login'
import { FaArrowCircleLeft } from "react-icons/fa";
import style from './Landing.module.css'

const Landing = () => {
  return (
    <div className={style.container}>
      <div className={style.loging}>
      <Login/>
      </div>
      <div className={style.welcome}>
      <h1 className={style.title}>Bienvenido GestordePagos.com</h1>
      <h3 className={style.subtitle}>La plataforma mas eficaz para digitalizar tus consumos</h3>
      <div className={style.subcontain}>
      <FaArrowCircleLeft className={style.icon} />
      <p className={style.text}>Ingresa para comenzar</p>
      </div>
      </div>
    </div>
  )
}

export default Landing
