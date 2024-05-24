import { BaseElement } from "./Base.js";

const booleanAnswers = ["True", "False"];

class GameView extends BaseElement {
  constructor() {
    super();

    this.state = {
      score: 0,
      questions: [],
      currentQuestionIndex: 0,
      userAnswers: new Map(),
    };
  }

  onMount() {
    this.setStylesheetUrls(["./components/GameView.css"]);
  }

  get currentQuestion() {
    if (this.state.questions.length === 0) {
      return null;
    }

    return this.state.questions[this.state.currentQuestionIndex];
  }

  createAnswerButtons(container) {
    const buttonGroup = container.querySelector(".answer-buttons");

    let answers = [];

    if (this.currentQuestion.type === "boolean") {
      answers = booleanAnswers;
    } else {
      answers = [
        ...this.currentQuestion.incorrect_answers,
        this.currentQuestion.correct_answer,
      ].sort(() => Math.random() - 0.5);
    }

    const answerButtons = answers.map((answer) => {
      const button = document.createElement("button");
      button.dataset.answer = answer;
      button.innerHTML = answer;
      button.addEventListener("click", () => {
        this.setUserAnswer(answer);
        this.refreshAnswerButtons(this);
      });

      return button;
    });

    buttonGroup.replaceChildren(...answerButtons);
  }

  async refreshAnswerButtons(container) {
    const answerButtons = container.querySelectorAll(".answer-buttons button");
    answerButtons.forEach((button) => {
      button.classList.remove("correct", "incorrect");
    });

    const userAnswer = this.state.userAnswers.get(
      this.state.currentQuestionIndex
    );

    if (!userAnswer) return;

    const userAnswerButton = Array.from(answerButtons).find(
      (button) => button.dataset.answer === userAnswer.userAnswer
    );

    if (userAnswer.isCorrect) {
      userAnswerButton.classList.add("correct");
    } else {
      userAnswerButton.classList.add("incorrect");
      const correctAnswerButton = Array.from(answerButtons).find(
        (button) =>
          button.dataset.answer === this.currentQuestion.correct_answer
      );
      correctAnswerButton.classList.add("correct");
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.fadeOutQuestion(this);

    await new Promise((resolve) => setTimeout(resolve, 100));
    this.goToNextQuestion();
    this.fadeInQuestion(this);
  }

  fadeOutQuestion(container) {
    container.querySelector(".card").classList.remove("fade-in-left");
    container.querySelector(".card").classList.add("fade-out-right");
  }

  fadeInQuestion(container) {
    container.querySelector(".card").classList.remove("fade-out-right");
    container.querySelector(".card").classList.add("fade-in-left");
  }

  goToNextQuestion() {
    const nextQuestionIndex = this.state.currentQuestionIndex + 1;

    if (nextQuestionIndex >= this.state.questions.length) {
      const correctQuestions = Array.from(
        this.state.userAnswers.values()
      ).filter((answer) => answer.isCorrect).length;

      const event = new CustomEvent("gameEnded", {
        detail: { score: correctQuestions },
        bubbles: true,
      });
      this.dispatchEvent(event);
      return;
    }

    this.setState({
      ...this.state,
      currentQuestionIndex: nextQuestionIndex,
    });

    this.refreshQuestion(this);
    this.createAnswerButtons(this);
  }

  refreshQuestion(container) {
    container.querySelector(".current-question-index").textContent =
      this.state.currentQuestionIndex + 1;
    container.querySelector(".total-questions").textContent =
      this.state.questions.length;
    container.querySelector(".current-question-text").innerHTML =
      this.currentQuestion.question;
  }

  setupActionButtons() {
    const actionButtons = this.querySelector(".action-buttons");
    actionButtons.appendChild(this.generateActionButtons());
  }

  createQuestionsOverview(container) {
    const overviewContainer = container.querySelector(".questions-overview");

    const bars = this.state.questions.map((question, index) => {
      const questionBar = document.createElement("div");
      questionBar.classList.add("question-bar");

      const userAnswer = this.state.userAnswers.get(index);
      if (userAnswer) {
        if (userAnswer.isCorrect) {
          questionBar.classList.add("correct");
        } else {
          questionBar.classList.add("incorrect");
        }
      }

      return questionBar;
    });

    overviewContainer.replaceChildren(...bars);
  }

  render() {
    if (this.state.questions.length === 0) {
      return null;
    }

    const template = document
      .getElementById("game-view")
      .content.cloneNode(true);

    this.refreshQuestion(template);
    this.createAnswerButtons(template);
    this.createQuestionsOverview(template);

    return template;
  }

  setUserAnswer(userAnswer) {
    const answer = {
      userAnswer,
      correctAnswer: this.currentQuestion.correct_answer,
      isCorrect: userAnswer === this.currentQuestion.correct_answer,
    };

    const updatedUserAnswers = new Map(this.state.userAnswers);
    updatedUserAnswers.set(this.state.currentQuestionIndex, answer);

    this.setState({
      ...this.state,
      userAnswers: updatedUserAnswers,
    });

    this.createQuestionsOverview(this);
  }
}

customElements.define("game-view", GameView);
