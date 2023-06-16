import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ToWords } from "to-words";
import { PluginContract } from "@nintex/form-plugin-contract";

@customElement("hub-number-to-text")
export class HubNumberToText extends LitElement {
  @property({ type: String })
  convertedValue: string = "";
  @property({ type: ToWords })
  toWords = new ToWords({
    localeCode: "fr-FR",
    converterOptions: { ignoreDecimal: false },
  });
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    //Add custom CSS. See https://help.nintex.com/en-US/formplugins/Reference/Style.htm
    input {
      display: block;
      width: 100%;
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      color: #212529;
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid #ced4da;
    }
  `;

  static getMetaConfig(): Promise<PluginContract> | PluginContract {
    // plugin contract information
    return {
      controlName: "Hub Number To Text",
      fallbackDisableSubmit: false,
      iconUrl: "one-line-text",
      version: "1",
      properties: {
        value: {
          type: "string",
          title: "Value",
          isValueField: true,
        },
      },
      standardProperties: {
        fieldLabel: true,
        description: true,
      },
    };
  }

  // Render the UI as a function of component state
  render() {
    return html`<input
        type="number"
        @change=${(e: any) => this.onInputValueChange(e.target.value)}
      />
      <div>${this.convertedValue}</div>`;
  }

  onInputValueChange(value: number) {
    // reset convertedValue
    this.convertedValue = "";
    // use split because decimal numbers are not converted... so we split and convert every number between point
    const splittedValue = value.toString().split(".");
    splittedValue.forEach((v, index) => {
      this.convertedValue = `${this.convertedValue} ${
        index > 0 ? "," : ""
      } ${this.toWords.convert(parseInt(v))}`;
    });
    const args = {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: this.convertedValue,
    };
    const event = new CustomEvent("ntx-value-change", args);
    this.dispatchEvent(event);
  }
}
