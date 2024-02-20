export class Chat {
    id?: string;
    race: string;
    name: string;
    age?: number;
    mignonerie?: number;
    pictureLink: string;

    constructor() {
        this.race = '';
        this.name = '';
        this.pictureLink = '';
    }
}
