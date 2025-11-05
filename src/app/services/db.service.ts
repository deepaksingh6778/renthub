import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';

@Injectable({ providedIn: 'root' })
export class DbService {
  private dbPromise: Promise<IDBPDatabase<any>>;

  constructor() {
    this.dbPromise = openDB('renthub-db', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('items')) {
          db.createObjectStore('items', { keyPath: 'id', autoIncrement: true });
        }
      },
    });
  }

  async addItem(item: any) {
    const db = await this.dbPromise;
    return db.add('items', item);
  }

  async getItem(id: number) {
    const db = await this.dbPromise;
    return db.get('items', id);
  }

  async getAllItems() {
    const db = await this.dbPromise;
    return db.getAll('items');
  }

  async deleteItem(id: number) {
    const db = await this.dbPromise;
    return db.delete('items', id);
  }
}
