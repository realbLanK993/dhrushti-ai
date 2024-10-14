export const getData = async () => {
  return await fetch("http://localhost:8000/").then((res) => res.json());
};
