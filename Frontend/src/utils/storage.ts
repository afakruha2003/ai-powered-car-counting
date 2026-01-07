const STORAGE_KEYS = {
  USER: 'user',
  GARAGE_ID: 'garageId',
} as const;

export const storage = {
  getUser: () => {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },
  
  setUser: (user: any) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },
  
  removeUser: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },
  
  getGarageId: () => {
    return localStorage.getItem(STORAGE_KEYS.GARAGE_ID);
  },
  
  setGarageId: (garageId: string) => {
    localStorage.setItem(STORAGE_KEYS.GARAGE_ID, garageId);
  },
  
  removeGarageId: () => {
    localStorage.removeItem(STORAGE_KEYS.GARAGE_ID);
  },
  
  clear: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.GARAGE_ID);
  },
};
