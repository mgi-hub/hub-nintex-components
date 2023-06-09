import {
  html,
  LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";
export class HelloWorld extends LitElement {
  static properties = {
    who: { type: String },
  };

  static getMetaConfig() {
    return {
      controlName: "Hello World",
      fallbackDisableSubmit: false,
      version: "1.2",
      properties: {
        who: {
          type: "string",
          title: "Who",
          description: "Who to say hello to",
        },
      },
    };
  }

  constructor() {
    super();
    this.who = "World";
  }

  render() {
    return html`<p>Hello ${this.who}</p>
      <p />`;
  }
}

const elementName = "hello-world";
customElements.define(elementName, HelloWorld);
