 const products = [
  {
    id: 123,
    title: "redmi Note 10 Pro",
    img: "https://picsum.photos/300/200",
    price: 4300000,
    discountPrice: 4300000 - (4300000 / 100 * 25), // chegirmadagi summa.
    model: "Xiaomi",
    addedDate: new Date("2021-11-12").toISOString(),
    benefits: ["8gb", "128gb", "Waterproof"]
  },
  {
    id: 124,
    title: "samsung Note 20",
    img: "https://picsum.photos/300/200",
    discountPrice: 8300000 - (8300000 / 100 * 25), // chegirmadagi summa.
    price: 8300000,
    model: "Samsung",
    addedDate: new Date("2021-10-12").toISOString(),
    benefits: ["32gb", "1tb"]
  }
]

const manufacturers = [
  {
    id: 1,
    name: "Xiaomi"
  },
  {
    id: 2,
    name: "Apple"
  },
  {
    id: 3,
    name: "Samsung"
  }
];