class Reducer {
  constructor(reducerManager) {
    this.reducerManager = reducerManager;
    this.onStateChange = { // временная реализация ивента
      handlers: [],
      subscribe(handler) {
        this.handlers.push(handler);
      },
      invoke() {
        this.handlers.forEach((handler) => handler());
      },
    };
  }
}

export default Reducer;
