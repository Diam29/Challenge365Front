import axios from 'axios';
// import { auth } from "../Firebase/FirebaseConfig";


// const API_URL = 'http://localhost:4000/pay'; 
const API_URL = 'https://challenge365.onrender.com/pay'

const paymentService = {

  
  async getAllPayments(uid) {
    return await axios.get(`${API_URL}/${uid}`).then(response => response.data)
  },    
    
  async createPayment(paymentData) {
    console.log('soy el axios payment', paymentData)
    return await axios.post(`${API_URL}/`,paymentData).then(response => response.data);
  },

  async updatePayment(id, paymentData) {
    return await axios.put(`${API_URL}/${id}`, paymentData).then(response => response.data);
  },

  async deletePayment(id) {
    return await axios.delete(`${API_URL}/${id}`).then(response => response.data);
  },

  async getPaymentsByType(type) {
    console.log('type del front', type)
    return await axios.get(`${API_URL}/type/${type}`).then(response => response.data);
  },

  async getPaymentsByRecipient(recipient) {
    return await axios.get(`${API_URL}/recipient/${recipient}`).then(response => response.data);
  },

  async getPaymentsByDateRange(date) {
    console.log('date del front', date)
    return await axios.get(`${API_URL}/date/${date}`).then(response => response.data);
  }

};

export default paymentService ;
