import { Injectable } from '@angular/core';
import { BrowserStorageKey } from './storage.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  setItem<T>(key: BrowserStorageKey, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: BrowserStorageKey): T | null {
    const item = localStorage.getItem(key);
    return item ? <T>JSON.parse(item) : null;
  }

  removeItem(key: BrowserStorageKey): void {
    localStorage.removeItem(key);
  }

  removeAllMyItems(): void {
    Object.values(BrowserStorageKey).forEach((keys: string) => {
      this.removeItem(keys as BrowserStorageKey);
    });
  }

  clear(): void {
    localStorage.clear();
  }
}
