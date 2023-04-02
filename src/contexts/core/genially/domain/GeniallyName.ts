import GeniallyInvalidName from "./GeniallyInvalidName";

export default class GeniallyName {
  private static readonly MAX_LENGTH = 20;
  private static readonly MIN_LENGTH = 3;
  _name: string;

  constructor(name: string) {
    this.validateName(name);
    this._name = name;
  }

  private validateName(name: string) {
    if (
      name.length > GeniallyName.MAX_LENGTH ||
      name.length < GeniallyName.MIN_LENGTH
    ) {
      throw new GeniallyInvalidName(name.length);
    }
  }

  public get name(): string {
    return this._name;
  }
}
