export class Praise {
    public subject?: string;
    public recommendee: { id: number; name: string };
    public recommender: { id: number; name: string };
    public title?: string;
    public source?: string;
    constructor(vals: Array<string | number>, cols: string[]) {
        cols = cols.map((c) => c.toLowerCase());
        const recommendee = vals[cols.indexOf("recommendee")].toString().split(". ");
        const recommender = vals[cols.indexOf("recommender")].toString().split(". ");

        this.recommendee = {
            id: Number(recommendee[0]),
            name: recommendee[1],
        };
        this.recommender = {
            id: Number(recommender[0]),
            name: recommender[1],
        };

        this.source = vals[cols.indexOf("source")] as string;
        this.title = vals[cols.indexOf("relationship term")] as string;
    }
}
