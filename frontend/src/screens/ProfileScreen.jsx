import { useState, useEffect } from "react";
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { toast } from "react-toastify";
import Loader from '../components/Loader';
import { setCredentials } from '../slices/authSlice';
import { useUpdateUserMutation } from "../slices/usersApiSlice";

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile, {isLoading}] = useUpdateUserMutation();

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
    }, [userInfo.name, userInfo.email]);


    const submitHandler = async (e) =>{
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error('Las contraseñas no son iguales');
        } else {
           try {
            const res = await updateProfile({
                _id: userInfo._id,
                name,
                email,
                password
            }).unwrap();
            dispatch(setCredentials({...res}));
            toast.success('Perfil actualizado correctamente');
           } catch (err) {
                toast.error(err?.data?.message || err.error);
           }
        }
    };

    return (
        <FormContainer>
            <h1>Actualizar Perfil</h1>

            <Form onSubmit={ submitHandler }>

                <Form.Group className="my-2" controlId="name">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                     type="text"
                     placeholder="Ingrese Nombre"
                     value={name}
                     onChange={ (e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId="email">
                    <Form.Label>Direccion de Email</Form.Label>
                    <Form.Control
                     type="email"
                     placeholder="Ingrese Email"
                     value={email}
                     onChange={ (e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                     type="password"
                     placeholder="Ingrese Contraseña"
                     value={password}
                     onChange={ (e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId="confirmPassword">
                    <Form.Label>Confirmar Contraseña</Form.Label>
                    <Form.Control
                     type="password"
                     placeholder="Confirmar Contraseña"
                     value={confirmPassword}
                     onChange={ (e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                { isLoading  && <Loader/>}

                <Button type="submit" variant="primary" className="mt-3">
                    Actualizar
                </Button>

            </Form>
        </FormContainer>
    )
}
export default ProfileScreen
