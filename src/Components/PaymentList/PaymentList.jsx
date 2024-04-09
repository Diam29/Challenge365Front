import { useState, useEffect } from 'react';
import { paymentService } from '../../Context/PaymentContext.jsx';
import style from './PaymentList.module.css';
const PaymentsList = () => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPayments() {
      try {
        const paymentsData = await paymentService.getAllPayments();
        setPayments(paymentsData);
      } catch (error) {
        setError('Error al obtener pagos. Inténtalo de nuevo más tarde.');
      }
    }

    fetchPayments();
  }, []);

  return (
    <div className={style.container}>
      <h1 className={style.title}>Lista de Pagos</h1>
      {error && <p>{error}</p>}
      <ul className={style.list}>
        {payments.map((payment) => (
          <li className={style.listItem} key={payment.id}>{payment.amount} - {payment.recipient}</li>
        ))}
      </ul>
    </div>
  );
}

export default PaymentsList;
