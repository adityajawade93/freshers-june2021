import { dbQuery } from "../db/db";

export async function addClass(id: String, name: string) {

    try {
        const query = 'insert into classes (id, name) values ($1, $2)';
        const res = await dbQuery(query, [id, name]);

        if (res && res.command === 'INSERT')
            return true;

        return false;
    }
    catch (error) {
        throw Error(error);
    }

}

export async function getClassId(name: string) {
    try {
        const query = 'select id from classes where name = $1';
        const result = await dbQuery(query, [name]);

        return result.rows[0].id;
    } catch (e) {
        throw Error(e);
    }
}

export async function getClasses() {
    try {
        const query = 'select * from classesmap';
        const result = await dbQuery(query);

        console.log(result.rows);
        return result.rows;
    } catch (e) {
        throw Error(e);
    }
}



