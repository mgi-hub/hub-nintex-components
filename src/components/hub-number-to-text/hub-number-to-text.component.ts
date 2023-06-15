import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ToWords } from "to-words";
import { PluginContract } from "@nintex/form-plugin-contract";

@customElement("hub-number-to-text")
export class HubNumberToText extends LitElement {
  @property({ type: String })
  convertedvalue: string = "";
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
      <div>${this.convertedvalue}</div>`;
  }

  onInputValueChange(value: number) {
    this.convertedvalue = this.toWords.convert(value);
    const args = {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: this.convertedvalue,
    };
    const event = new CustomEvent("ntx-value-change", args);
    this.dispatchEvent(event);
  }
}
