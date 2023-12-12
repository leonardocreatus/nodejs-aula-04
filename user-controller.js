
import { UserRepository } from "./user-repository.js";

const userRepository = new UserRepository();

export function createUserController(request, response){   
    const { name, email, profile} = request.body;
    const user = userRepository.add({ name, email, profile});
    response.status(201).send(user);
}


export function listUserController(request, response){
    const users = userRepository.findMany();
    response.status(200).send(users);
}
