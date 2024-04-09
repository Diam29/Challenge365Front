import { FaGithub } from "react-icons/fa";
import { FaRegRegistered } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import styles from "./Footer.module.css";
const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contain_icons}> 
<span className={styles.icon}><FaGithub /> </span>  <span className={styles.icon}><IoLogoWhatsapp /> </span>  

      </div>

       <h3 className={styles.copyright}>copyright <FaRegRegistered />  2024 - DIAMELA VILLALBA</h3>
    </div>
  )
}

export default Footer
