import NavBar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer.jsx';
import paymentService from '../../Context/PaymentContext';
import PutPayment from '../FormsPayments/PutPayment';
import PaymentFilters from '../Filter/PaymentFilters.jsx';
import { FaTrash } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { toast } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import styles from './Home.module.css';

const Home = () => {

  const { user } = useAuth();

  const [payments, setPayments] = useState([]);
  const [editingPaymentId, setEditingPaymentId] = useState(null);
  const [filteredPayments, setFilteredPayments] = useState([]);

  useEffect(() => {
    const loadingPayments = async () => {
  
      try {
        if(user && user.uid){
          const response = await paymentService.getAllPayments(user.uid);
          console.log('soy uid de home', user.uid, user.email)
          setPayments(response);
        }else{
          console.error('El usuario o su ID no están definidos.');
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadingPayments();
  }, [user]);

  const handleDeletePayment = async (id) => {
    try {
      await paymentService.deletePayment(id);
      setPayments(payments.filter(payment => payment.id !== id));
      toast.success('¡El pago se ha eliminado exitosamente!');
    } catch (error) {
      toast.error('Error al eliminar el pago. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  const handleEditPayment = (id) => {
    setEditingPaymentId(id);
  };

  const handleSubmitEditPayment = async (id, editedPayment) => {
    try {
      const response = await paymentService.updatePayment(id, editedPayment);
      setPayments(payments.map(payment => payment.id === id ? response : payment));
      setEditingPaymentId(null);
      toast.success('¡El pago se ha actualizado exitosamente!');
    } catch (error) {
      toast.error('Error al actualizar el pago. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  const handleCancelEdit = () => {
    setEditingPaymentId(null);
  };

  const applyFilters = async (filters) => {
    try {
      let filtered = [];

      if (filters.type) {
        const paymentsByType = await paymentService.getPaymentsByType(filters.type);
        filtered = paymentsByType;
      }

      if (filters.recipient) {
        const paymentsByRecipient = await paymentService.getPaymentsByRecipient(filters.recipient);
        if (filtered.length === 0) {
          filtered = paymentsByRecipient;
        } else {
          filtered = filtered.filter(payment => paymentsByRecipient.some(p => p.id === payment.id));
        }
      }

      if (filters.date) {
        const paymentsByDate = await paymentService.getPaymentsByDateRange(filters.date);
        if (filtered.length === 0) {
          filtered = paymentsByDate;
        } else {
          filtered = filtered.filter(payment => paymentsByDate.some(p => p.id === payment.id));
        }
      }

      setFilteredPayments(filtered);
    } catch (error) {
      console.error('Error al aplicar los filtros:', error);
    }
  };

  return (
    <div className={styles.container}>
      <NavBar className={styles.navbar}/>
      <div className={styles.frame}>
        <h1 className={styles.title}>BIENVENIDO A GESTORdePAGOS.com 👋 </h1>
        <div className={styles.actionContainer}>
          <Link to="/payment" className={styles.link}>Cargar Nuevos Pagos</Link>

          <div className={styles.contain__filter}>
            <h2 className={styles.subtitle}>Filtrar pagos</h2>
            <PaymentFilters applyFilters={applyFilters} className={styles.filters__box}/>
          </div>
        </div>
        <div className={styles.pay__list}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th>Fecha</th>
                <th >Destinatario</th>
                <th>Importe</th>
                <th>Descripción</th>
                <th>Tipo de Pago</th>
                <th>Editar</th>
                <th>Borrar</th>
              </tr>
            </thead>
            <tbody>
              {(filteredPayments.length > 0 ? filteredPayments : payments).map(payment => (
                <tr key={payment.id}>
                  <td>{new Date(payment.date).toLocaleDateString('es-ES')}</td>
                  <td>{payment.recipient}</td>
                  <td>${payment.amount}</td>
                  <td>{payment.description}</td>
                  <td>{payment.type}</td>
                  <td>
                    <button className={styles.btn__icon} onClick={() => handleEditPayment(payment.id)}><MdEdit className={styles.icon} /></button>
                  </td>
                  <td>
                    <button className={styles.btn__icon} onClick={() => handleDeletePayment(payment.id)}><FaTrash  className={styles.icon} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {editingPaymentId && (
            <PutPayment
              payment={payments.find(payment => payment.id === editingPaymentId)}
              onSubmit={(editedPayment) => handleSubmitEditPayment(editingPaymentId, editedPayment)}
              onCancel={handleCancelEdit}
            />
          )}
        </div>
      </div>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  )
}

export default Home;
