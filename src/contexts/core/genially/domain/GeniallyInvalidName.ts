export default class GeniallyInvalidName extends Error {
  statusCode: number;
  constructor(length: number) {
    super(`Genially name with length <${length}> is invalid`);
    this.statusCode = 400;
  }
}
