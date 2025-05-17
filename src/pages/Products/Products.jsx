

// import React, { useEffect, useState } from 'react'
// import styles from './Products.module.css'
// import api from '../../services/api'

// const Products = () => {
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
//                         <button onClick={() => startEditing(product)}>edit</button>
//                         <button onClick={() => handleDelete(product.id)}>delete</button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default Products


import React, { useEffect, useState } from 'react'
import styles from './Products.module.css'
import api from '../../services/api'

const Products = () => {
    const [products, setProducts] = useState([])
    const [editingProduct, setEditingProduct] = useState(null)
    const [updatedName, setUpdatedName] = useState('')
    const [updatedDescription, setUpdatedDescription] = useState('')
    const [updatedPrice, setUpdatedPrice] = useState('')

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = () => {
        api.get(`/Product`)
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err))
    }

    const handleDelete = (id) => {
        api.delete(`/Product/${id}`)
            .then(() => fetchProducts())
            .catch((err) => console.log(err))
    }

    const startEditing = (product) => {
        setEditingProduct(product)
        setUpdatedName(product.name)
        setUpdatedDescription(product.description)
        setUpdatedPrice(product.price)
    }

    const cancelEditing = () => {
        setEditingProduct(null)
    }

const handleUpdate = () => {
    const updatedProduct = {
        id: editingProduct.id,
        name: updatedName,
        description: updatedDescription,
        price: parseFloat(updatedPrice),
        categoryId: editingProduct.categoryId,
    };

    console.log('Gönderilen veri:', updatedProduct);
    
    api.put(`/Product/${editingProduct.id}`, updatedProduct)
        .then(() => {
            fetchProducts();
            setEditingProduct(null);
        })
        .catch((err) => {
            console.error('Güncelleme hatası:', err.response ? err.response.data : err.message);
        });
};



    return (
        <div className={styles.productContainer}>
            <h2>Products</h2>
            <div className={styles.productGrid}>
                {products.map((product) => (
                    <div className={styles.productCard} key={product.id}>
                        {editingProduct?.id === product.id ? (
                            <>
                                <input
                                    type="text"
                                    value={updatedName}
                                    onChange={(e) => setUpdatedName(e.target.value)}
                                />
                                <textarea
                                    value={updatedDescription}
                                    onChange={(e) => setUpdatedDescription(e.target.value)}
                                />
                                <input
                                    type="number"
                                    value={updatedPrice}
                                    onChange={(e) => setUpdatedPrice(e.target.value)}
                                />
                                <button onClick={handleUpdate}>Save</button>
                                <button onClick={cancelEditing}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p className={styles.price}>${product.price}</p>
                                <button onClick={() => startEditing(product)}>Edit</button>
                                <button onClick={() => handleDelete(product.id)}>Delete</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products
