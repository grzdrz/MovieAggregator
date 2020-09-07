class Reducer {
  constructor(reducerManager, state) {
    this.reducerManager = reducerManager;
    this.state = state;
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
