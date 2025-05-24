import React, { useState } from 'react';
import styles from './Products.module.css';
import api from '../../services/api';

const ProductCard = ({ product, editingProduct, setEditingProduct, onProductUpdated, onProductDeleted }) => {
    const [updatedName, setUpdatedName] = useState(product.name);
    const [updatedDescription, setUpdatedDescription] = useState(product.description);
    const [updatedPrice, setUpdatedPrice] = useState(product.price);

    const handleUpdate = () => {
        api.put(`/Product/${product.id}`, {
            id: product.id,
            name: updatedName,
            description: updatedDescription,
            price: parseFloat(updatedPrice),
            categoryId: product.category?.id || product.categoryId || 1
        }).then(() => {
            onProductUpdated();
            setEditingProduct(null);
        }).catch((err) => console.log("PUT hatası:", err));
    };

    if (editingProduct?.id === product.id) {
        return (
            <div className={styles.productCard}>
                <div className={styles.editForm}>
                    <input
                        type="text"
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                        placeholder="Name"
                    />
                    <textarea
                        value={updatedDescription}
                        onChange={(e) => setUpdatedDescription(e.target.value)}
                        placeholder="Description"
                    />
                    <input
                        type="number"
                        value={updatedPrice}
                        onChange={(e) => setUpdatedPrice(e.target.value)}
                        placeholder="Price"
                    />
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setEditingProduct(null)}>Cancel</button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.productCard}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className={styles.price}>${product.price}</p>
            <button onClick={() => setEditingProduct(product)}>Edit</button>
            <button onClick={() => api.delete(`/Product/${product.id}`).then(onProductDeleted)}>
                Delete
            </button>
        </div>
    );
};

export default ProductCard;