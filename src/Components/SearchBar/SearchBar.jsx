// // import { useDispatch } from 'react-redux';
// import './SearchBar.css';
// import { FaMagnifyingGlass } from 'react-icons/fa6'
// // import { getServicesByName } from '../../Redux/actions';
// import { useState } from 'react';

// const SearchBar = () => {
//     // const dispatch = useDispatch()

//     const [serviceByName, setServiceByName] = useState('')

//     const handleSubmit = (event) => {
//         event.preventDefault()
//         // dispatch(getServicesByName(serviceByName))
//         setServiceByName('')
//     }

//     const handleChange = (event) => {
//         setServiceByName(event.target.value)
//     }

//     return (
//         <form onSubmit={handleSubmit}>
//             <div className="searchBox">

//                 <input
//                     id='searchServices'
//                     className="searchInput"
//                     type="search"
//                     placeholder="Busca tu curso"
//                     value={serviceByName}
//                     onChange={handleChange}
//                 />
//                 <button className="searchButton"
//                     type='submit'
//                     onClick={handleSubmit}
//                 >
//                     <FaMagnifyingGlass />
//                 </button>

//             </div>
//         </form>

//     )
// }

// export default SearchBar

import './SearchBar.css';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { useState } from 'react';
import paymentService from '../../Context/PaymentContext'

const SearchBar = () => {
    const [recipient, setRecipient] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const payments = await paymentService.getPaymentsByRecipient(recipient);
            console.log('Pagos por destinatario:', payments);
            setRecipient('');
        } catch (error) {
            console.error('Error al buscar pagos por destinatario:', error);
        }
    };

    const handleChange = (event) => {
        setRecipient(event.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="searchBox">
                <input
                    id='searchRecipient'
                    className="searchInput"
                    type="text"
                    placeholder="Buscar por destinatario"
                    value={recipient}
                    onChange={handleChange}
                />
                <button className="searchButton" type='submit'>
                    <FaMagnifyingGlass />
                </button>
            </div>
        </form>
    );
};

export default SearchBar;



