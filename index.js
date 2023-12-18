
import express from 'express';
import { authUserController, createUserController, deleteAllUserController, listUserController} from './user-controller.js';
import { middleware } from './middleware.js';

const app = express();
app.use(express.json()); 

app.post('/users/auth', middleware, authUserController);
app.post('/users', createUserController); 
app.get('/users', listUserController);
app.delete('/users', deleteAllUserController);

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
app.put('/users/:id', (request, response) => {

});

app.delete('/users/:id', (request, response) => {

});



app.listen(3000, () => {
    console.log('Server is running');
})
