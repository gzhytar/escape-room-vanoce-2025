export interface Riddle {
  id: number;
  title: string;
  description: string;
  clue: string;
  validAnswers: string[];
  rewardLetter: string;
  gridLabel: string;
}

export const RIDDLES: Riddle[] = [
  {
    id: 1,
    title: "The Boy Who Lived",
    description: "I am the lightning-shaped mark on a hero’s brow, a symbol of a curse that failed, and the first letter of the surname of the boy who grew up under the stairs.",
    clue: "Letter 1: _",
    validAnswers: ["potter", "harry potter"],
    rewardLetter: "P",
    gridLabel: "⚡"
  },
  {
    id: 2,
    title: "The Giant's View",
    description: "I am a giant wheel of steel on the South Bank, turning slowly to show you the city's heart. Take the first letter of this 'Observation' wheel’s common name.",
    clue: "Letter 2: _",
    validAnswers: ["london eye", "the london eye", "eye"],
    rewardLetter: "L",
    gridLabel: "🎡"
  },
  {
    id: 3,
    title: "The Royal Coronation",
    description: "Kings and Queens have been crowned within my Gothic walls since 1066. I am a grand Abbey. Take the first letter of my name.",
    clue: "Letter 3: _",
    validAnswers: ["abbey", "westminster", "westminster abbey"],
    rewardLetter: "A",
    gridLabel: "⛪"
  },
  {
    id: 4,
    title: "The Liquid History",
    description: "I snake through the city, older than the Romans. I have seen the Great Fire and the Viking ships. I am the River...",
    clue: "Letter 4: _",
    validAnswers: ["thames", "river thames", "the thames"],
    rewardLetter: "T",
    gridLabel: "🌊"
  },
  {
    id: 5,
    title: "The Phoenix’s Flight",
    description: "I am Dumbledore’s loyal companion, a bird of red and gold who rises from the ashes. Take the first letter of my name.",
    clue: "Letter 5: F _ _ _ _ _",
    validAnswers: ["fawkes"],
    rewardLetter: "F",
    gridLabel: "🔥"
  },
  {
    id: 6,
    title: "The Wand Maker",
    description: "In a dusty shop in Diagon Alley, I remember every wand I’ve ever sold. I am _ _ _ _ _ _ _ _ _ _.",
    clue: "Letter 6: _",
    validAnswers: ["ollivander", "ollivanders", "garrick ollivander"],
    rewardLetter: "O",
    gridLabel: "🪄"
  },
  {
    id: 7,
    title: "The Tower Guardians",
    description: "Legend says if we ever leave the Tower of London, the Kingdom will fall. We are the large black birds.",
    clue: "Letter 7: _",
    validAnswers: ["ravens", "the ravens", "raven"],
    rewardLetter: "R",
    gridLabel: "🐦"
  },
  {
    id: 8,
    title: "The Ordinary Folk",
    description: "In the wizarding world, this is what you call those who possess no magic.",
    clue: "Letter 8: _",
    validAnswers: ["muggle", "muggles"],
    rewardLetter: "M",
    gridLabel: "🤷"
  },
  {
    id: 9,
    title: "The Purple Ride",
    description: "I am a triple-decker bus for the stranded witch or wizard. Just stick out your wand hand. I am the _ _ _ _ _ Bus.",
    clue: "Letter 9: _",
    validAnswers: ["night", "knight", "knight bus", "the knight bus"],
    rewardLetter: "N",
    gridLabel: "🚌"
  },
  {
    id: 10,
    title: "The Unseen Gift",
    description: "One of the three Deathly Hallows, I allow the wearer to walk unseen through the halls of Hogwarts. I am the _ _ _ _ _ _ _ _ _ _ _ _ Cloak.",
    clue: "Letter 10: _",
    validAnswers: ["invisibility", "invisibility cloak", "the invisibility cloak"],
    rewardLetter: "I",
    gridLabel: "🧥"
  },
  {
    id: 11,
    title: "The Admiral’s Square",
    description: "I stand atop a tall column in Trafalgar Square, guarded by four bronze lions. My name is Admiral _ _ _ _ _ _.",
    clue: "Letter 11: _",
    validAnswers: ["nelson", "horatio nelson", "admiral nelson"],
    rewardLetter: "N",
    gridLabel: "⚓"
  },
  {
    id: 12,
    title: "The Clock’s Keeper",
    description: "While many call me Big Ben, that is just my bell. I am actually the _ _ _ _ _ _ _ _ _ Tower.",
    clue: "Letter 12: _",
    validAnswers: ["elizabeth", "elizabeth tower", "the elizabeth tower", "st stephens tower"],
    rewardLetter: "E",
    gridLabel: "🕰️"
  }
];

export const FINAL_PASSWORD = "PLATFORM NINE";
