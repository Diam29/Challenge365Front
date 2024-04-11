import { Link } from 'react-router-dom';
import { BsFillPiggyBankFill } from "react-icons/bs";
import { useAuth } from '../../Context/AuthContext';
import { useState, useEffect } from 'react';
import PopUp from '../../Views/ModalPopUp/PopUp';
import styles from './NavBar.module.css';

const Navbar = () => {
    const { user } = useAuth();

    const [userPhoto, setUserPhoto] = useState(null);
    const [userInitials, setUserInitials] = useState('');
    const [showLogoutButton, setShowLogoutButton] = useState(false);



    useEffect(() => {
        if (user) {
            const isEmailAuthProvider = user.providerData.some((provider) => provider.providerId === 'password');

            if (isEmailAuthProvider) {
                if (user.email) {
                    const [firstInitial, secondInitial] = user.email.split('@')[0].split('');
                    setUserInitials(`${firstInitial.toUpperCase()}${secondInitial ? secondInitial.toUpperCase() : ''}`);
                } else {
                    setUserInitials('');
                }
                const photoURL = user.providerData[0].photoURL;
                setUserPhoto(photoURL);
            } else {
                const googleProvider = 'google.com';
                const isGoogleAuthProvider = user.providerData.some((provider) => provider.providerId === googleProvider);

                if (isGoogleAuthProvider) {
                    const photoURL = user.providerData[0].photoURL;
                    setUserPhoto(photoURL);
                } else {
                    setUserPhoto(null);
                }
            }
        }
    }, [user]);

    const handleUserPhotoClick = () => {
        setShowLogoutButton(!showLogoutButton);
    };

    return (
        <nav className={styles.container}>
            <div className={styles.container__box}>
                <Link to='/' className={styles.link__logo}>
                    <BsFillPiggyBankFill  className={styles.rounded_pill}/> 
                </Link>
                    <p className={styles.navbar__text} >GESTOR DE PAGOS - DV</p>
                {user && (
                    <div className={styles.user__info} onClick={handleUserPhotoClick}>
                        {userPhoto ? (
                            <img src={userPhoto} alt="User" className={styles.button__icon} />
                        ) : (
                            <span className={styles.icon__inicio}>{userInitials}</span>
                        )}
                        {showLogoutButton && <PopUp />}
                    </div>
                )}
            </div>
        </nav>
    );
}


export default Navbar;



