export abstract class Widget {
  protected root: HTMLElement;
  protected mounted = false;

  constructor(className: string, tag: keyof HTMLElementTagNameMap = "div") {
    this.root = document.createElement(tag);
    this.root.className = className;
  }

  /** Called once when mounted */
  protected onMount(): void { }

  /** Called once when destroyed */
  protected onDestroy(): void { }

  mount(parent: HTMLElement = document.body) {
    if (this.mounted) return;

    parent.appendChild(this.root);
    this.mounted = true;
    this.onMount();
  }

  destroy() {
    if (!this.mounted) return;

    this.onDestroy();
    this.root.remove();
    this.mounted = false;
  }

  show() {
    this.root.style.display = "";
  }

  hide() {
    this.root.style.display = "none";
  }

  get element() {
    return this.root;
  }
}
