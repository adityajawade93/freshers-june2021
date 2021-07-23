import { dbQuery } from "../db/db";

export async function addClass(cid: string, cname: string): Promise<boolean> {

    try {
        const query = 'insert into classes (cid, cname) values ($1, $2)';
        const res = await dbQuery(query, [cid, cname]);

        if (res && res.command === 'INSERT')
            return true;

        return false;
    }
    catch (error) {
        throw Error(error);
    }

}

export async function getClassId(id: string): Promise<Array<string>> {
    try {
        const query = 'select * from classes  where cid = $1;';
        const result = await dbQuery(query, [id]);
        //console.log(result);
        return result.rows[0];
    } catch (e) {
        throw Error(e);
    }
}

export async function getClasses(): Promise<Array<string>> {
    try {
        const query = 'select * from classes order by cname;';
        const result = await dbQuery(query);

        // console.log(result.rows);
        return result.rows;
    } catch (e) {
        throw Error(e);
    }
}



