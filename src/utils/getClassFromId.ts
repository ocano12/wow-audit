export type classMap = {
    [key: string]: string;
};

export const getClassFromID = (classID: number) => {
    const classMap: classMap = {
        '1': 'warrior',
        '2': 'paladin',
        '3': 'hunter',
        '4': 'rogue',
        '5': 'priest',
        '6': 'deathknight',
        '7': 'shaman',
        '8': 'mage',
        '9': 'warlock',
        '10': 'monk',
        '11': 'druid',
        '12': 'demonhunter',
        '13': 'evoker',
    };

    return classMap[classID] || 'unknown';
};
