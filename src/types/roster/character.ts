import { Key } from '../key';

export interface Character {
    key: Key;
    name: string;
    id: number;
    realm: {
        key: Key;
        id: number;
        slug: string;
    };
    level: number;
    playable_class: {
        key: Key;
        id: number;
        name: string;
    };
    playable_race: {
        key: Key;
        id: number;
    };
}
