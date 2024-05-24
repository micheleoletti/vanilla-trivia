import { importStyleSheet } from "../lib/utils.js";

/**
 * BaseElement is a base class that provides a basic structure for building web components.
 * It provides basic state management, lifecycle hooks, and an easy way to import stylesheets.
 */
export class BaseElement extends HTMLElement {
  constructor() {
    super();
    this.state = {};
    this.stylesheetUrls = [];
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.onStateUpdate();
  }

  setStylesheetUrls(stylesheetUrls) {
    this.stylesheetUrls = stylesheetUrls;
    this.reloadStylesheets();
  }

  connectedCallback() {
    this.renderComponent();
    this.reloadStylesheets();
    this.onMount();
  }

  reloadStylesheets() {
    this.stylesheetUrls.forEach((stylesheetUrl) => {
      const stylesheet = importStyleSheet(stylesheetUrl);
      this.appendChild(stylesheet);
    });
  }

  disconnectedCallback() {
    this.onUnmount();
  }

  onMount() {}
  onUnmount() {}
  onStateUpdate() {}
  onRender() {}

  renderComponent() {
    this.replaceChildren(this.render());
  }
}

export class BaseShadowElement extends BaseElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  reloadStylesheets() {
    this.stylesheetUrls.forEach((stylesheetUrl) => {
      const stylesheet = importStyleSheet(stylesheetUrl);
      this.shadowRoot.appendChild(stylesheet);
    });
  }

  renderComponent() {
    this.shadowRoot.innerHTML = this.render();
  }
}
