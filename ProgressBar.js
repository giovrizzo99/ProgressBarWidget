(function () {
  let template = document.createElement("template");
  template.innerHTML = `
    <style>
      :host {
          display: block;
          width: 100%;
          height: 30px;
      }

      .progress-container {
          width: 100%;
          height: 100%;
          background-color: var(--empty-bar-color, #e0e0e0);
          border-radius: 5px;
          overflow: hidden;
          position: relative;
      }

      .progress-bar {
          height: 100%;
          width: 0%;
          background-color: var(--bar-color, #03ff4f);
          transition: width 0.5s ease-in-out;
      }

      .progress-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 14px;
          font-weight: bold;
          color: black;
      }
    </style>

    <div class="progress-container">
      <div class="progress-bar"></div>
      <div class="progress-text">0%</div>
    </div>
  `;

  class StraightProgressBar extends HTMLElement {
    constructor() {
      super();
      let shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(template.content.cloneNode(true));
      this._props = {};
    }

    async connectedCallback() {
      this.updateProgress();
    }

    async updateProgress() {
      const progressBar = this.shadowRoot.querySelector(".progress-bar");
      const progressText = this.shadowRoot.querySelector(".progress-text");

      const barColor = this._props.barColor || "#03ff4f";
      const emptyBarColor = this._props.emptyBarColor || "#e0e0e0";
      const percentage = this._props.percentage || 50;

      progressBar.style.width = `${percentage}%`;
      progressBar.style.backgroundColor = barColor;
      this.shadowRoot.querySelector(".progress-container").style.backgroundColor = emptyBarColor;
      progressText.innerText = `${percentage}%`;
    }

    onCustomWidgetBeforeUpdate(changedProperties) {
      this._props = { ...this._props, ...changedProperties };
    }

    onCustomWidgetAfterUpdate(changedProperties) {
      this.updateProgress();
    }
  }

  customElements.define("com-gr-progressbar", StraightProgressBar);
})();
