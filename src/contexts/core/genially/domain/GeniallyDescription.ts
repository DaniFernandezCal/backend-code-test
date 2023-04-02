import GeniallyInvalidDescription from "./GeniallyInvalidDescription";

export default class GeniallyDescription {
  private static readonly MAX_LENGTH = 125;
  _description: string;

  constructor(description: string) {
    this.validateDescription(description);
    this._description = description;
  }

  private validateDescription(description: string) {
    if (description.length > GeniallyDescription.MAX_LENGTH) {
      throw new GeniallyInvalidDescription(description.length);
    }
  }

  public get description(): string {
    return this._description;
  }
}
