
import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
// key that is used to access the data in local storage
const STORAGE_KEY = 'currentUser';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
    constructor(@Inject(SESSION_STORAGE) private storage: StorageService) { }

     public setCurrentUser(username: string): void {
 
        this.storage.set(STORAGE_KEY, username);

    }

    public getCurrentUser(): String{
      return this.storage.get(STORAGE_KEY);
    }


}