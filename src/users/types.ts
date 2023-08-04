export type Person = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
};

export type Sorting = {
  sortKey: string;
  order: 'asc' | 'desc';
};
