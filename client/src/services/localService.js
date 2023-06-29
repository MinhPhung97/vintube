export const localService = {
  get: () => {
    let dataJSON = localStorage.getItem('token');
    return JSON.parse(dataJSON);
  },
  set: (token) => {
    let dataJSON = JSON.stringify(token);
    localStorage.setItem('token', dataJSON);
  },
  remove: () => {
    localStorage.removeItem('token');
  },
};
