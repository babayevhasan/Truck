// import React, { useEffect, useState } from 'react'
// import styles from './Transactions.module.css'
// import api from '../../services/api'

// const Transactions = () => {
//     const [products, setProducts] = useState([])

//     useEffect(() => {
//         api.get(`/Product`)
//             .then((res) => {
//                 console.log(res.data)
//                 setProducts(res.data)
//             })
//             .catch((err) => console.log(err))
//     }, [])

//     return (
//         <div className={styles.productContainer}>
//             <h2>Products</h2>
//             <div className={styles.productGrid}>
//                 {products.map((product) => (
//                     <div className={styles.productCard} key={product.id}>
//                         <h3>{product.name}</h3>
//                         <p>{product.description}</p>
//                         <p className={styles.price}>${product.price}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default Transactions

