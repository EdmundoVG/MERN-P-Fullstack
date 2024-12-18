import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useGetProductByIdQuery, useUpdateProductMutation } from '../slices/productsApiSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [brand, setBrand] = useState('');
  const [rating, setRating] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const { data: product, isLoading, error } = useGetProductByIdQuery(id);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setBrand(product.brand);
      setRating(product.rating);
      setDiscountPercentage(product.discountPercentage);
    }
  }, [product]);

 const submitHandler = async (e) => {
   e.preventDefault();
   try {
     await updateProduct({
       productId: id,
       name,
       description,
       price: Number(price),
       category,
       stock: Number(stock),
       brand,
       rating: Number(rating),
       discountPercentage: Number(discountPercentage)
     }).unwrap();
     
     toast.success('Producto actualizado exitosamente');
     navigate('/products');
   } catch (err) {
     toast.error(err?.data?.message || err.error);
   }
 };

 return (
   <FormContainer>
     <h1>Editar Producto</h1>

     {isLoading ? (
       <Loader />
     ) : error ? (
       <div className='alert alert-danger'>{error?.data?.message || error.error}</div>
     ) : (
       <Form onSubmit={submitHandler}>
         <Form.Group className="my-2" controlId="name">
           <Form.Label>Nombre</Form.Label>
           <Form.Control
             type="text"
             placeholder="Ingrese nombre del producto"
             value={name}
             onChange={(e) => setName(e.target.value)}
           />
         </Form.Group>

         <Form.Group className="my-2" controlId="description">
           <Form.Label>Descripción</Form.Label>
           <Form.Control
             as="textarea"
             rows={3}
             placeholder="Ingrese descripción"
             value={description}
             onChange={(e) => setDescription(e.target.value)}
           />
         </Form.Group>

         <Form.Group className="my-2" controlId="price">
           <Form.Label>Precio</Form.Label>
           <Form.Control
             type="number"
             placeholder="Ingrese precio"
             value={price}
             onChange={(e) => setPrice(e.target.value)}
           />
         </Form.Group>

         <Form.Group className="my-2" controlId="category">
           <Form.Label>Categoría</Form.Label>
           <Form.Control
             type="text"
             placeholder="Ingrese categoría"
             value={category}
             onChange={(e) => setCategory(e.target.value)}
           />
         </Form.Group>

         <Form.Group className="my-2" controlId="stock">
           <Form.Label>Stock</Form.Label>
           <Form.Control
             type="number"
             placeholder="Ingrese cantidad en stock"
             value={stock}
             onChange={(e) => setStock(e.target.value)}
           />
         </Form.Group>

         <Form.Group className="my-2" controlId="brand">
           <Form.Label>Marca</Form.Label>
           <Form.Control
             type="text"
             placeholder="Ingrese marca"
             value={brand}
             onChange={(e) => setBrand(e.target.value)}
           />
         </Form.Group>

         <Form.Group className="my-2" controlId="rating">
           <Form.Label>Rating (0-5)</Form.Label>
           <Form.Control
             type="number"
             min="0"
             max="5"
             step="0.1"
             placeholder="Ingrese rating"
             value={rating}
             onChange={(e) => setRating(e.target.value)}
           />
         </Form.Group>

         <Form.Group className="my-2" controlId="discountPercentage">
           <Form.Label>Descuento (%)</Form.Label>
           <Form.Control
             type="number"
             min="0"
             max="100"
             placeholder="Ingrese porcentaje de descuento"
             value={discountPercentage}
             onChange={(e) => setDiscountPercentage(e.target.value)}
           />
         </Form.Group>

         {loadingUpdate && <Loader />}

         <Button type="submit" variant="primary" className="mt-3">
           Actualizar
         </Button>

         <Link to="/products" className="btn btn-light mt-3 ms-3">
           Volver
         </Link>
       </Form>
     )}
   </FormContainer>
 );
};

export default EditProduct;