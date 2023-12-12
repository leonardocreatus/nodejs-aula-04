
// repository 
// controller


import express from 'express';
import { createUserController, listUserController} from './user-controller.js';

const app = express();
app.use(express.json()); 

app.post('/users', createUserController);
app.get('/users', listUserController);

/*
    1. controller fetchUserByIdControlelr
    2. repository findById
*/
app.get('/users/:id', (request, response) => {
    response.send({});
})

/*
    1. controller updateUserController
    2. repository findById
    3. editar a informações do usuário 
    4. salvar as informações
    
*/
app.put('/users/:id', (request, response) => {});

app.listen(3000, () => {
    console.log('Server is running');
})
