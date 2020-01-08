import {Deserializable} from './deserializable.model';

export class Genre implements Deserializable {
  public genre: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}