export type CreateAutobiographyProcessDto = {
  authorFirstName: string;
  authorLastName: string;
  authorBirthTimestamp: Date;
  writeStartTimestamp: Date;
  publishTimestamp: Date | null;
  bookTitle: string;
  bookPrice: number;
};
