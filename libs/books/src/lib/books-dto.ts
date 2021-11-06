export type BookDto = {
  id: string;
  title: string;
  price: number | null;
  writeStartTimestamp: Date;
  publishTimestamp: Date | null;
};

export type CreateBookDto = {
  title: string;
  price: number | null;
  writeStartTimestamp: Date;
  publishTimestamp: Date | null;
};
