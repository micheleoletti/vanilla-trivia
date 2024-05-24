import { BaseElement } from "./Base.js";
import { fetchTrivia } from "../lib/trivia.js";

class GameScreen extends BaseElement {
  constructor() {
    super();
    this.state.scene = "menu";
  }

  onMount() {
    this.addEventListener("startGame", this.handleStartGame.bind(this));
    this.addEventListener("gameEnded", this.handleGameEnded.bind(this));
    this.addEventListener("playAgain", this.handlePlayAgain.bind(this));
  }

  handleGameEnded(event) {
    const { score } = event.detail;
    this.setState({
      scene: "ended",
      score,
    });

    this.renderComponent();
  }

  handlePlayAgain() {
    this.setState({
      scene: "menu",
    });

    this.renderComponent();
  }

  async handleStartGame(event) {
    const { amount, category, difficulty, questionType } = event.detail;

    const questions = await fetchTrivia({
      amount,
      category,
      difficulty,
      questionType,
    });

    if (questions.length === 0) {
      alert("That's odd! No questions found, try something else.");
      return;
    }

    this.fadeOutMenu();

    this.setState({
      ...this.state,
      scene: "game",
      questions,
    });

    this.renderComponent();
  }

  fadeOutMenu() {
    const mainTitle = this.querySelector("game-menu .main-title");
    const card = this.querySelector("game-menu div.card");

    [mainTitle, card].forEach((element) => {
      element.classList.remove("delay-sm", "delay-md");
    });

    mainTitle.classList.add("fade-out-right");
    card.classList.add("fade-out-right", "delay-xs");
  }

  renderMenu() {
    return document.createElement("game-menu");
  }

  renderGame() {
    const gameView = document.createElement("game-view");
    gameView.setState({
      ...gameView.state,
      questions: this.state.questions,
    });

    return gameView;
  }

  renderGameEnded() {
    const gameEnded = document.createElement("game-ended");

    gameEnded.setState({
      ...gameEnded.state,
      score: this.state.score,
    });

    return gameEnded;
  }

  render() {
    if (this.state.scene === "menu") {
      return this.renderMenu();
    }

    if (this.state.scene === "game") {
      return this.renderGame();
    }

    if (this.state.scene === "ended") {
      return this.renderGameEnded();
    }
  }
}

customElements.define("game-screen", GameScreen);
