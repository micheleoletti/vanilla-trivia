import { exampleQuestions } from "./utils.js";

export const triviaCategories = {
  any: "Any Category",
  9: "General Knowledge",
  Entertainment: {
    10: "Books",
    11: "Film",
    12: "Music",
    13: "Musicals & Theatres",
    14: "Television",
    15: "Video Games",
    16: "Board Games",
    29: "Comics",
    31: "Japanese Anime & Manga",
    32: "Cartoon & Animations",
  },
  Science: {
    17: "Science & Nature",
    18: "Computers",
    19: "Mathematics",
    30: "Gadgets",
  },
  Other: {
    20: "Mythology",
    21: "Sports",
    22: "Geography",
    23: "History",
    24: "Politics",
    25: "Art",
    26: "Celebrities",
    27: "Animals",
    28: "Vehicles",
  },
};

export const triviaDifficulties = {
  any: "Any Difficulty",
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

export const triviaTypes = {
  any: "Any Type",
  multiple: "Multiple Choice",
  boolean: "True / False",
};

export async function fetchTrivia({
  amount = 10,
  category,
  difficulty,
  questionType,
}) {
  const params = new URLSearchParams({ amount });

  if (category && category !== "any") {
    params.append("category", category);
  }
  if (difficulty && difficulty !== "any") {
    params.append("difficulty", difficulty);
  }
  if (questionType && questionType !== "any") {
    params.append("type", questionType);
  }

  const endpoint = `https://opentdb.com/api.php?${params.toString()}`;

  try {
    const response = await fetch(endpoint);
    if (response.status === 429) {
      console.warn("Too many requests, returning example questions.");
      return exampleQuestions;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Failed to fetch trivia:", error);
    throw error;
  }
}
