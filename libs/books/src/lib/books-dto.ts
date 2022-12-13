export type BookDto = {
  id: string;
  title: string;
  price: number;
  writeStartTimestamp: Date;
  publishTimestamp: Date | null;
};

export type CreateBookDto = {
  title: string;
  price: number;
  writeStartTimestamp: Date;
  publishTimestamp: Date | null;
};
