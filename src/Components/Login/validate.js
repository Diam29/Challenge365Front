export const validate = (email, password) => {
  let errors = {};

  if (!email) {
      errors.email = 'El campo de correo electrónico es obligatorio';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'El formato de correo electrónico es incorrecto';
  }

  if (!password) {
      errors.password = 'El campo de contraseña es obligatorio';
  } else if (password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
  }

  return errors;
};
