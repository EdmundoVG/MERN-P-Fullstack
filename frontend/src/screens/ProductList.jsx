import { useNavigate } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useGetProductsQuery, useDeleteProductMutation } from "../slices/productsApiSlice";
import { toast } from "react-toastify";
import Loader from '../components/Loader';

const ProductList = () => {
 const navigate = useNavigate();
 
 const { data: products, isLoading, refetch } = useGetProductsQuery();
 const [deleteProduct] = useDeleteProductMutation();

 const deleteHandler = async (id) => {
   if(window.confirm('¿Estás seguro de eliminar este producto?')) {
     try {
       await deleteProduct(id);
       refetch();
       toast.success('Producto eliminado exitosamente');
     } catch (err) {
       toast.error(err?.data?.message || err.error);
     }
   }
 };

 return (
   <>
     <Row className='align-items-center'>
       <Col>
         <h1>Lista de Productos</h1>
       </Col>
       <Col className='text-end'>
         <Button className='btn-sm m-3' onClick={() => navigate('/product/create')}>
           <i className='fas fa-plus'></i> Agregar Producto
         </Button>
       </Col>
     </Row>

     {isLoading ? (
       <Loader />
     ) : (
       <Table striped hover responsive className='table-sm'>
         <thead>
           <tr>
             <th>NOMBRE</th>
             <th>PRECIO</th>
             <th>CATEGORÍA</th>
             <th>MARCA</th>
             <th>STOCK</th>
             <th>DESCUENTO</th>
             <th>RATING</th>
             <th></th>
           </tr>
         </thead>
         <tbody>
           {products?.map((product) => (
             <tr key={product._id}>
               <td>{product.name}</td>
               <td>${product.price}</td>
               <td>{product.category}</td>
               <td>{product.brand}</td>
               <td>{product.stock}</td>
               <td>{product.discountPercentage}%</td>
               <td>{product.rating}</td>
               <td>
                 <Button
                   variant='light'
                   className='btn-sm mx-2'
                   onClick={() => navigate(`/product/${product._id}/edit`)}
                 >
                   <i className='fas fa-edit'></i>
                 </Button>
                 <Button
                   variant='danger'
                   className='btn-sm'
                   onClick={() => deleteHandler(product._id)}
                 >
                   <i className='fas fa-trash'></i>
                 </Button>
               </td>
             </tr>
           ))}
         </tbody>
       </Table>
     )}
   </>
 );
};

export default ProductList;