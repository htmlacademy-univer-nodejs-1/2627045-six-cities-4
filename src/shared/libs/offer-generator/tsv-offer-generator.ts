import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { Amenity, City, Coordinates, MockServerData, PropertyType } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';


const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const MIN_ROOMS = 1;
const MAX_ROOMS = 8;

const MIN_GUESTS = 1;
const MAX_GUESTS = 10;

const MIN_RATING = 1;
const MAX_RATING = 5;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class RentalOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const city = getRandomItem<City>([City.Paris, City.Cologne, City.Brussels, City.Amsterdam, City.Hamburg, City.Dusseldorf]);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const isPremium = Math.random() > 0.5;
    const isFavorite = Math.random() > 0.5;
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, 1).toString();
    const propertyType = getRandomItem<PropertyType>([PropertyType.Apartment, PropertyType.House, PropertyType.Room, PropertyType.Hotel]);
    const rooms = generateRandomValue(MIN_ROOMS, MAX_ROOMS).toString();
    const guests = generateRandomValue(MIN_GUESTS, MAX_GUESTS).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const amenities = getRandomItems<Amenity>([
      Amenity.Breakfast,
      Amenity.AirConditioning,
      Amenity.LaptopFriendlyWorkspace,
      Amenity.BabySeat,
      Amenity.Washer,
      Amenity.Towels,
      Amenity.Fridge
    ]).join(';');
    const author = getRandomItem<string>(this.mockData.authors);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatar = getRandomItem<string>(this.mockData.avatars);

    const createdDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    const coordinates: Coordinates = {
      latitude: parseFloat((Math.random() * 180 - 90).toFixed(6)),
      longitude: parseFloat((Math.random() * 360 - 180).toFixed(6))
    };

    const [firstname, lastname] = author.split(' ');

    return [
      title, description, createdDate,
      previewImage, images, isPremium.toString(), isFavorite.toString(),
      rating, city, propertyType, rooms, guests, price, amenities,
      firstname, lastname, email, avatar,
      coordinates.latitude.toString(), coordinates.longitude.toString()
    ].join('\t');
  }
}
