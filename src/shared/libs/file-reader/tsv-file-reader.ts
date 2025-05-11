import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { City } from '../../types/city.enum.js';
import { PropertyType } from '../../types/property-type.enum.js';
import { Amenity } from '../../types/amenity.enum.js';
import { Offer } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, publicationDate, city, previewImage, images, isPremium, isFavorite, rating, propertyType, rooms, guests, price, amenities, authorName, authorEmail, authorAvatar, commentsCount, latitude, longitude]) => ({
        title,
        description,
        publicationDate: new Date(publicationDate),
        city: City[city as keyof typeof City], // Преобразование строки в enum City
        previewImage,
        images: images.split(';'), // Разделение списка изображений по ';'
        isPremium: isPremium === 'true',
        isFavorite: isFavorite === 'true',
        rating: parseFloat(rating),
        propertyType: PropertyType[propertyType as keyof typeof PropertyType], // Преобразование строки в enum PropertyType
        rooms: parseInt(rooms, 10),
        guests: parseInt(guests, 10),
        price: parseInt(price, 10),
        amenities: amenities.split(';').map((amenity) => Amenity[amenity as keyof typeof Amenity]), // Преобразование строк в enum Amenities
        author: {
          name: authorName,
          email: authorEmail,
          avatar: authorAvatar,
          password: '',
          userType: 'pro',
        },
        commentsCount: parseInt(commentsCount, 10),
        coordinates: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        },
      }));
  }
}
