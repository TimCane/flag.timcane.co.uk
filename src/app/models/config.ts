import { Continent } from "./continent";
import { Country } from "./country";

export interface Config {
    countries: Country[];
    continents: Continent[];
}
