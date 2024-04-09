import axios from 'axios';
// import { auth } from "../Firebase/FirebaseConfig";


const API_URL = 'http://localhost:3000/pay'; 

const paymentService = {

  
  async getAllPayments() {

    return axios.get(API_URL).then(response => response.data)
      
  },    
    
  async createPayment(paymentData) {
    return axios.post(`${API_URL}/`, paymentData).then(response => response.data);
  },

  async updatePayment(id, paymentData) {
    return axios.put(`${API_URL}/${id}`, paymentData).then(response => response.data);
  },

  async deletePayment(id) {
    return axios.delete(`${API_URL}/${id}`).then(response => response.data);
  },

  async getPaymentsByType(type) {
    console.log('type del front', type)
    return axios.get(`${API_URL}/type/${type}`).then(response => response.data);
  },

  async getPaymentsByRecipient(recipient) {
    return axios.get(`${API_URL}/recipient/${recipient}`).then(response => response.data);
  },

  async getPaymentsByDateRange(date) {
    console.log('date del front', date)
    return axios.get(`${API_URL}/date/${date}`).then(response => response.data);
  }

};

export default paymentService ;
