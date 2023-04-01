export default class GeniallyInvalidName extends Error {
  constructor(length: number) {
    super(`Genially name with length <${length}> is invalid`);
  }
}
