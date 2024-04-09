import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './PaymentFilters.module.css';

const PaymentFilters = ({ applyFilters }) => {
  const [filters, setFilters] = useState({
    date: '',
    recipient: '',
    type: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleApplyFilters = () => {
    applyFilters(filters);
  };

  const handleClearFilters = () => {
    setFilters({
      date: '',
      recipient: '',
      type: ''
    });
    applyFilters({
      date: '',
      recipient: '',
      type: ''
    });
  };

  return (
    <div className={styles.container}>
      <input className={styles.input_filter} type="date" name="date" placeholder='Fecha' value={filters.date} onChange={handleChange} />
      <input className={styles.input_filter} type="text" name="recipient" placeholder='Destinatario' value={filters.recipient} onChange={handleChange} />
      <input className={styles.input_filter} type="text" name="type" placeholder='Tipo de Pago' value={filters.type} onChange={handleChange} />
      <button className={styles.button_filterOk} onClick={handleApplyFilters}>Aplicar Filtros</button>
      <button className={styles.button_filterClean} onClick={handleClearFilters}>Limpiar Filtros</button>
    </div>
  );
};

PaymentFilters.propTypes = {
  applyFilters: PropTypes.func.isRequired
};

export default PaymentFilters;
