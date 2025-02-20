/**
 * Copyright 2025 mikeyo4480
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `counter-app`
 * 
 * @demo index.html
 * @element counter-app
 */
export class CounterApp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.title = "Counter app";
    this.counter = 0;
    this.min = undefined;
    this.max = undefined;

    
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/counter-app.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: Number, reflect: true },
      counter: { type: Number, reflect: true },
      min: { type: Number, reflect: true },
      max: { type: Number, reflect: true },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }

      :host([counter="18"]) {
        color: var(--ddd-theme-default-beaverBlue);
      }

      :host([counter="21"]) {
        color: var(--ddd-theme-default-globalNeon);
      }

      
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }

      .counter {
        font-size: var(--counter-app-counter-font-size, var(--ddd-font-size-xxl));
        font-size: 144px;
        margin: 16px;
      }

      button {
        display: inline-flex;
        padding: 8px 16px;
        font-size: 16px;
        cursor: pointer;
        border: none;
        background: #007bff;
        color: white;
        border-radius: 4px;
      }
      

      button:hover {
        background: #0056b3;
      }

      h3 span {
        font-size: var(--counter-app-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }
 
updated(changedProperties) {
  super.updated
  if (changedProperties.has('counter')) {
    if (this.counter === 21) {
      this.makeItRain();
    }
    
    // do your testing of the value and make it rain by calling makeItRain
    
  }
}

makeItRain() {
  // this is called a dynamic import. It means it won't import the code for confetti until this method is called
  // the .then() syntax after is because dynamic imports return a Promise object. Meaning the then() code
  // will only run AFTER the code is imported and available to us
  import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
    (module) => {
      
      // This is a minor timing 'hack'. We know the code library above will import prior to this running
      // The "set timeout 0" means "wait 1 microtask and run it on the next cycle.
      // this "hack" ensures the element has had time to process in the DOM so that when we set popped
      // it's listening for changes so it can react
      setTimeout(() => {
        // forcibly set the popped attribute on something with id confetti
        // while I've said in general NOT to do this, the confetti container element will reset this
        // after the animation runs so it's a simple way to generate the effect over and over again
        this.shadowRoot.querySelector("confetti-container").setAttribute("popped", "");
      }, 0);
    }
  );
}

  increment() {
    this.counter += 1;
    this.message = ''
    if (this.counter == this.max) { // check if the counter is equal to the maximum value
      this.message = 'Maximum value reached'; // if so tell user they have reached the maximum value
    console.log("incremented", this.counter); // log the incremented value
    }
  }

  decrement() {
    this.counter -= 1;
    this.message = ''
    if (this.counter == this.min) { // check if the counter is equal to the minimum value
      this.message = 'Minimum value reached'; // if so tell user they have reached the minimum value
    }
  }

  // Lit render the HTML
  render() {
    return html`
<confetti-container>
<div class="counter">${this.counter}</div>
<div class="buttons"></div>
<button class="button" @click="${this.decrement}" ?disabled="${this.min === this.counter}" >Subtract 1</button>
<button class="button" @click="${this.increment}" ?disabled="${this.max === this.counter}">Add 1</button>
<div class="message">${this.message}</div> <!-- display message to the user -->
</confetti-container>
</div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);