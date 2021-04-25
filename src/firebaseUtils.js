import { db, FieldValue } from './firebase';

export const getRangeAttendance = async (id, start, end) => {
    let temporalArrayQuery = [];
    try {
        if (start === undefined || end === undefined) {
            callback(null)
        } else {
            let attendanceQuery = await db.collection("Asistencias").where('id', "==", id).orderBy('fecha').startAt(start).endAt(end).get();
            if (!attendanceQuery.empty) {
                attendanceQuery.forEach(doc => {
                    temporalArrayQuery.push({ ...doc.data(), id: doc.id })
                })
                return temporalArrayQuery;
            } else {
                return null;
            }
        }
    } catch (error) {
        console.error(error);
    }
}

export const addAttendanceDashboard = async (obj) => {
    try {
        await db.collection("Asistencias").add(obj);
    } catch (error) {
        console.log(error);
    }
}
export const delAttendenceDashboard = async (id) => {
    try {
        await db.collection("Asistencias").doc(id).delete();
    } catch (error) {
        console.log(error);
    }
}
export const editAttendenceDashboard = async (obj) => {
    try {
        await db.collection("Asistencias").doc(obj.idDoc).update({ fecha: obj.fecha })
    } catch (error) {
        console.log(error)
    }
}

export const getPagos = async (start, end, id) => {
    let tempArray = [];
    try {
        let query = await db
            .collection("Pagos")
            .where("trabajador", "==", id)
            .orderBy("fecha")
            .startAt(start)
            .endAt(end)
            .get();

        if (!query.empty) {
            query.docs.forEach((document) => {
                tempArray.push(document.data());
            });
        }
        return tempArray;
    } catch (error) {
        console.log(error);
        return tempArray;
    }
};