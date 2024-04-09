import { FaGithub } from "react-icons/fa";
import { FaRegRegistered } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
const Footer = () => {

  const handleWhatsappClick = () => {
    const phoneNumber = '+5492234546521';
    const message = '¡Hola! ¿Cómo estás?';
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };
  return (
    <div className={styles.container}>
      <div className={styles.contain_icons}>
        <Link href='https://github.com/Diam29' target="_blank" className={styles.icon}><FaGithub /></Link>
        <Link href={'https://api.whatsapp.com/send?phone=5492234546521&text=Hola te escribo desde Challenge365b!!'} target="_blank" className={styles.icon} onClick={handleWhatsappClick}><IoLogoWhatsapp /> </Link>

      </div>

      <h3 className={styles.copyright}>copyright <FaRegRegistered />  2024 - DIAMELA VILLALBA</h3>
    </div>
  )
}

export default Footer
