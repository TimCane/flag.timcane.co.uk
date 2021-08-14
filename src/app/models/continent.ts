import { Country } from "./country";

export interface Continent {
    id: string;
    name: string;
    countries: Country[];
}
