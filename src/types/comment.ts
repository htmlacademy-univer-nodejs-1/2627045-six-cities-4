import { User } from './user.js';

export interface Comment {
  text: string;
  publicationDate: Date;
  rating: number;
  author: User;
}
