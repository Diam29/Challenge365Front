import { useState,  } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import { useAuth } from '../../Context/AuthContext';
import { IoLogoGoogle } from "react-icons/io5";
import { PiUserSwitchBold } from "react-icons/pi";
import { FaCheckDouble } from "react-icons/fa";
import styles from './Login.module.css';
import { validate } from './validate'

const Login = () => {


  const navigate = useNavigate();
    const auth = useAuth();

    // const { user } = auth;

    const [registerActive, setRegisterActive] = useState(false);
    const [emailRegister, setEmailRegister] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');

    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');

    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [resetEmailSent, setResetEmailSent] = useState(false);

    const [showResetForm, setShowResetForm] = useState(false);
    // const [showLoginForm, setShowLoginForm] = useState(true);

    const [validationErrors, setValidationErrors] = useState({});




    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            await auth.resetPassword(email);
            setResetEmailSent(true);
            toast.success(`Se ha enviado la solicitud a: ${email}`)
            setError(null);
            setEmailLogin('');
            setPasswordLogin('');
            setShowResetForm(false);
        } catch (error) {
            setResetEmailSent(false);
        }
    };

    const handlerLogin = async (e) => {
        e.preventDefault();
        const errors = validate(emailLogin, passwordLogin);

        if (Object.keys(errors).length > 0) {
            console.log('Errores de validación:', errors);
            setValidationErrors(errors);
            return;
        }

        try {
            await auth.login(emailLogin, passwordLogin);
            toast.success(`Bienvenido ${emailLogin}`);
            setEmailLogin('');
            setPasswordLogin('');
            navigate('/home');
        } catch (error) {
            toast.error('Error de inicio de sesión. Por favor, inténtalo de nuevo más tarde.', error);

            if (error.code === 'auth/user-not-found') {
                toast.error = 'Usuario no encontrado. Por favor, verifica tu dirección de correo electrónico.';
            } else if (error.code === 'auth/invalid-email') {
                toast.error = 'Formato de correo electrónico incorrecto. Por favor, verifica tu dirección de correo electrónico.';
            } else if (error.code === 'auth/too-many-requests') {
                toast.error = 'Demasiados intentos de inicio de sesión fallidos. Por favor, inténtalo de nuevo más tarde.';
            } else if (error.code === 'auth/invalid-credential') {
                toast.error('Hay un error en la contraseña, intentelo de nuevo')
            } else {
                console.error('Código de error no manejado:', error.code);
                toast.error = 'Error de inicio de sesión. Por favor, inténtalo de nuevo más tarde.';
            }
        }
    }

    const handlerGoogle = async (e) => {
        e.preventDefault();
        try {
            await auth.loginWithGoogle();
            toast.success('¡Se ha logueado con éxito!', auth);
            // onCloseForm();
            navigate('/home');
        } catch (error) {
            toast.error('Error al iniciar sesión con Google');
        }
    };

    const handlerLogout = () => {
        auth.logout();
        toast.success('Ha cerrado sesión exitosamente!!')
        // onCloseForm();
        navigate('/');
    };

    const handlerRegister = (e) => {
        e.preventDefault();
        const errors = validate(emailRegister, passwordRegister);

        if (Object.keys(errors).length > 0) {
            console.log('Errores de validación:', errors);
            setValidationErrors(errors);
            return;
        }
        try {
            auth.register(emailRegister, passwordRegister);
            toast.success(`Se ha registrado, ${emailRegister}`)
            // onCloseForm();
            navigate('/home');

        } catch (error) {
            toast.error(error.message)
            throw error
        }
    };

    const showResetPasswordForm = () => {
        setShowResetForm(true);
    };


    const handleRegisterClick = () => {
      setRegisterActive(!registerActive);
    };

    const handleLoginFormClick = () => {
      if (registerActive) {
        setRegisterActive(false)
      }
    };

    return (
        <div className={styles.main}>

            {showResetForm ? (
                <div className={styles.forgot}>
                    <form className={styles.form}>
                        <label htmlFor="chk" aria-hidden="true">
                            Olvidó su Contraseña?
                        </label>
                        <p className={styles.text__forgot}>Ingrese su correo electrónico para restablecer la contraseña:</p>
                        <input
                            className={styles.input}
                            type="email"
                            value={email}
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className={styles.button__reset} type="submit" onClick={handleResetPassword}>
                            Restablecer Contraseña
                        </button>

                    </form>
                </div>
            ) : (
                <div className={styles.login} onClick={handleLoginFormClick}>
                    <form className={styles.form}>
                        <PiUserSwitchBold className={styles.icons} />
                        <input
                            className={styles.input}
                            type="email"
                            name="email"
                            placeholder="Email"
                            autoComplete="email"
                            required=""
                            onChange={(e) => setEmailLogin(e.target.value)}
                        />
                        <input
                            className={styles.input}
                            type="password"
                            name="password"
                            placeholder="Password"
                            autoComplete="new-password"
                            required=""
                            onChange={(e) => setPasswordLogin(e.target.value)}
                        />
                        {validationErrors && (
                            <div className={styles.error__message}>
                                {Object.values(validationErrors).map((error, index) => (
                                    <p key={index}>{error}</p>
                                ))}
                            </div>
                        )}
                        <div className={styles.container__buttons}>
                            <button className={styles.button__form} onClick={handlerLogin}>
                            <FaCheckDouble  className={styles.check__icon} />
                            </button>
                            <button className={styles.button__form} onClick={handlerGoogle}>
                                <IoLogoGoogle className={styles.google__icon} />
                            </button>
                        </div>
                        <button className={styles.button__reset} onClick={showResetPasswordForm}>Olvidó su contraseña?</button>

                        <button className={styles.button__form} onClick={handlerLogout}>
                            Cerrar Sesion
                        </button>
                    </form>
                </div>

            )}
              <div className={`${styles.register} ${registerActive ? styles.active : ''}`} onClick={handleRegisterClick}>
            <div className={styles.register}>
                <form className='form'>

                    <label htmlFor="chk" aria-hidden="true">
                        Register
                    </label>
                    <input
                        className={styles.input__register}
                        type="email"
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                        required=""
                        onChange={(e) => setEmailRegister(e.target.value)}
                    />
                    <input
                        className={styles.input__register}
                        type="password"
                        name="password"
                        placeholder="Password"
                        required=""
                        autoComplete="new-password"
                        onChange={(e) => setPasswordRegister(e.target.value)}
                    />
                    {validationErrors && (
                        <div className={styles.error__message}>
                            {Object.values(validationErrors).map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </div>
                    )}
                    <button className={styles.button__form} onClick={handlerRegister}>
                        Registro
                    </button>
                </form>
            </div>
          </div>
        </div>
    );
};

export default Login;

