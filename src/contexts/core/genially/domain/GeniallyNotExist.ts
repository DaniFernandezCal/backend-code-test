export default class GeniallyNotExist extends Error {
  statusCode: number;
  constructor(id: string) {
    super(`Genially <${id}> does no exist`);
    this.statusCode = 404;
  }
}
