import {Deserializable} from './deserializable.model';
import {Genre} from './genre.model';

export class Anime implements Deserializable {
  public score: number;
  public title: string;
  public status: string;
  public episodes: string;
  public genreLists: Genre[];

  deserialize(input: any): this {
    Object.assign(this, input);

    this.genreLists = input.genreLists.map(genres => new Genre().deserialize(genres));

    return this;
  }
}