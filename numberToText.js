import { LitElement, css, html } from "lit";
import { ToWords } from "to-words";

export class HubNumberToText extends LitElement {
  @property({ type: String })
  convertedvalue = "";
  @property({ type: ToWords })
  toWords = new ToWords({ localeCode: "fr-FR" });
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    //Add custom CSS. See https://help.nintex.com/en-US/formplugins/Reference/Style.htm
    :host {
      height: 100%;
      width: 100%;
      display: block;
    }

    .frame {
      display: inline-block;
      height: 100%;
      width: 100%;
      background-color: transparent;
      border: none;
    }
  `;

  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: "Material Text field 2",
      fallbackDisableSubmit: false,
      iconUrl: "one-line-text",
      version: "1",
      properties: {
        value: {
          type: "string",
          title: "Value",
          // this is to mark the field as value field. it should only be defined once in the list of properties
          isValueField: true,
          defaultValue: 0,
        },
      },
      standardProperties: {
        fieldLabel: true,
        description: true,
        defaultValue: true,
        readOnly: true,
      },
    };
  }

  static properties = {
    name: "Hello",
    title: "Hello",
    src: "https://www.wikipedia.org/",
    height: "100%",
  };

  // Render the UI as a function of component state
  render() {
    return html`<input
        type="number"
        @change=${(e) => this.onInputValueChange(e.target.value)}
      />
      <div>${this.convertedvalue}</div>`;
  }

  onInputValueChange(value) {
    this.convertedvalue = this.toWords.convert(value);
  }
}

// registering the web component.
const elementName = "hub-number-to-text";
customElements.define(elementName, HubNumberToText);
