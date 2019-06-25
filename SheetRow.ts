import IslaamDBClient from "./IslaamDBClient";
export class SheetRow {
    public sheetUrl: string;
    constructor(sheetRow: number) {
        this.sheetUrl = "https://docs.google.com/spreadsheets/d/"
            + IslaamDBClient.sheetId + `/edit#gid=0&range=${sheetRow}:${sheetRow}`;
    }
}
