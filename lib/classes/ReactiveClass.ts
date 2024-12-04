export abstract class ReactiveClass {
  private listeners: Function[];

  constructor() {
    this.listeners = [];
  }

  addListener(listener: Function) {
    console.log("Adding listener");
    this.listeners.push(listener);
  }

  removeListener(listenerToRemove: Function) {
    console.log("Removing listener");
    this.listeners = this.listeners.filter(
      (listener) => listenerToRemove !== listener
    );
  }

  notify() {
    console.log("Notifying listeners");
    this.listeners.forEach((listener) => listener());
  }

  getListeners() {
    return this.listeners;
  }
}
