import { useState } from 'react';
import paymentService from '../../Context/PaymentContext.jsx';
import { auth } from '../../Firebase/FirebaseConfig.js'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import style from './PaymentCreate.module.css';

const PaymentCreate = () => {

  const navigate = useNavigate();

  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Usuario no autenticado');
      }
      console.log('user desde PaymentCreate', user.uid);
      const uid = user.uid;
      const newPayment = await paymentService.createPayment({
        recipient,
        amount,
        date,
        description,
        type,
        uid,
      });
      console.log('Nuevo pago creado:', newPayment);
      setRecipient('');
      setAmount('');
      setDate('');
      setDescription('');
      setType('');
      // window.history.go = '/home';
      navigate('/home');
      toast.success('¡El pago se ha registrado exitosamente!');
    } catch (error) {
      toast.error('Error al crear el pago. Por favor, inténtalo de nuevo más tarde.');
      setError('Error al crear el pago. Por favor, inténtalo de nuevo más tarde.');
    }
  };



  return (
    <div className={style.container}>
      <div className={style.contain}>
        <h2 className={style.title}>Registro de Pago</h2>
        {error && <p className={style.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label className={style.label} htmlFor="recipient">Destinatario:</label>
            <input className={style.input}
              type="text"
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          <div>
            <label className={style.label} htmlFor="amount">Monto:</label>
            <input className={style.input}
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <label className={style.label} htmlFor="date">Fecha:</label>
            <input className={style.input}
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label className={style.label} htmlFor="description">Descripción:</label>
            <textarea className={style.textarea}
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className={style.label} htmlFor="type">Tipo de Pago:</label>
            <select className={style.select}
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="" disabled>Seleccionar tipo de pago</option>
              <option value="transferencia">Transferencia</option>
              <option value="tarjeta de crédito">Tarjeta de Crédito</option>
              <option value="débito automático">Débito Automático</option>
            </select>
          </div>
          <button className={style.button} type="submit">Registrar Pago</button>
        </form>
      </div>
      <button className={style.button_return} onClick={() => window.history.back()}>Regresar</button>
    </div>

  );
}

export default PaymentCreate;

