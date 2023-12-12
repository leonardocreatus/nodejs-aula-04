
import fs from 'node:fs';

export class UserRepository {

    constructor() {
        const str = fs.readFileSync('db.json', 'utf8');
        this.users = JSON.parse(str) ?? [];
        this.id = 0;
    }

    /*
        id: number
        name: string
        email: string
        profile: string
    */
   
    add(param){
        const user = {
            id: this.id,
            ...param
        } 

        this.id++;

        this.users.push(user);
        fs.writeFileSync('db.json', JSON.stringify(this.users));
        return user;
    }

    findById(id){
        return this.users.find(user => user.id === id);
    }

    findByEmail(email){
        return this.users.find(user => user.email === email);
    }

    findMany(){
        return this.users;
    }

}