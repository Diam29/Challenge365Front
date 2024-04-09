import { Link } from 'react-router-dom';
import { BsFillPiggyBankFill } from "react-icons/bs";
import { useAuth } from '../../Context/AuthContext';
import { useState, useEffect } from 'react';
import styles from './NavBar.module.css';

const Navbar = () => {
    const { user, logout } = useAuth();
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

    const handleLogout = async () => {
        try {
            await logout();
            // Redireccionar al usuario a la página principal después de cerrar sesión
            window.location.href = '/';
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const handleUserPhotoClick = () => {
        setShowLogoutButton(!showLogoutButton);
    };

    return (
        <nav className={styles.container_fluid}>
            <div className={styles.container__box}>
                <Link to='/' className={styles.link__logo}>
                    <BsFillPiggyBankFill  className={styles.rounded_pill}/>
                    <span className={styles.navbar__text} >Challenge 365 Diamela Villalba</span>
                </Link>
                {user && (
                    <div className={styles.user__info} onClick={handleUserPhotoClick}>
                        {userPhoto ? (
                            <img src={userPhoto} alt="User" className={styles.button__icon} />
                        ) : (
                            <span className={styles.icon__inicio}>{userInitials}</span>
                        )}
                        {showLogoutButton && <button className={styles.sign_out__button} onClick={handleLogout}>Cerrar sesión</button>}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;



