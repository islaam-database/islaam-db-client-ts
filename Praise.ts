export class Praise {
    public subject?: string;
    public praisee: { id: number; name: string };
    public praiser: { id: number; name: string };
    public title?: string;
    public source?: string;
    constructor(vals: Array<string | number>, cols: string[]) {
        cols = cols.map((c) => c.toLowerCase());
        const recommendee = vals[cols.indexOf("recommendee")].toString().split(". ");
        const recommender = vals[cols.indexOf("recommender")].toString().split(". ");

        this.praisee = {
            id: Number(recommendee[0]),
            name: recommendee[1],
        };
        this.praiser = {
            id: Number(recommender[0]),
            name: recommender[1],
        };

        this.source = vals[cols.indexOf("source")] as string;
        this.title = vals[cols.indexOf("title")] as string;
    }
}
