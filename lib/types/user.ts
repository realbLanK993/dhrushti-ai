export type User = {
  uid: string; // Unique ID for each user
  createdTimestamp: Date; // Timestamp for when the user was created
  isActive: boolean; // Status: Yes (true) or No (false)
  username?: string; // User's username
};

export type AddUserProps = {
  username?: string;
};

export type EditUserProps = {
  uid: string;
  username?: string;
  isActive: boolean;
};
