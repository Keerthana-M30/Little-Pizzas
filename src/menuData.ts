export interface MenuItemVariant {
  type: string;
  price: number;
}

export interface MenuItem {
  id: number;
  name: string;
  category: string;
  variants?: MenuItemVariant[];
  price?: number;
  icon: string;
  description?: string;
}

export interface MenuCategory {
  id: number;
  name: string;
  icon: string;
  items: MenuItem[];
}

export const MENU_CATEGORIES: MenuCategory[] = [
  // Combo boxes first as requested
  {
    id: 10,
    name: "3 'N' 1 Combo Box",
    icon: "🍕",
    items: [
      {
        id: 1001,
        name: "Classic Box",
        category: "3 'N' 1 Combo Box",
        description: "Veg + Corn + Paneer/Mushroom pizza",
        price: 149,
        icon: "🍕",
      },
      {
        id: 1002,
        name: "Spicy Box",
        category: "3 'N' 1 Combo Box",
        description: "Spicy Veg + Spicy Corn + Spicy Paneer/Mushroom pizza",
        price: 179,
        icon: "🌶️",
      },
      {
        id: 1003,
        name: "Mixed Box",
        category: "3 'N' 1 Combo Box",
        description: "Corn Mayo + Spicy Mushroom + Reg Paneer Pizza",
        price: 199,
        icon: "🧀",
      },
      {
        id: 1004,
        name: "Mayo Box",
        category: "3 'N' 1 Combo Box",
        description: "Veg Mayo + Corn Mayo + Paneer/Mushroom Mayo Pizza",
        price: 209,
        icon: "🧀",
      },
      {
        id: 1005,
        name: "Dessert Box",
        category: "3 'N' 1 Combo Box",
        description: "Oreo Pizza + KitKat Pizza + Jam Cheese",
        price: 239,
        icon: "🍫",
      },
    ],
  },
  {
    id: 11,
    name: "4 'N' 1 Family Combo Box",
    icon: "👨‍👩‍👧‍👦",
    items: [
      {
        id: 1101,
        name: "Family Box",
        category: "4 'N' 1 Family Combo Box",
        description:
          "Veg Pizza + Corn Mayo + Spicy Paneer + BBQ Mushroom pizza",
        price: 249,
        icon: "👨‍👩‍👧‍👦",
      },
    ],
  },
  {
    id: 12,
    name: "6 'N' 1 Birthday Treat Combo Box",
    icon: "🎉",
    items: [
      {
        id: 1201,
        name: "BDAY box",
        category: "6 'N' 1 Birthday Treat Combo Box",
        description:
          "Veg Cheese Pizza + Spicy corn pizza + Paneer Mayo Pizza + Spicy Mushroom Pizza + Pasta Cheese Pizza + Lays Cheese Pizza",
        price: 399,
        icon: "🎉",
      },
    ],
  },
  {
    id: 9,
    name: "Garlic Bread Combos",
    icon: "🧄",
    items: [
      {
        id: 901,
        name: "Combo 1",
        category: "Garlic Bread Combos",
        description: "Reg Shawarma + Cheese Garlic Bread + Sprite",
        price: 179,
        icon: "🧄",
      },
      {
        id: 902,
        name: "Combo 2",
        category: "Garlic Bread Combos",
        description: "Spicy Shawarma + Chilli Cheese Bread + Coke",
        price: 199,
        icon: "🧄",
      },
      {
        id: 903,
        name: "Combo 3",
        category: "Garlic Bread Combos",
        description: "Mushroom Garlic Bread + Crispy Fried Shawarma + Coke",
        price: 259,
        icon: "🧄",
      },
    ],
  },
  // All other categories in the requested order
  {
    id: 1,
    name: "Mini Pizzas",
    icon: "🍕",
    items: [
      {
        id: 101,
        name: "Veg",
        category: "Mini Pizzas",
        variants: [
          { type: "Reg", price: 39 },
          { type: "Spicy", price: 50 },
          { type: "Mayo", price: 60 },
        ],
        icon: "🍕",
      },
      {
        id: 102,
        name: "Corn",
        category: "Mini Pizzas",
        variants: [
          { type: "Reg", price: 50 },
          { type: "Spicy", price: 60 },
          { type: "Mayo", price: 70 },
        ],
        icon: "🌽",
      },
      {
        id: 103,
        name: "Mushroom",
        category: "Mini Pizzas",
        variants: [
          { type: "Reg", price: 60 },
          { type: "Spicy", price: 70 },
          { type: "Mayo", price: 80 },
        ],
        icon: "🍄",
      },
      {
        id: 104,
        name: "Paneer",
        category: "Mini Pizzas",
        variants: [
          { type: "Reg", price: 70 },
          { type: "Spicy", price: 80 },
          { type: "Mayo", price: 90 },
        ],
        icon: "🧀",
      },
      {
        id: 105,
        name: "Pasta",
        category: "Mini Pizzas",
        variants: [
          { type: "Reg", price: 80 },
          { type: "Spicy", price: 90 },
          { type: "Mayo", price: 100 },
        ],
        icon: "🍝",
      },
      {
        id: 106,
        name: "Maggi",
        category: "Mini Pizzas",
        variants: [
          { type: "Reg", price: 70 },
          { type: "Spicy", price: 80 },
          { type: "Mayo", price: 90 },
        ],
        icon: "🍜",
      },
      {
        id: 107,
        name: "Lays",
        category: "Mini Pizzas",
        variants: [
          { type: "Reg", price: 60 },
          { type: "Spicy", price: 70 },
          { type: "Mayo", price: 80 },
        ],
        icon: "🥔",
      },
    ],
  },
  {
    id: 2,
    name: "Choco Pizzas",
    icon: "🍫",
    items: [
      {
        id: 201,
        name: "Oreo Pizza",
        category: "Choco Pizzas",
        price: 80,
        icon: "🍪",
      },
      {
        id: 202,
        name: "Kitkat Pizza",
        category: "Choco Pizzas",
        price: 90,
        icon: "🍫",
      },
      {
        id: 203,
        name: "Brownie Pizza",
        category: "Choco Pizzas",
        price: 100,
        icon: "🍩",
      },
      {
        id: 204,
        name: "Jam Cheese Pizza",
        category: "Choco Pizzas",
        price: 80,
        icon: "🧀",
      },
      {
        id: 205,
        name: "Peanut Butter Pizza",
        category: "Choco Pizzas",
        price: 90,
        icon: "🥜",
      },
      {
        id: 206,
        name: "Choco Overload",
        category: "Choco Pizzas",
        price: 120,
        icon: "🍫",
      },
    ],
  },
  {
    id: 3,
    name: "Toasties",
    icon: "🥪",
    items: [
      {
        id: 301,
        name: "Cheese Garlic Bread",
        category: "Toasties",
        price: 90,
        icon: "🍞",
      },
      {
        id: 302,
        name: "Chilli Cheese Garlic Bread",
        category: "Toasties",
        price: 100,
        icon: "🌶️",
      },
    ],
  },
  {
    id: 4,
    name: "Bread Toasties",
    icon: "🍞",
    items: [
      {
        id: 401,
        name: "Crispy Cheese Burst",
        category: "Bread Toasties",
        variants: [
          { type: "Reg", price: 110 },
          { type: "Spicy", price: 120 },
          { type: "Mayo", price: 130 },
        ],
        icon: "🧀",
      },
    ],
  },
  {
    id: 5,
    name: "Mini Pizza Burger",
    icon: "🍔",
    items: [
      {
        id: 501,
        name: "Veg Cheese",
        category: "Mini Pizza Burger",
        price: 100,
        icon: "🍔",
      },
      {
        id: 502,
        name: "Chilli cheese",
        category: "Mini Pizza Burger",
        price: 110,
        icon: "🌶️",
      },
      {
        id: 503,
        name: "Corn Cheese",
        category: "Mini Pizza Burger",
        price: 120,
        icon: "🌽",
      },
    ],
  },
  {
    id: 6,
    name: "Shawarmas",
    icon: "🌯",
    items: [
      {
        id: 601,
        name: "Paneer shawarma",
        category: "Shawarmas",
        variants: [
          { type: "Reg", price: 80 },
          { type: "Spicy", price: 90 },
          { type: "BBQ", price: 90 },
        ],
        icon: "🧈",
      },
      {
        id: 602,
        name: "Crispy Fried shawarma",
        category: "Shawarmas",
        price: 130,
        icon: "🍟",
      },
    ],
  },
  {
    id: 7,
    name: "Nachos",
    icon: "🌮",
    items: [
      {
        id: 701,
        name: "Cheesy Nachos",
        category: "Nachos",
        price: 100,
        icon: "🧀",
      },
      {
        id: 702,
        name: "Peri Peri Nachos",
        category: "Nachos",
        price: 90,
        icon: "🌶️",
      },
    ],
  },
  {
    id: 8,
    name: "Wedges",
    icon: "🍟",
    items: [
      {
        id: 801,
        name: "Salted Wedges",
        category: "Wedges",
        price: 80,
        icon: "🍟",
      },
      {
        id: 802,
        name: "Peri Peri Wedges",
        category: "Wedges",
        price: 90,
        icon: "🌶️",
      },
      {
        id: 803,
        name: "Cheesy Wedges",
        category: "Wedges",
        price: 100,
        icon: "🧀",
      },
    ],
  },

  {
    id: 13,
    name: "Beverages",
    icon: "🥤",
    items: [
      {
        id: 1301,
        name: "Sprite",
        category: "Beverages",
        price: 20,
        icon: "🥤",
      },
      {
        id: 1303,
        name: "Coke",
        category: "Beverages",
        price: 20,
        icon: "🥤",
      },
      {
        id: 1304,
        name: "Water Bottle",
        category: "Beverages",
        price: 10,
        icon: "💧",
      },
    ],
  },
];
