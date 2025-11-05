import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';

@Injectable({ providedIn: 'root' })
export class DbService {
  private dbPromise: Promise<IDBPDatabase<any>>;

  constructor() {
    this.dbPromise = openDB('renthub-db', 2, {
      upgrade(db, oldVersion, newVersion) {
        if (!db.objectStoreNames.contains('items')) {
          db.createObjectStore('items', { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains('users')) {
          db.createObjectStore('users', { keyPath: 'email' });
        }
      },
    });
    //this.seedDefaultPosts();
  }

  async registerUser(user: { name: string; email: string; password: string }) {
    const db = await this.dbPromise;
    return db.put('users', user);
  }

  async seedDefaultPosts() {
    const db = await this.dbPromise;
    const count = await db.count('items');
    if (count === 0) {
      const defaultPosts = [
        {
          apartmentName: 'Sunset Apartments',
          buildingName: 'Sunset Towers',
          isShared: false,
          location: 'Downtown',
          squareFeet: 850,
          stayType: 'long',
          expectedRent: 1200,
          rentMode: 'month',
          isNegotiable: true,
          isFurnished: true,
          amenities: { gym: true, carPark: true, visitorParking: false, powerBackup: true, garbageDisposal: true, privateLawn: false, waterHeater: true, plantSecurity: true, laundry: true, elevator: true, clubHouse: false },
          title: 'Spacious 2BHK in Downtown',
          description: 'A beautiful apartment with all amenities.',
          image: 'assets/apt1.jpg'
        },
        {
          apartmentName: 'Greenview Residency',
          buildingName: 'Greenview Block A',
          isShared: true,
          location: 'Uptown',
          squareFeet: 650,
          stayType: 'short',
          expectedRent: 900,
          rentMode: 'month',
          isNegotiable: false,
          isFurnished: false,
          amenities: { gym: false, carPark: true, visitorParking: true, powerBackup: false, garbageDisposal: true, privateLawn: true, waterHeater: false, plantSecurity: false, laundry: true, elevator: false, clubHouse: true },
          title: 'Cozy Shared Apartment',
          description: 'Perfect for students and young professionals.',
          image: 'assets/apt2.jpg'
        },
        {
          apartmentName: 'Lakeview Heights',
          buildingName: 'Lakeview Tower',
          isShared: false,
          location: 'Lakeside',
          squareFeet: 1200,
          stayType: 'long',
          expectedRent: 1800,
          rentMode: 'month',
          isNegotiable: true,
          isFurnished: true,
          amenities: { gym: true, carPark: true, visitorParking: true, powerBackup: true, garbageDisposal: true, privateLawn: true, waterHeater: true, plantSecurity: true, laundry: true, elevator: true, clubHouse: true },
          title: 'Luxury Apartment with Lake View',
          description: 'Enjoy stunning views and premium facilities.',
          image: 'assets/apt3.jpg'
        }
      ];
      // Add posts to IndexedDB
      for (const post of defaultPosts) {
        await db.add('items', post);
      }
    }
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