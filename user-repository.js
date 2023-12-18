
import fs from 'node:fs';

export class UserRepository {

    constructor() {
        const str = fs.readFileSync('db.json', 'utf8');
        this.users = JSON.parse(str) ?? [];
        this.id = this.#getGreaterId() + 1;
    }

    /*
        id: number
        name: string
        email: string
        profile: string
        password: string
    */
   
    add(param){
        const user = {
            id: this.id,
            ...param
        } 

        this.id++;

        this.users.push(user);
        this.#updateDb();

        return {
            // ...user,
            name: user.name,
            email: user.email,
            profile: user.profile,
            password: user.password,
            password: '******'
        }
    }

    findById(id){
        const user = this.users.find(user => user.id === id);
        return {
            ...user,
            password: null
        }
    }

    findByEmail(email){
        const user = this.users.find(user => user.email === email);
        return user;
    }

    findMany({email, profile, name, id}){
        const users = this.users.filter(user => {
            if(email && user.email !== email){
                return false;
            }

            if(profile && user.profile !== profile){
                return false;
            }

            if(name && !user.name.includes(name)){
                return false;
            }

            if(id && user.id != id){
                console.log(`user.id ${user.id} != id ${id}`)
                return false;
            }

            return true;
        });

        return users.map(user => {
            return {
                ...user,
                password: null
            };
        })
    }

    #updateDb(){
        fs.writeFileSync('db.json', JSON.stringify(this.users));
    }

    #getGreaterId(){
        const ids = this.users.map(user => user.id);
        const greaterId = ids.length > 0 ? Math.max(...ids) : -1;
        return greaterId;
    }

    deleteAll(){
        this.users = [];
        this.id = 0;
        this.#updateDb();
    }

    deleteById(id){
        this.users = this.users.filter(user => user.id !== id);
        this.#updateDb();
    }

}