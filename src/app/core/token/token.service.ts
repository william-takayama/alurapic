import { Injectable } from '@angular/core';

const KEY = 'authToken'
@Injectable({ providedIn: 'root' })
export class TokenService { 

    hasToken(){
        return !!this.getToken(); // Tip to convert string to boolean
    }
    setToken(token){
        window.localStorage.setItem(KEY, token);
    }
    getToken(){
        return window.localStorage.getItem(KEY);
    }
    removeToken(){
        window.localStorage.removeItem(KEY);
    }
}