import bcrypt from 'bcrypt';

export class UserService {
    constructor({ userRepository }){
        this.userRepository = userRepository;
    }

    create({ name, email, profile, password }){
        const userWithEmail = this.userRepository.findByEmail(email);;
        if(userWithEmail){
            throw new Error('Email já cadastrado');
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const user = this.userRepository.add({ name, email, profile, password: hash });
        return user;
    }
}
