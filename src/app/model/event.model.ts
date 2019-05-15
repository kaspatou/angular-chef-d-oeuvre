export class Event {
  public id?: number;
  public title?: string;
  public start?: string;
  public end?: string;
  url?: string;
  color?: string;
  rendering?: string;


  contructor(id: number, title: string, start: string, end: string, url: string, color: string, rendering: string) {
    this.id = id;
    this.title = title;
    this.start = start;
    this.end = end;
    this.url = url;
    this.color = color;
    this.rendering = rendering;
  }

}
