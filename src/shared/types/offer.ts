import { Amenity } from './amenity.enum.js';
import { City } from './city.enum.js';
import { Coordinates } from './coordinates.js';
import { PropertyType } from './property-type.enum.js';
import { User } from './user.js';

export interface Offer {
  title: string;
  description: string;
  publicationDate: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  propertyType: PropertyType;
  rooms: number;
  guests: number;
  price: number;
  amenities: Amenity[];
  author: User;
  commentsCount: number;
  coordinates: Coordinates;
}
