import {Coordinates} from './coordinates.type.js';
import {Conveniences} from './conveniences.enum.js';
import {City} from './city.enum.js';
import {User} from './user.type.js';
import {Housing} from './housing.enum.js';

export type Offer = {
  name: string;
  city: City;
  price: number;
  conveniences: Conveniences;
  author: User;
  countComments: number;
  coordinates: Coordinates;
  description: string;
  previewImg: string;
  date: Date;
  images: string[];
  flagIsPremium: boolean;
  flagIsFavourites: boolean;
  rating: 1 | 2 | 3 | 4 | 5;
  housing: Housing;
  countRooms: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  countPeople: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}
