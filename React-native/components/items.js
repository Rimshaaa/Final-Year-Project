export const COLOURS = {
  white: "#ffffff",
  black: "#000000",
  lightGray: "#B3B4B6",
  accent: "#FF9801",
  accentRed: "#FF9801",
  accentPink: "#F96165",
  primaryAmber: "#f59e0b",
};

export const Categories = [
  {
    name: "Fruits",
    image: require("../assets/fruit/fruit.jpg"),
    items: [
      {
        name: "Apple",
        ID: 120928102910,
        rating: "5.0",
        Qty: "10 kg",
        price: 199,
        isTopOfTheWeek: true,
        image: require("../assets/fruit/apple.jpg"),
        size: 'Large 8"',
        crust: "Thick Crust",
        delivery: 25,
      },
      {
        name: "Orange",
        ID: 15120129010,
        Qty: "10 kg",
        rating: "4.5",
        price: 99,
        isTopOfTheWeek: false,
        image: require("../assets/fruit/redOrange.png"),
        size: 'Large 12"',
        crust: "Thick Crust",
        delivery: 20,
      },
      {
        name: "Banana",
        ID: 250210219910,
        Qty: "10 kg",
        rating: "4.2",
        price: 299,
        isTopOfTheWeek: false,
        image: require("../assets/fruit/banana.png"),
        size: 'Large 10"',
        crust: "Thick Crust",
        delivery: 35,
      },
    ],
  },
  {
    name: "Vegetable",
    image: require("../assets/veg/veg.jpg"),
    items: [
      {
        name: "Onion",
        ID: 252901921020,
        Qty: "10 kg",
        rating: "5.0",
        price: 199,
        isTopOfTheWeek: true,
        image: require("../assets/veg/onion.png"),
        size: 'Large 14"',
        crust: "Thin Crust",
        delivery: 30,
      },
      {
        name: "Carrot",
        ID: 300290122180,
        Qty: "10 kg",
        rating: "4.5",
        price: 299,
        isTopOfTheWeek: false,
        image: require("../assets/veg/carrot.png"),
        size: 'Large 16"',
        crust: "Thin Cheese",
        delivery: 25,
      },
      {
        name: "Garlic",
        ID: 351290129210,
        Qty: "10 kg",
        rating: "4.2",
        price: 499,
        isTopOfTheWeek: false,
        image: require("../assets/veg/garlic.png"),
        size: 'Large 15"',
        crust: "Thin Crust",
        delivery: 45,
      },
    ],
  },
  {
    name: "Meat",
    image: require("../assets/meat/meat.jpg"),
    items: [
      {
        name: "Chicken",
        ID: 20182301920,
        Qty: "10 kg",
        rating: "5.0",
        price: 299,
        isTopOfTheWeek: true,
        image: require("../assets/meat/chicken.png"),
        size: "Medium Glass",
        crust: "Small Ice",
        delivery: 10,
      },
      {
        name: "Lamb Meat",
        ID: 50172637120,
        Qty: "10 kg",
        rating: "4.5",
        price: 199,
        isTopOfTheWeek: false,
        image: require("../assets/meat/lambmeat.png"),
        size: "LArge Glass",
        crust: "Large Ice",
        delivery: 8,
      },
      {
        name: "Goat Meat",
        ID: 15082191219,
        Qty: "10 kg",
        rating: "4.2",
        price: 99,
        isTopOfTheWeek: false,
        image: require("../assets/meat/goatmeat.png"),
        size: "Large Glass",
        crust: "Small Ice",
        delivery: 5,
      },
    ],
  },
];

export const Contracts = [
  {
    name: "Pending",
  },
  {
    name: "Accepted",
  },

  {
    name: "Rejected",
  },
];

export const Bids = [
  {
    name: "In-Progress ",
  },

  {
    name: "Compeleted",
  },
];
