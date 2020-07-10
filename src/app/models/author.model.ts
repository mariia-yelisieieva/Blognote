export class Author {

  public articlesCount: number;

  constructor(public id: string, public userId: string,
              public name: string, public imageUrl: string, public description: string) { }

}
