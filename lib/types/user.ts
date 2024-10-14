export type User = {
  id: string; // Unique ID for each user
  created: Date; // Timestamp for when the user was created
  active: boolean; // Status: Yes (true) or No (false)
  username?: string; // User's username
};

export type AddUserProps = {
  username?: string;
};

export type EditUserProps = {
  id: string;
  username?: string;
  active: boolean;
};
