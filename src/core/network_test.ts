export class NetworkTest {
  private onLine?: boolean;

  public Test(): boolean {
    this.onLine = navigator.onLine;
    return this.onLine
  }
}
