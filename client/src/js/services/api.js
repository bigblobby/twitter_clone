import axios from 'axios';

class Api {
    cache = [];

    getCached(key, callback){
        if(!this.cache[key]) this.cache[key] = callback();
        return this.cache[key];
    }

    get(url){
        return new Promise((resolve, reject) => {
           axios.get(url)
               .then(response => {
                   resolve(response.data);
               }).catch(err => {
                   reject(err);
               });
        });
    }

    post(url, params){
        return new Promise((resolve, reject) => {
            axios.post(url, params)
                .then(response => {
                    resolve(response.data);
                }).catch(err => {
                    reject(err);
                });
        });
    }

    getStuff(){
        const url = '/api/test';
        return this.getCached(url,() => {
            return this.get(url);
        });
    }
}

export default new Api();
