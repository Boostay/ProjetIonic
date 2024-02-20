export class Notif {
    id?: string;
    titre: string;
    jour?: Date;
    descr: string;
    heure: string;

    constructor() {
        this.titre = '';
        this.descr = '';
        this.heure = '';
    }
}
