export const orders = [
  { id: 101, table: "T1", items: 3, total: 750, status: "Pending" },
  { id: 102, table: "T2", items: 5, total: 1250, status: "Completed" },
];

export const foods = [
  {
    id: 1,
    img: "https://via.placeholder.com/80",
    name: "Burger",
    category: "Fast Food",
    price: 250,
    active: true,
    popular: true,
  },
  {
    id: 2,
    img: "https://via.placeholder.com/80",
    name: "Coke",
    category: "Drinks",
    price: 50,
    active: false,
    popular: false,
  },
];

export const categories = [
  { id: 1, name: "Fast Food" },
  { id: 2, name: "Drinks" },
];

export const reviews = [
  { id: 1, user: "Rahim", rating: 5, comment: "Excellent food!" },
  { id: 2, user: "Karim", rating: 4, comment: "Good service." },
];

export const users = [
  { id: 1, name: "Admin", role: "Admin" },
  { id: 2, name: "Staff", role: "Staff" },
];
