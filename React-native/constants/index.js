import theme, { COLORS, SIZES, FONTS } from "./theme";
import images from "./images";
import Colors from "./Colors";

export const UNITS = [
  {
    key: "1",
    value: "Grams",
  },
  {
    key: "2",
    value: "KG",
  },
  {
    key: "3",
    value: "Dozen",
  },
  { key: "4", value: "Unit" },
];

export { images, theme, COLORS, SIZES, FONTS };

export const categories = [
  "Fruits",
  "Vegetables",
  "Meat",
  "Sea Food",
  "Spices",
];

export const featuredFruits = [
  {
    name: "Australian Orange",
    price: "  250",
    stars: 4,
    desc: "Sweet and juicy",
    shadow: "orange",
    image: require("../assets/images/greenApple.png"),
    color: (opacity) => `rgba(251, 216, 146, ${opacity})`,
  },
  {
    name: "Flesh Nectari",
    shadow: "red",
    price: "  200",
    stars: 3,
    desc: "Sweet and juicy",
    image: require("../assets/images/grapes.png"),
    color: (opacity) => `rgba(255, 170, 157, ${opacity})`,
  },

  {
    name: "Black Grapes",
    price: "  250",
    stars: 4,
    desc: "Sweet and juicy",
    shadow: "purple",
    image: require("../assets/images/orange.png"),
    color: (opacity) => `rgba(214, 195, 246, ${opacity})`,
  },

  {
    name: "Red Grapefruit",
    price: "  230",
    stars: 4,
    desc: "Sweet and juicy",
    shadow: "red",
    image: require("../assets/images/peach.png"),
    color: (opacity) => `rgba(255, 163, 120, ${opacity})`,
  },
  {
    name: "Green Apple",
    price: "  260",
    stars: 4,
    desc: "Sweet and juicy",
    shadow: "green",
    image: require("../assets/images/redOrange.png"),
    color: (opacity) => `rgba(139, 243, 139, ${opacity})`,
  },
];

export const cartItems = [
  {
    id: 1,
    name: "Orange",
    price: "12.30",
    qty: 4,
    desc: "Sweet and juicy",
    shadow: "orange",
    image: require("../assets/images/redOrange.png"),
    color: (opacity) => `rgba(251, 216, 146, ${opacity})`,
  },
  {
    id: 2,
    name: "Peach",
    shadow: "red",
    price: "12",
    qty: 3,
    desc: "Sweet and juicy",
    image: require("../assets/images/peach.png"),
    color: (opacity) => `rgba(255, 170, 157, ${opacity})`,
  },

  {
    id: 3,
    name: "Black Grapes",
    price: "40",
    qty: 2,
    desc: "Sweet and juicy",
    shadow: "purple",
    image: require("../assets/images/grapes.png"),
    color: (opacity) => `rgba(214, 195, 246, ${opacity})`,
  },
  {
    id: 4,
    name: "Green Apple",
    price: "10.5",
    qty: 2,
    desc: "Sweet and juicy",
    shadow: "green",
    image: require("../assets/images/greenApple.png"),
    color: (opacity) => `rgba(139, 243, 139, ${opacity})`,
  },

  {
    id: 4,
    name: "Banana",
    price: "10.5",
    qty: 2,
    desc: "Sweet and juicy",
    shadow: "yellow",
    image: require("../assets/images/banana2.png"),
    color: (opacity) => `rgba(139, 243, 139, ${opacity})`,
  },
];

export const request = [
  {
    name: "Haveli Restaurant",
    description: "I want 1 kg Chicken",
    image: require("../assets/images/avatar.png"),
  },
  {
    name: "Tandoori Restaurant",
    description: "I want 5 kg Meat",
    image: require("../assets/images/avatar.png"),
  },
  {
    name: "Al Arab Mandi",
    description: "I want 10 kg Rice",
    image: require("../assets/images/avatar.png"),
  },
  {
    name: "Khabba Restaurant",
    description: "I want Fresh Vegetables",
    image: require("../assets/images/avatar.png"),
  },
];

export const Bidrequest = [
  {
    Verified: "",
    name: "Ali",
    OfferPrice: "1000",
    image: require("../assets/images/user2.jpg"),
  },
  {
    verImage: require("../assets/images/tick2.png"),
    Verified: "Certified",
    name: "Saad",
    OfferPrice: "1500",
    image: require("../assets/images/user3.jpg"),
  },
  {
    Verified: "",
    name: "Ahmed",
    OfferPrice: "800",
    image: require("../assets/images/user4.jpg"),
  },
  {
    Verified: "Certified",
    name: "Usama",
    OfferPrice: "750",
    image: require("../assets/images/user6.jpg"),
    verImage: require("../assets/images/tick2.png"),
  },
];

export const dummyText =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book";

export const categories2 = [
  {
    id: 1,
    title: "Fruits",
  },
  {
    id: 2,
    title: "Vegetables",
  },
  {
    id: 3,
    title: "Meat",
  },
  {
    id: 4,
    title: "Sea Food",
  },
  {
    id: 5,
    title: "Spices",
  },

  {
    id: 6,
    title: "Dairy Products",
  },
];

export const categories3 = [
  {
    id: 1,
    title: "Vegetables",
  },
  {
    id: 2,
    title: "Meat",
  },
  {
    id: 3,
    title: "Dairy Products",
  },
  {
    id: 4,
    title: "Sea Food",
  },
];

export const coffeeItems = [
  {
    id: 1,
    name: "Vegetables",
    price: "100",
    volume: "116 ml",
    stars: "4.6",
    image: require("../assets/images/veg.png"),
    desc: "The taste of coffee can vary depending on factors such as the type of beans, roast level, brewing method, and the addition of any flavors or sweeteners.",
    color: (opacity) => `rgba(139, 243, 139, ${opacity})`,
  },

  {
    id: 2,
    name: "Fruits",
    price: "200",
    volume: "110 ml",
    stars: "4.3",
    image: require("../assets/images/fruit.png"),
    desc: "The taste of coffee can vary depending on factors such as the type of beans, roast level, brewing method, and the addition of any flavors or sweeteners.",
  },

  {
    id: 3,
    name: "Meat",
    price: "150",
    volume: "100 ml",
    stars: "4.0",
    image: require("../assets/images/meat.png"),
    desc: "The taste of coffee can vary depending on factors such as the type of beans, roast level, brewing method, and the addition of any flavors or sweeteners.",
  },

  {
    id: 4,
    name: "Sea Food",
    price: "20",
    volume: "80 ml",
    stars: "3.5",
    image: require("../assets/images/seafood.png"),
    desc: "The taste of coffee can vary depending on factors such as the type of beans, roast level, brewing method, and the addition of any flavors or sweeteners.",
  },
];

export const TrackingStatus = [
  {
    id: 1,
    title: "Dispached Order",
  },
  {
    id: 2,
    title: "Pending Order",
  },
  {
    id: 3,
    title: "Delivered Order",
  },
  {
    id: 4,
    title: "Review Order",
  },
];

export const Vegetables = [
  {
    id: 1,
    image: require("../assets/images/user6.jpg"),
    price: "40",
  },
  {
    id: 2,
    image: require("../assets/images/user6.jpg"),
    price: "40",
  },
  {
    id: 3,
    image: require("../assets/images/user6.jpg"),
    price: "40",
  },
  {
    id: 4,
    image: require("../assets/images/user6.jpg"),
    price: "40",
  },
];

export const DispachedOrder = [
  {
    id: 1,
    order: "1 kg apple, 10 kg rice, 5 kg meat",
    stat: "Dispached",
  },
  {
    id: 2,
    order: "Fresh Vegetables",
    stat: "Recieved",
  },
  {
    id: 3,
    order: "10 kg meat",
    stat: "Review",
  },
  {
    id: 4,
    order: "1 kg apple, 10 kg rice, 5 kg meat",
    stat: "Dispached",
  },
  {
    id: 5,
    order: "1 kg apple, 10 kg rice, 5 kg meat",
    stat: "Dispached",
  },
];

export const Contract = [
  {
    id: 1,
    name: "Desi Food Restaurant",
    image: require("../assets/images/Res1.png"),
    Contractdesc: "The Contract states that",
    duration: "1 year",
  },

  {
    id: 1,
    name: "Pizza Restaurant",
    image: require("../assets/images/Res2.png"),
    Contractdesc: "The Contract states that",
    duration: "1 year",
  },

  {
    id: 1,
    name: "SeaFood Restaurant",
    image: require("../assets/images/Res3.png"),
    Contractdesc: "The Contract states that",
    duration: "1 month",
  },
  {
    id: 1,
    name: "Fish Restaurant",
    image: require("../assets/images/Res4.png"),
    Contractdesc: "The Contract states that",
    duration: "1 weeks",
  },
  {
    id: 1,
    name: "Freshly Baked",
    image: require("../assets/images/Res5.png"),
    Contractdesc: "The Contract states that",
    duration: "1 month",
  },
  {
    id: 1,
    name: "Home Cooked Food",
    image: require("../assets/images/Res6.png"),
    Contractdesc: "The Contract states that",
    duration: "5 year",
  },
];

export const Bid = [
  {
    id: 1,
    name: "Desi Food Restaurant",
    image: require("../assets/images/Res1.png"),
  },

  {
    id: 1,
    name: "Pizza Restaurant",
    image: require("../assets/images/Res2.png"),
  },

  {
    id: 1,
    name: "SeaFood Restaurant",
    image: require("../assets/images/Res3.png"),
  },
  {
    id: 1,
    name: "Fish Restaurant",
    image: require("../assets/images/Res4.png"),
  },
  {
    id: 1,
    name: "Freshly Baked",
    image: require("../assets/images/Res5.png"),
  },
  {
    id: 1,
    name: "Home Cooked Food",
    image: require("../assets/images/Res6.png"),
  },
];

export const veg = [
  {
    id: 1,
    name: "Turnip",
    price: "100",
    image: require("../assets/veg/turnip.png"),
    qty: 10,
  },

  {
    id: 1,
    name: "Tomato",
    price: "100",
    image: require("../assets/veg/tomato.png"),
    qty: 10,
  },

  {
    id: 1,
    name: "Red Radish",
    price: "100",
    image: require("../assets/veg/red-radish.png"),
    qty: 10,
  },

  {
    id: 1,
    name: "Pea",
    price: "100",
    image: require("../assets/veg/pea.png"),
    qty: 10,
  },

  {
    id: 1,
    name: "Onion",
    price: "100",
    image: require("../assets/veg/onion.png"),
    qty: 10,
  },

  {
    id: 1,
    name: "Lemon",
    price: "100",
    image: require("../assets/veg/lemon.png"),
    qty: 10,
  },

  {
    id: 1,
    name: "LadyFinger",
    price: "100",
    image: require("../assets/veg/ladyfinger.png"),
    qty: 10,
  },

  {
    id: 1,
    name: "Ginger",
    price: "100",
    image: require("../assets/veg/ginger.png"),
    qty: 10,
  },

  {
    id: 1,
    name: "Garlic",
    price: "100",
    image: require("../assets/veg/garlic.png"),
    qty: 10,
  },

  {
    id: 1,
    name: "Cucumber",
    price: "100",
    image: require("../assets/veg/cucumber.png"),
    qty: 10,
  },

  {
    id: 1,
    name: "Cabbage",
    price: "100",
    image: require("../assets/veg/cabbage.png"),
    qty: 10,
  },

  {
    id: 1,
    name: "Bitter Melon",
    price: "100",
    image: require("../assets/veg/bitter-melon.png"),
    qty: 10,
  },

  {
    id: 1,
    name: "Brinjal",
    price: "100",
    image: require("../assets/veg/brinjal.png"),
    qty: 10,
  },

  {
    id: 1,
    name: "Broccoli",
    price: "100",
    image: require("../assets/veg/broccoli.png"),
    qty: 10,
  },

  {
    id: 1,
    name: "Calabash Gourd",
    price: "100",
    image: require("../assets/veg/calabash-gourd.png"),
    qty: 10,
  },

  {
    id: 1,
    name: "Capsicum",
    price: "100",
    image: require("../assets/veg/capsicum.png"),
    qty: 10,
  },

  {
    id: 1,
    name: "Carrot",
    price: "100",
    image: require("../assets/veg/carrot.png"),
    qty: 10,
  },

  {
    id: 1,
    name: "Chilli",
    price: "100",
    image: require("../assets/veg/chilli.png"),
    qty: 10,
  },

  {
    id: 1,
    name: "Coriander",
    price: "100",
    image: require("../assets/veg/coriander.png"),
    qty: 10,
  },
];

export const cart = [
  {
    id: 1,
    name: "Meat",
    price: "5000",
    qty: 1,
    image: require("../assets/images/redmeat.png"),
    color: (opacity) => `rgba(251, 216, 146, ${opacity})`,
  },
  {
    id: 1,
    name: "Tomato",
    price: "1200",
    qty: 1,
    image: require("../assets/veg/tomato.png"),
    color: (opacity) => `rgba(251, 216, 146, ${opacity})`,
  },
  {
    id: 1,
    name: "Grapes",
    price: "1000",
    qty: 1,
    image: require("../assets/images/grapes.png"),
    color: (opacity) => `rgba(251, 216, 146, ${opacity})`,
  },
  {
    id: 1,
    name: "Fish",
    price: "3000",
    qty: 1,
    image: require("../assets/images/fish.png"),
    color: (opacity) => `rgba(251, 216, 146, ${opacity})`,
  },
  {
    id: 1,
    name: "Chicken",
    price: "4000",
    qty: 1,
    image: require("../assets/images/chicken.png"),
    color: (opacity) => `rgba(251, 216, 146, ${opacity})`,
  },
];

export const fruit = [
  {
    id: 1,
    SellerName: "Ali Ahmed",
    name: "Red Orange",
    price: "100",
    image: require("../assets/images/redOrange.png"),
    qty: 10,
  },
  {
    id: 1,
    SellerName: "Ali Ahmed",
    name: "Peach",
    price: "100",
    image: require("../assets/images/peach.png"),
    qty: 10,
  },
  {
    id: 1,
    SellerName: "Ali Ahmed",
    name: "Grapes",
    price: "100",
    image: require("../assets/images/grapes.png"),
    qty: 10,
  },
  {
    id: 1,
    SellerName: "Ali Ahmed",
    name: "Apple",
    price: "100",
    image: require("../assets/images/greenApple.png"),
    qty: 10,
  },
  {
    id: 1,
    SellerName: "Ali Ahmed",
    name: "Orange",
    price: "100",
    image: require("../assets/images/orange.png"),
    qty: 10,
  },
  {
    id: 1,
    SellerName: "Ali Ahmed",
    name: "Cherry",
    price: "100",
    image: require("../assets/fruit/cherry.png"),
    qty: 10,
  },
  {
    id: 1,
    SellerName: "Ali Ahmed",
    name: "Kiwi",
    price: "100",
    image: require("../assets/fruit/kiwi.png"),
    qty: 10,
  },
  {
    id: 1,
    SellerName: "Ali Ahmed",
    name: "Mango",
    price: "100",
    image: require("../assets/fruit/mango.png"),
    qty: 10,
  },
  {
    id: 1,
    SellerName: "Ali Ahmed",
    name: "Pineapple",
    price: "100",
    image: require("../assets/fruit/pineapple.png"),
    qty: 10,
  },
  {
    id: 1,
    SellerName: "Ali Ahmed",
    name: "Pomegranate",
    price: "100",
    image: require("../assets/fruit/pomegranate.png"),
    qty: 10,
  },
  {
    id: 1,
    SellerName: "Ali Ahmed",
    name: "Raspberry",
    price: "100",
    image: require("../assets/fruit/raspberry.png"),
    qty: 10,
  },
  {
    id: 1,
    SellerName: "Ali Ahmed",
    name: "Strawberry",
    price: "100",
    image: require("../assets/fruit/strawberry.png"),
    qty: 10,
  },
  {
    id: 1,
    SellerName: "Ali Ahmed",
    name: "Watermelon",
    price: "100",
    image: require("../assets/fruit/watermelon.png"),
    qty: 10,
  },
];

export const fish = [
  {
    id: 1,
    SellerName: "Ali Ahmed",
    name: "Atlantic Fish",
    price: "100",
    image: require("../assets/Fish/atlanticFish.png"),
    qty: 10,
  },
  {
    id: 2,
    SellerName: "Ali Ahmed",
    name: "Crab",
    price: "100",
    image: require("../assets/Fish/crab.png"),
    qty: 10,
  },
  {
    id: 3,
    SellerName: "Ali Ahmed",
    name: "Gray and blue Tuna Fish",
    price: "100",
    image: require("../assets/Fish/grayAndblueTunaFisha.png"),
    qty: 10,
  },
  {
    id: 4,
    SellerName: "Ali Ahmed",
    name: "Lobster",
    price: "100",
    image: require("../assets/Fish/lobster.png"),
    qty: 10,
  },
  {
    id: 5,
    SellerName: "Ali Ahmed",
    name: "Nile Fish",
    price: "100",
    image: require("../assets/Fish/nileFish.png"),
    qty: 10,
  },
  {
    id: 6,
    SellerName: "Ali Ahmed",
    name: "Prawns",
    price: "100",
    image: require("../assets/Fish/prawn.png"),
    qty: 10,
  },
  {
    id: 7,
    SellerName: "Ali Ahmed",
    name: "Salmon Fish",
    price: "100",
    image: require("../assets/Fish/salmonFish.png"),
    qty: 10,
  },
  {
    id: 8,
    SellerName: "Ali Ahmed",
    name: "Salt water Fish",
    price: "100",
    image: require("../assets/Fish/saltwaterFish.png"),
    qty: 10,
  },
  {
    id: 9,
    SellerName: "Ali Ahmed",
    name: "Shrimp",
    price: "100",
    image: require("../assets/Fish/shrimp.png"),
    qty: 10,
  },
];

export const meat = [
  {
    id: 1,
    SellerName: "Ali Ahmed",
    name: "Camel Meat",
    price: "100",
    image: require("../assets/meat/camelmeat.png"),
    qty: 10,
  },
  {
    id: 2,
    SellerName: "Ali Ahmed",
    name: "Chicken leg",
    price: "100",
    image: require("../assets/meat/chcikenleg.png"),
    qty: 10,
  },
  {
    id: 3,
    SellerName: "Ali Ahmed",
    name: "Chicken",
    price: "100",
    image: require("../assets/meat/chicken.png"),
    qty: 10,
  },

  {
    id: 5,
    SellerName: "Ali Ahmed",
    name: "Chicken wings",
    price: "100",
    image: require("../assets/meat/chickenwings.png"),
    qty: 10,
  },
  {
    id: 6,
    SellerName: "Ali Ahmed",
    name: "Fresh raw meat",
    price: "100",
    image: require("../assets/meat/freshrawmeat.png"),
    qty: 10,
  },
  {
    id: 7,
    SellerName: "Ali Ahmed",
    name: "Goat meat",
    price: "100",
    image: require("../assets/meat/goatmeat.png"),
    qty: 10,
  },
  {
    id: 8,
    SellerName: "Ali Ahmed",
    name: "Ground meat",
    price: "100",
    image: require("../assets/meat/groundmeat.png"),
    qty: 10,
  },
  {
    id: 9,
    SellerName: "Ali Ahmed",
    name: "Lamb meat",
    price: "100",
    image: require("../assets/meat/lambmeat.png"),
    qty: 10,
  },
  {
    id: 10,
    SellerName: "Ali Ahmed",
    name: "Meat beaf steak",
    price: "100",
    image: require("../assets/meat/meatbeefsteak.png"),
    qty: 10,
  },
  {
    id: 11,
    SellerName: "Ali Ahmed",
    name: "Ribs meat",
    price: "100",
    image: require("../assets/meat/ribsmeat.png"),
    qty: 10,
  },
  {
    id: 12,
    SellerName: "Ali Ahmed",
    name: "Sliced raw meat",
    price: "100",
    image: require("../assets/meat/slicedrawmeat.png"),
    qty: 10,
  },
  {
    id: 4,
    SellerName: "Ali Ahmed",
    name: "Chicken breast",
    price: "100",
    image: require("../assets/meat/chickenbreast.png"),
    qty: 10,
  },
];

export const spices = [
  {
    id: 1,
    SellerName: "Ali Ahmed",
    name: "Black Pepper",
    price: "100",
    image: require("../assets/spices/blackpepper.png"),
    qty: 10,
  },
  {
    id: 2,
    SellerName: "Ali Ahmed",
    name: "Cardamom",
    price: "100",
    image: require("../assets/spices/cardamom.png"),
    qty: 10,
  },
  {
    id: 3,
    SellerName: "Ali Ahmed",
    name: "Chilli Powder",
    price: "100",
    image: require("../assets/spices/chillipowder.png"),
    qty: 10,
  },
  {
    id: 4,
    SellerName: "Ali Ahmed",
    name: "Cinnamon",
    price: "100",
    image: require("../assets/spices/cinnamon.png"),
    qty: 10,
  },
  {
    id: 5,
    SellerName: "Ali Ahmed",
    name: "Cloves",
    price: "100",
    image: require("../assets/spices/cloves.png"),
    qty: 10,
  },
  {
    id: 6,
    SellerName: "Ali Ahmed",
    name: "Coriander Powder",
    price: "100",
    image: require("../assets/spices/corianderpowder.png"),
    qty: 10,
  },
  {
    id: 7,
    SellerName: "Ali Ahmed",
    name: "Cumin Seeds",
    price: "100",
    image: require("../assets/spices/cuminseed.png"),
    qty: 10,
  },
  {
    id: 8,
    SellerName: "Ali Ahmed",
    name: "Salt",
    price: "100",
    image: require("../assets/spices/salt.png"),
    qty: 10,
  },
  {
    id: 9,
    SellerName: "Ali Ahmed",
    name: "Star Anise",
    price: "100",
    image: require("../assets/spices/starAnise.png"),
    qty: 10,
  },
  {
    id: 10,
    SellerName: "Ali Ahmed",
    name: "Turmeric Powder",
    price: "100",
    image: require("../assets/spices/turmericpowder.png"),
    qty: 10,
  },
];

export const dairy = [
  {
    id: 1,
    SellerName: "Ali Ahmed",
    name: "Butter",
    price: "100",
    image: require("../assets/dairy/butter.png"),
    qty: 10,
  },
  {
    id: 2,
    SellerName: "Ali Ahmed",
    name: "Cheese",
    price: "100",
    image: require("../assets/dairy/cheese.png"),
    qty: 10,
  },
  {
    id: 3,
    SellerName: "Ali Ahmed",
    name: "Eggs",
    price: "100",
    image: require("../assets/dairy/eggs.png"),
    qty: 10,
  },
  {
    id: 4,
    SellerName: "Ali Ahmed",
    name: "Milk",
    price: "100",
    image: require("../assets/dairy/milk.png"),
    qty: 10,
  },
  {
    id: 5,
    SellerName: "Ali Ahmed",
    name: "White Cheese",
    price: "100",
    image: require("../assets/dairy/whitecheese.png"),
    qty: 10,
  },
  {
    id: 6,
    SellerName: "Ali Ahmed",
    name: "White Cream",
    price: "100",
    image: require("../assets/dairy/whitecream.png"),
    qty: 10,
  },
  {
    id: 7,
    SellerName: "Ali Ahmed",
    name: "Yougurt",
    price: "100",
    image: require("../assets/dairy/yougurt.png"),
    qty: 10,
  },
];

export const orderhistory = [
  {
    id: 1,
    items: "Meat, Tomato, Grapes, Fish, Chicken",
    Total: "50,200",
    image: require("../assets/images/groc1.png"),
  },
  {
    id: 2,
    items: "Salt, Tomato, Onion",
    Total: "2000",
    image: require("../assets/images/groc2.png"),
  },
  {
    id: 3,
    items: "Meat, Fish, Chicken",
    Total: "10,000",
    image: require("../assets/images/groc3.png"),
  },
  {
    id: 4,
    items: "Tomato, Chicken",
    Total: "5000",
    image: require("../assets/images/groc4.png"),
  },
];
