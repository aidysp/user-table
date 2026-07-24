import type { UserResponse, GetUserParams } from "@/types/user";


async function getUsers(params: GetUserParams): Promise<UserResponse | undefined> {
  const query = new URLSearchParams();

  if (params.limit !== undefined) query.append('limit', String(params.limit));
  if (params.skip !== undefined) query.append('skip', String(params.skip));
  if (params.sortBy !== undefined) query.append('sortBy', String(params.sortBy));
  if (params.order !== undefined) query.append('order', String(params.order));

  const url = `https://dummyjson.com/users?${query.toString()}`;

  try {
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data: UserResponse = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}


async function searchUsers(query: string): Promise<UserResponse | undefined> {
  const url = `https://dummyjson.com/users/search?q=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }
    const data: UserResponse = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}


export { getUsers, searchUsers }
