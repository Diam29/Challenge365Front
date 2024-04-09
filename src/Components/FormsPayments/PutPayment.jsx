import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './PutPayment.module.css'
const PutPayment = ({ payment, onSubmit, onCancel }) => {

  const [editedPayment, setEditedPayment] = useState({
    recipient: payment.recipient,
    amount: payment.amount,
    date: payment.date,
    description: payment.description,
    type: payment.type,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(editedPayment);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Editor de Pagos</h1>
      <form className={styles.form__pay} onSubmit={handleSubmit}>
        <input
          className={styles.input_pay}
          type="text"
          value={editedPayment.recipient}
          onChange={(e) => setEditedPayment({ ...editedPayment, recipient: e.target.value })}
        />
        <input
          className={styles.input_pay}
          type="number"
          value={editedPayment.amount}
          onChange={(e) => setEditedPayment({ ...editedPayment, amount: e.target.value })}
        />
        <input
          className={styles.input_pay}
          type="date"
          value={editedPayment.date}
          onChange={(e) => setEditedPayment({ ...editedPayment, date: e.target.value })}
        />
          <textarea 
            className={styles.textarea_pay}
            type="text"
            id="description"
            value={editedPayment.description}
            onChange={(e) => setEditedPayment({ ...editedPayment, description: e.target.value })}
          />
          <div>
        <select 
        className={styles.select_pay}
            id="type"
            value={editedPayment.type}
            onChange={(e) => setEditedPayment({ ...editedPayment, type: e.target.value })}
          >
            <option value="">Seleccionar tipo de pago</option>
            <option value="transferencia">Transferencia</option>
            <option value="tarjeta de crédito">Tarjeta de Crédito</option>
            <option value="débito automático">Débito Automático</option>
          </select>
        </div>
        
        <button className={styles.button_pay_save} type="submit">Guardar</button>
        <button className={styles.button_pay_cancel} type="button" onClick={onCancel}>Cancelar</button>
      </form>
    </div>
  );
};

PutPayment.propTypes = {
  payment: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default PutPayment

