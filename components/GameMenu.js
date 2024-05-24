import {
  triviaCategories,
  triviaDifficulties,
  triviaTypes,
} from "../lib/trivia.js";
import { BaseElement } from "./Base.js";
import { createOption, createOptgroup } from "../lib/utils.js";

const initialState = {
  category: "any",
  difficulty: "any",
  questionType: "any",
};

class GameMenu extends BaseElement {
  constructor() {
    super();

    this.state = { ...initialState };
  }

  startGame() {
    const event = new CustomEvent("startGame", {
      detail: this.state,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  createCategorySelect(container) {
    const categorySelect = container.querySelector("#menu-select-category");
    Object.entries(triviaCategories).forEach(([key, value]) => {
      if (typeof value === "string") {
        categorySelect.appendChild(createOption(key, value));
      } else {
        categorySelect.appendChild(createOptgroup(key, Object.entries(value)));
      }
    });

    categorySelect.value = this.state.category;

    categorySelect.addEventListener("change", (e) => {
      this.setState({ ...this.state, category: e.target.value });
    });
  }

  createDifficultyButtons(container) {
    const difficultyButtonGroup = container.querySelector(
      ".button-group.difficulty"
    );
    const buttons = Object.entries(triviaDifficulties).map(([key, value]) => {
      const button = document.createElement("button");
      button.setAttribute("data-key", key);
      button.textContent = value;
      button.addEventListener("click", () => {
        this.setState({ ...this.state, difficulty: button.dataset.key });
      });

      if (this.state.difficulty === key) {
        button.classList.add("selected");
      }

      return button;
    });

    difficultyButtonGroup.replaceChildren(...buttons);
  }

  createQuestionTypeButtons(container) {
    const questionTypeGroup = container.querySelector(
      ".button-group.question-type"
    );
    const buttons = Object.entries(triviaTypes).map(([key, value]) => {
      const button = document.createElement("button");
      button.setAttribute("data-key", key);
      button.textContent = value;
      button.addEventListener("click", () => {
        this.setState({ ...this.state, questionType: button.dataset.key });
      });

      if (this.state.questionType === key) {
        button.classList.add("selected");
      }

      return button;
    });

    questionTypeGroup.replaceChildren(...buttons);
  }

  setupStartGameButton(template) {
    const startGameButton = template.querySelector(".action");
    startGameButton.addEventListener("click", () => {
      this.startGame();
    });
  }

  render() {
    const template = document
      .getElementById("game-menu")
      .content.cloneNode(true);

    this.createCategorySelect(template);
    this.createDifficultyButtons(template);
    this.createQuestionTypeButtons(template);
    this.setupStartGameButton(template);

    return template;
  }

  onStateUpdate() {
    this.createDifficultyButtons(this);
    this.createQuestionTypeButtons(this);
  }

  updateCategory() {
    const selectElement = this.querySelector("select");
    if (this.state.category) {
      selectElement.value = this.state.category;
    }
  }
}
customElements.define("game-menu", GameMenu);
