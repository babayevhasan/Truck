import React, { useState, useEffect } from 'react';
import styles from './Products.module.css';
import api from '../../services/api';

const AddProductForm = ({ categories, onProductAdded }) => {
    const [newProductName, setNewProductName] = useState('');
    const [newProductDescription, setNewProductDescription] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [selectedParentCategoryId, setSelectedParentCategoryId] = useState('');
    const [selectedChildCategoryId, setSelectedChildCategoryId] = useState('');
    const [childCategories, setChildCategories] = useState([]);

    const parentCategoriesWithSub = categories.filter(cat => cat.subCategories && cat.subCategories.length > 0);

    useEffect(() => {
        if (selectedParentCategoryId) {
            const parentCat = categories.find(cat => cat.id === parseInt(selectedParentCategoryId));
            setChildCategories(parentCat?.subCategories || []);
            setSelectedChildCategoryId('');
        } else {
            setChildCategories([]);
            setSelectedChildCategoryId('');
        }
    }, [selectedParentCategoryId, categories]);

    const handleAddProduct = () => {
        if (!selectedChildCategoryId) {
            alert('Please select a category.');
            return;
        }

        api.post('/Product', {
            name: newProductName,
            description: newProductDescription,
            price: parseFloat(newProductPrice),
            categoryId: parseInt(selectedChildCategoryId),
        }).then(() => {
            onProductAdded();
            resetForm();
        }).catch((err) => console.log(err));
    };

    const resetForm = () => {
        setNewProductName('');
        setNewProductDescription('');
        setNewProductPrice('');
        setSelectedParentCategoryId('');
        setSelectedChildCategoryId('');
    };

    return (
        <div className={styles.addProductForm}>
            <h3>Add Product</h3>
            <input
                type="text"
                placeholder="Name"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
            />
            <textarea
                placeholder="Description"
                value={newProductDescription}
                onChange={(e) => setNewProductDescription(e.target.value)}
            />
            <input
                type="number"
                placeholder="Price"
                value={newProductPrice}
                onChange={(e) => setNewProductPrice(e.target.value)}
            />

            <select
                value={selectedParentCategoryId}
                onChange={(e) => setSelectedParentCategoryId(e.target.value)}
            >
                <option value="">Select Category</option>
                {parentCategoriesWithSub.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
            </select>

            {childCategories.length > 0 && (
                <select
                    value={selectedChildCategoryId}
                    onChange={(e) => setSelectedChildCategoryId(e.target.value)}
                >
                    <option value="">Select Child Category</option>
                    {childCategories.map(subCat => (
                        <option key={subCat.id} value={subCat.id}>{subCat.name}</option>
                    ))}
                </select>
            )}

            <button onClick={handleAddProduct}>Add Product</button>
        </div>
    );
};

export default AddProductForm;