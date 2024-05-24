export function importStyleSheet(url) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  return link;
}

export const exampleQuestions = [
  {
    type: "multiple",
    difficulty: "medium",
    category: "Entertainment: Video Games",
    question:
      "In the 1980s, a service called Gameline allowed users to download games to what console?",
    correct_answer: "Atari 2600",
    incorrect_answers: [
      "Sega Genesis",
      "Nintendo Entertainment System",
      "ColecoVision",
    ],
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "Entertainment: Video Games",
    question:
      "Which of these characters wasn&#039;t a villian in Club Penguin?",
    correct_answer: "The Director",
    incorrect_answers: ["Herbert P. Bear", "Tusk", "Ultimate Proto-Bot 10000"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Entertainment: Video Games",
    question: "What was the #1 selling game on Steam by revenue in 2016?",
    correct_answer: "Sid Meier&#039;s Civilization VI",
    incorrect_answers: [
      "Grand Theft Auto V",
      "Counter Strike: Global Offensive",
      "Dark Souls III",
    ],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "General Knowledge",
    question: "How would one say goodbye in Spanish?",
    correct_answer: "Adi&oacute;s",
    incorrect_answers: [" Hola", "Au Revoir", "Salir"],
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "History",
    question: "When did Lithuania declare independence from the Soviet Union?",
    correct_answer: "March 11th, 1990",
    incorrect_answers: [
      "December 25th, 1991",
      "December 5th, 1991",
      "April 20th, 1989",
    ],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Entertainment: Japanese Anime &amp; Manga",
    question:
      "What year did &quot;Bishoujo Senshi Sailor Moon&quot; air in Japan?",
    correct_answer: "1992",
    incorrect_answers: ["1989", "1990", "1994"],
  },
  {
    type: "boolean",
    difficulty: "hard",
    category: "Entertainment: Board Games",
    question:
      "The board game Go has more possible legal positions than the number of atoms in the visible universe.",
    correct_answer: "True",
    incorrect_answers: ["False"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "History",
    question: "What is the historical name of Sri Lanka?",
    correct_answer: "Ceylon",
    incorrect_answers: ["Myanmar", "Colombo", "Badulla"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Entertainment: Television",
    question:
      "In Game of Thrones, what continent lies across the Narrow Sea from Westeros?",
    correct_answer: "Essos",
    incorrect_answers: ["Easteros", "Westereast", "Esuntos"],
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "Science: Computers",
    question:
      "Lenovo acquired IBM&#039;s personal computer division, including the ThinkPad line of laptops and tablets, in what year?",
    correct_answer: "2005",
    incorrect_answers: ["1999", "2002", "2008"],
  },
];

export function createOption(key, value) {
  const option = document.createElement("option");
  option.value = key;
  option.textContent = value;
  return option;
}

export function createOptgroup(label, options) {
  const optgroup = document.createElement("optgroup");
  optgroup.label = label;
  options.forEach(([subKey, subValue]) => {
    optgroup.appendChild(createOption(subKey, subValue));
  });
  return optgroup;
}
