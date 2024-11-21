// api url (where your server is hosted at)
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
const COLORS = {
  COST: "orange",
  POWER: "#a31545",
  HP: "#3f51b5"
};
const SET_ORDER = {
  SOR: 1,
  SHD: 2,
  TWI: 3
};
const ASPECT_ORDER = {
  "Vigilance_Villainy": 1,
  "Vigilance_Heroism": 2,
  "Vigilance": 3,
  "Command_Villainy": 4,
  "Command_Heroism": 5,
  "Command": 6,
  "Aggression_Villainy": 7,
  "Aggression_Heroism": 8,
  "Aggression": 9,
  "Cunning_Villainy": 10,
  "Cunning_Heroism": 11,
  "Cunning": 12,
  "Villainy": 13,
  "Heroism": 14,
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

export {
  BACKEND_URL,
  COLORS,
  SET_ORDER,
  ASPECT_ORDER,
  RARITY_ORDER,
  TYPE_ORDER
};
