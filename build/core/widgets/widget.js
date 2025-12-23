"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Widget = void 0;
class Widget {
    constructor(className, tag = "div") {
        this.mounted = false;
        this.root = document.createElement(tag);
        this.root.className = className;
    }
    /** Called once when mounted */
    onMount() { }
    /** Called once when destroyed */
    onDestroy() { }
    mount(parent = document.body) {
        if (this.mounted)
            return;
        parent.appendChild(this.root);
        this.mounted = true;
        this.onMount();
    }
    destroy() {
        if (!this.mounted)
            return;
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
exports.Widget = Widget;
