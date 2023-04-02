import GeniallyDescription from "./GeniallyDescription";
import GeniallyName from "./GeniallyName";

export interface GeniallyDTO {
  id: string;
  name: string;
  createdAt: Date;
  description?: string;
  modifiedAt?: Date;
  deletedAt?: Date;
}

export default class Genially {
  private _id: string;
  private _name: GeniallyName;
  private _description: GeniallyDescription;
  private _createdAt: Date;
  private _modifiedAt: Date;
  private _deletedAt: Date;

  constructor(
    id: string,
    name: GeniallyName,
    description?: GeniallyDescription,
    createdAt?: Date,
    deletedAt?: Date,
    modifiedAt?: Date
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._createdAt = createdAt || new Date();
    this._deletedAt = deletedAt;
    this._modifiedAt = modifiedAt;
  }

  get id(): string {
    return this._id;
  }

  get name(): GeniallyName {
    return this._name;
  }

  get description(): GeniallyDescription {
    return this._description;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get modifiedAt(): Date {
    return this._modifiedAt;
  }

  get deletedAt(): Date {
    return this._deletedAt;
  }

  public delete(): void {
    this._deletedAt = new Date();
  }

  public modify(name: GeniallyName): void {
    this._name = name;
    this._modifiedAt = new Date();
  }

  public asDTO(): GeniallyDTO {
    return {
      id: this._id,
      name: this._name.name,
      createdAt: this._createdAt,
      description: this._description.description,
      modifiedAt: this._modifiedAt,
      deletedAt: this._deletedAt,
    };
  }

  public static fromDTO(geniallyDTO: GeniallyDTO): Genially {
    return new Genially(
      geniallyDTO.id,
      new GeniallyName(geniallyDTO.name),
      new GeniallyDescription(geniallyDTO.description),
      geniallyDTO.createdAt,
      geniallyDTO.deletedAt,
      geniallyDTO.modifiedAt
    );
  }
}
