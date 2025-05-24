import React from 'react';
import styles from './Products.module.css';
import ProductCard from './ProductCard';

const ProductList = ({ products, editingProduct, setEditingProduct, onProductUpdated, onProductDeleted }) => {
    return (
        <div className={styles.productGrid}>
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    editingProduct={editingProduct}
                    setEditingProduct={setEditingProduct}
                    onProductUpdated={onProductUpdated}
                    onProductDeleted={onProductDeleted}
                />
            ))}
        </div>
    );
};

export default ProductList;