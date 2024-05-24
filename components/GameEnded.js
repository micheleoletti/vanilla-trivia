import { BaseElement } from "./Base.js";

class GameEnded extends BaseElement {
  constructor() {
    super();

    this.state = {
      score: 0,
    };
  }

  onMount() {
    this.state.score = this.state.score;
  }

  render() {
    const template = document
      .getElementById("game-ended")
      .content.cloneNode(true);

    template.querySelector(".score-value").textContent = this.state.score;

    template.querySelector(".play-again").addEventListener("click", () => {
      const event = new CustomEvent("playAgain", { bubbles: true });
      this.dispatchEvent(event);
    });

    return template;
  }
}

customElements.define("game-ended", GameEnded);
