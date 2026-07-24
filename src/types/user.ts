export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: 'male' | 'female';
  phone: string;
  email: string;
  height: number;
  weight: number;
  image: string;
  address: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
}

export interface UserResponse {
  limit: number;
  skip: number;
  total: number;
  users: User[];
}


export interface GetUserParams {
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}


