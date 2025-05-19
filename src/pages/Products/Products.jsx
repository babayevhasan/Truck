// import React, { useEffect, useState } from 'react';
// import styles from './Products.module.css';
// import Header from "../FreightAnnouncements/Header";
// import api from '../../services/api';

// const Products = () => {
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [editingProduct, setEditingProduct] = useState(null);
//     const [updatedName, setUpdatedName] = useState('');
//     const [updatedDescription, setUpdatedDescription] = useState('');
//     const [updatedPrice, setUpdatedPrice] = useState('');

//     const [newProductName, setNewProductName] = useState('');
//     const [newProductDescription, setNewProductDescription] = useState('');
//     const [newProductPrice, setNewProductPrice] = useState('');
//     const [newProductCategoryId, setNewProductCategoryId] = useState('');

//     useEffect(() => {
//         fetchProducts();
//         fetchCategories();
//     }, []);

//     const fetchProducts = () => {
//         api.get(`/Product`)
//             .then((res) => setProducts(res.data))
//             .catch((err) => console.log(err));
//     };

//     const fetchCategories = () => {
//         api.get(`/Category`)
//             .then((res) => setCategories(res.data))
//             .catch((err) => console.log(err));
//     };

//     const handleDelete = (id) => {
//         api.delete(`/Product/${id}`)
//             .then(() => {
//                 fetchProducts();
//             })
//             .catch((err) => console.log(err));
//     };

//     const startEditing = (product) => {
//         setEditingProduct(product);
//         setUpdatedName(product.name);
//         setUpdatedDescription(product.description);
//         setUpdatedPrice(product.price);
//     };

//     const cancelEditing = () => {
//         setEditingProduct(null);
//     };

//     const handleUpdate = () => {
//         if (!editingProduct) return;

//         const updatedProduct = {
//             ...editingProduct,
//             name: updatedName,
//             description: updatedDescription,
//             price: parseFloat(updatedPrice),
//             categoryId: editingProduct.categoryId || editingProduct.category?.id || 1
//         };

//         api.put(`/Product/${editingProduct.id}`, updatedProduct)
//             .then(() => {
//                 fetchProducts();
//                 setEditingProduct(null);
//             })
//             .catch((err) => console.log("API HATASI:", err));
//     };


//     const handleAddProduct = () => {
//         const newProduct = {
//             name: newProductName,
//             description: newProductDescription,
//             price: parseFloat(newProductPrice),
//             categoryId: parseInt(newProductCategoryId),
//         };

//         api.post('/Product', newProduct)
//             .then(() => {
//                 fetchProducts();
//                 setNewProductName('');
//                 setNewProductDescription('');
//                 setNewProductPrice('');
//                 setNewProductCategoryId('');
//             })
//             .catch((err) => console.log(err));
//     };
//     return (
//         <>
//             <Header />
//             <div className={styles.productContainer}>
//                 <h2>Products</h2>

//                 <div className={styles.addProductForm}>
//                     <h3>Add Product</h3>
//                     <input type="text" placeholder="Name" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} />
//                     <textarea placeholder="Description" value={newProductDescription} onChange={(e) => setNewProductDescription(e.target.value)} />
//                     <input type="number" placeholder="Price" value={newProductPrice} onChange={(e) => setNewProductPrice(e.target.value)} />

//                     <select value={newProductCategoryId} onChange={(e) => setNewProductCategoryId(e.target.value)}>
//                         <option value="">Select Category</option>
//                         {categories.map((cat) => (
//                             <option key={cat.id} value={cat.id}>{cat.name}</option>
//                         ))}
//                     </select>

//                     <button onClick={handleAddProduct}>Add Product</button>
//                 </div>

//                 <div className={styles.productGrid}>
//                     {products.map((product) => (
//                         <div className={styles.productCard} key={product.id}>
//                             {editingProduct?.id === product.id ? (
//                                 <div className={styles.editForm}>
//                                     <input
//                                         type="text"
//                                         value={updatedName}
//                                         onChange={(e) => setUpdatedName(e.target.value)}
//                                         placeholder="Name"
//                                     />
//                                     <textarea
//                                         value={updatedDescription}
//                                         onChange={(e) => setUpdatedDescription(e.target.value)}
//                                         placeholder="Description"
//                                     />
//                                     <input
//                                         type="number"
//                                         value={updatedPrice}
//                                         onChange={(e) => setUpdatedPrice(e.target.value)}
//                                         placeholder="Price"
//                                     />
//                                     <button onClick={handleUpdate}>Save</button>
//                                     <button onClick={cancelEditing}>Cancel</button>
//                                 </div>
//                             ) : (
//                                 <>
//                                     <h3>{product.name}</h3>
//                                     <p>{product.description}</p>
//                                     <p className={styles.price}>${product.price}</p>
//                                     <button onClick={() => startEditing(product)}>Edit</button>
//                                     <button onClick={() => handleDelete(product.id)}>Delete</button>
//                                 </>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </>
//     );
// };
// export default Products;





import React, { useEffect, useState } from 'react';
import styles from './Products.module.css';
import Header from "../FreightAnnouncements/Header";
import api from '../../services/api';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');
    const [updatedPrice, setUpdatedPrice] = useState('');

    const [newProductName, setNewProductName] = useState('');
    const [newProductDescription, setNewProductDescription] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');

    const [selectedParentCategoryId, setSelectedParentCategoryId] = useState('');
    const [selectedChildCategoryId, setSelectedChildCategoryId] = useState('');

    const [childCategories, setChildCategories] = useState([]);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = () => {
        api.get(`/Product`)
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err));
    };

    const fetchCategories = () => {
        api.get(`/Category`)
            .then((res) => setCategories(res.data))
            .catch((err) => console.log(err));
    };

    const parentCategoriesWithSub = categories.filter(cat => cat.subCategories && cat.subCategories.length > 0);

    useEffect(() => {
        if (selectedParentCategoryId) {
            const parentCat = categories.find(cat => cat.id === parseInt(selectedParentCategoryId));
            if (parentCat && parentCat.subCategories) {
                setChildCategories(parentCat.subCategories);
                setSelectedChildCategoryId('');
            } else {
                setChildCategories([]);
                setSelectedChildCategoryId('');
            }
        } else {
            setChildCategories([]);
            setSelectedChildCategoryId('');
        }
    }, [selectedParentCategoryId, categories]);

    const handleAddProduct = () => {
        if (!selectedChildCategoryId) {
            alert('Lütfen alt kategori seçiniz!');
            return;
        }

        const newProduct = {
            name: newProductName,
            description: newProductDescription,
            price: parseFloat(newProductPrice),
            categoryId: parseInt(selectedChildCategoryId),
        };

        api.post('/Product', newProduct)
            .then(() => {
                fetchProducts();
                setNewProductName('');
                setNewProductDescription('');
                setNewProductPrice('');
                setSelectedParentCategoryId('');
                setSelectedChildCategoryId('');
            })
            .catch((err) => console.log(err));
    };

    const handleDelete = (id) => {
        api.delete(`/Product/${id}`)
            .then(() => {
                fetchProducts();
            })
            .catch((err) => console.log(err));
    };

    const startEditing = (product) => {
        setEditingProduct(product);
        setUpdatedName(product.name);
        setUpdatedDescription(product.description);
        setUpdatedPrice(product.price);
    };

    const cancelEditing = () => {
        setEditingProduct(null);
    };

    const handleUpdate = () => {
        if (!editingProduct) return;

        const updatedProduct = {
            ...editingProduct,
            name: updatedName,
            description: updatedDescription,
            price: parseFloat(updatedPrice),
            categoryId: editingProduct.categoryId || editingProduct.category?.id || 1
        };

        api.put(`/Product/${editingProduct.id}`, updatedProduct)
            .then(() => {
                fetchProducts();
                setEditingProduct(null);
            })
            .catch((err) => console.log("API HATASI:", err));
    };

    return (
        <>
            <Header />
            <div className={styles.productContainer}>
                <h2>Products</h2>

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
                        <option value="">Select Parent Category (with children)</option>
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

                <div className={styles.productGrid}>
                    {products.map((product) => (
                        <div className={styles.productCard} key={product.id}>
                            {editingProduct?.id === product.id ? (
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
                                    <button onClick={cancelEditing}>Cancel</button>
                                </div>
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
        </>
    );
};

export default Products;





