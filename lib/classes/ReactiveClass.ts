export abstract class ReactiveClass {
  private listeners: Function[];

  constructor() {
    this.listeners = [];
  }

  addListener(listener: Function) {
    this.listeners.push(listener);
  }

  removeListener(listenerToRemove: Function) {
    this.listeners = this.listeners.filter(
      (listener) => listenerToRemove !== listener
    );
  }

  notify() {
    this.listeners.forEach((listener) => listener());
  }

  getListeners() {
    return this.listeners;
  }
}
