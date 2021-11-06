export type AuthorDto = {
  id: string;
  firstName: string;
  lastName: string;
  birthTimestamp: Date | null;
};

export type CreateAuthorDto = {
  firstName: string;
  lastName: string;
  birthTimestamp: Date | null;
};
