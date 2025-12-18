type StateListener<S> = (state: S) => void;

export abstract class Bloc<E, S> {
  private listeners: StateListener<S>[] = [];
  protected state!: S;
  abstract get getInitialState(): S;
  abstract mapStatetoEvent(event: E): AsyncGenerator<S>;

  constructor() {
    this.state = this.getInitialState;
  }

  subscribe(listener: StateListener<S>) {
    this.listeners.push(listener);
    listener(this.state); // emit initial state
  }

  protected emit(state: S) {
    this.state = state;
    for (const l of this.listeners) {
      l(state);
    }
  }

  async dispatch(event: E) {
    for await (const newState of this.mapStatetoEvent(event)) {
      this.emit(newState);
    }
  }
}
