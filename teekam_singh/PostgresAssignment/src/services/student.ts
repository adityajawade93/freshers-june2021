import { query } from "../db/database";

export async function createStudent (id: string, name: string) {
    try {
        await query("insert into students values ($1,$2)",[id, name]);
    }
    catch (err) {
        throw new Error(err);
    }
}

export async function AddStudentToClass (studentId: string, classId: string) {
    try {
        await query("insert into student_class values ($1,$2)", [studentId, classId]);
    }
    catch (err) {
        throw new Error(err);
    }
}

export async function studentList (page: number, size: number) {
    try {
        const res: any = await query("select * from students offset $1 fetch next $2 rows only", [page*size, size]);
        return res;
    }
    catch (err) {
        throw new Error(err);
    }
}