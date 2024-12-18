import asyncHandler from "express-async-handler";
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

//Descripcion:      Auth user/set token
//Ruta:             POST /api/users/auth
//Acceso:           Publico

const authUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(401);
        throw new Error('Email o Contraseña incorrecta');
    }
});

//Descripcion:      Registrar nuevo usuario
//Ruta:             POST /api/users
//Acceso:           Publico

const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if(userExists){
        res.status(400);
        throw new Error('Usuario ya existe');
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if(user){
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error('Informacion de Usuario invalida');
    }
});

//Descripcion:      LOGOUT usuario
//Ruta:             POST /api/users/logout
//Acceso:           Publico

const logoutUser = asyncHandler( async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: 'Usuario logout' });
});

//Descripcion:      Obtener perfil de usuario
//Ruta:             GET /api/users/profile
//Acceso:           Privado

const getUserProfile = asyncHandler( async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }

    res.status(200).json(user);
});

//Descripcion:      Actualizar perfil de usuario
//Ruta:             PUT /api/users/profile
//Acceso:           Privado

const updateUserProfile = asyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        });

    } else {
        res.status(404);
        throw new Error('Usuario no encontrado');
    }

});

export{ 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
 };


