import { object, string, size } from 'superstruct';

export const BookCreationData = object({
  firstname: size(string(), 1, 50),
  lastname: size(string(), 1, 50),
});

export const BookUpdateData = object({
    firstname: size(string(), 1, 50),
    lastname: size(string(), 1, 50),
  });