import {User} from './user.type.js';

export type Comments = {
  text: string;
  author: User;
  rating: 1 | 2 | 3 | 4 | 5;
  date: Date;
}
