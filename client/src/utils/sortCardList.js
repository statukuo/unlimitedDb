import { ASPECT_ORDER, RARITY_ORDER, SET_ORDER, TYPE_ORDER } from "../constants";

export function sortList(array, sortCriteria) {
    return [...array].sort((a, b) => {
        if (sortCriteria === "aspect") {
            return (
                ASPECT_ORDER[a.aspects.join("_")] -
                ASPECT_ORDER[b.aspects.join("_")] ||
                SET_ORDER[a.set] - SET_ORDER[b.set] ||
                a.number - b.number
            );
        }

        if (sortCriteria === "cost") {
            return (
                a.cost - b.cost ||
                SET_ORDER[a.set] - SET_ORDER[b.set] ||
                a.number - b.number
            );
        }

        if (sortCriteria === "set") {
            return SET_ORDER[a.set] - SET_ORDER[b.set] || a.number - b.number;
        }

        if (sortCriteria === "type") {
            return (
                TYPE_ORDER[a.type] - TYPE_ORDER[b.type] ||
                SET_ORDER[a.set] - SET_ORDER[b.set] ||
                a.number - b.number
            );
        }

        if (sortCriteria === "rarity") {
            return (
                RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity] ||
                ASPECT_ORDER[a.aspects.join("_")] -
                ASPECT_ORDER[b.aspects.join("_")] ||
                SET_ORDER[a.set] - SET_ORDER[b.set] ||
                a.number - b.number
            );
        }
    });
};
