// api url (where your server is hosted at)
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
const COLORS = {
  COST: "orange",
  POWER: "#a31545",
  HP: "#3f51b5",
  TAG_BACKGROUND: "#455A64",
  Vigilance: "#6694ce",
  Command: "#41ad49",
  Aggression: "#d2232a",
  Cunning: "#fdb933",
  Villainy: "#040004",
  Heroism: "#c6c1a0",
  "": "",
  "Vigilance_Heroism": "#91a8b9",
  "Vigilance_Villainy": "#354a69",
  "Vigilance_Vigilance": "#6694ce",
  "Command_Heroism": "##8ab879",
  "Command_Villainy": "##225626",
  "Command_Command": "#41ad49",
  "Aggression_Heroism": "#cb7a6b",
  "Aggression_Villainy": "#6b1217",
  "Aggression_Aggression": "#d2232a",
  "Cunning_Heroism": "#dcbe74",
  "Cunning_Villainy": "#805c1c",
  "Cunning_Cunning": "#fdb933",
  "Common": "#4E342E",
  "Uncommon": "#BDBDBD",
  "Special": "#212121",
  "Rare": "#FFC400",
  "Legendary": "#26C6DA"
};
const SET_ORDER = {
  SOR: 1,
  SHD: 2,
  TWI: 3
};
const ASPECT_ORDER = {
  "Vigilance_Villainy": 1,
  "Vigilance_Heroism": 2,
  "Vigilance_Vigilance": 3,
  "Vigilance": 4,
  "Command_Villainy": 5,
  "Command_Heroism": 6,
  "Command_Command": 7,
  "Command": 8,
  "Aggression_Villainy": 9,
  "Aggression_Heroism": 10,
  "Aggression_Aggression": 11,
  "Aggression": 12,
  "Cunning_Villainy": 13,
  "Cunning_Heroism": 14,
  "Cunning_Cunning": 15,
  "Cunning": 16,
  "Villainy": 17,
  "Heroism": 18,
  "": 15
};
const TYPE_ORDER = {
  "Unit": 1,
  "Upgrade": 2,
  "Event": 3
};
const RARITY_ORDER = {
  "Legendary": 1,
  "Rare": 2,
  "Uncommon": 3,
  "Common": 4,
  "Special": 5
};
const SIZES = {
  TAB_SIZE: 60,
  SMALL_TAB_SIZE: 30
};

export {
  BACKEND_URL,
  COLORS,
  SET_ORDER,
  ASPECT_ORDER,
  RARITY_ORDER,
  TYPE_ORDER,
  SIZES
};
