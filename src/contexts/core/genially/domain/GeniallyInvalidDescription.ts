export default class GeniallyInvalidDescription extends Error {
  statusCode: number;
  constructor(length: number) {
    super(`Genially description with length <${length}> is invalid`);
    this.statusCode = 400;
  }
}
