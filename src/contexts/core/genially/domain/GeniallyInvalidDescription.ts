export default class GeniallyInvalidDescription extends Error {
  constructor(length: number) {
    super(`Genially description with length <${length}> is invalid`);
  }
}
