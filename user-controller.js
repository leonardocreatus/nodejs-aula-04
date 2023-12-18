
import bcrypt from 'bcrypt';

import { UserRepository } from "./user-repository.js";
import { UserService } from './user-service.js';

const userRepository = new UserRepository();
const userService = new UserService({ userRepository });


export function createUserController(request, response){   
    const { name, email, profile, password} = request.body;
    try { 
        const user = userService.create({ name, email, profile, password });
        return response.status(201).send(user);
    }catch(error){
        return response.status(409).send({ message: error.message });
    }
}

export function listUserController(request, response){
    const { query } = request;
    console.log('query', query)
    const users = userRepository.findMany(query);
    response.status(200).send(users);
}

export function fetchUserByIdController(request, response){
    const { id } = request.params;
}

export function updateUserController(request, response){
    const { id } = request.params;
}

export function deleteAllUserController(request, response){
    userRepository.deleteAll();
    response.status(204).send();
}

export function deleteByIdUserController(request, response){
    const { id } = request.params;
    userRepository.deleteById(id);
    response.status(204).send();
}

export function authUserController(request, response){
    const { email, password } = request.body;
    const user = userRepository.findByEmail(email);

    if(!user){
        return response.status(401).send({ message: 'Usuário não encontrado' });
    }

    const compare = bcrypt.compareSync(password, user.password);
    if(!compare){
        return response.status(401).send({ message: 'Senha incorreta' });
    }

    return response.status(200).send({ name: user.name, profile: user.profile });

}