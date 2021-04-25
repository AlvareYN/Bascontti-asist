
export function dateFormat(timestamp) {
    let MyDate = new Date(timestamp);
    let MyDateString = MyDate.toLocaleString().split(" ");
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    let weekDay = MyDate.toLocaleDateString('es-PE', options).split(',')[0];
    let weekDayCapitalize = weekDay.charAt(0).toUpperCase() + weekDay.slice(1)
    MyDateString[0] = ('0' + MyDate.getDate()).slice(-2) + '/'
        + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '/'
        + MyDate.getFullYear();
    return MyDateString[0] + " " + weekDayCapitalize;
}

export function dateFormatOnlyDate(timestamp) {
    let MyDate = new Date(timestamp);
    let MyDateString = MyDate.toLocaleString().split(" ");
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    let weekDay = MyDate.toLocaleDateString('es-PE', options).split(',')[0];
    let weekDayCapitalize = weekDay.charAt(0).toUpperCase() + weekDay.slice(1)
    MyDateString[0] = ('0' + MyDate.getDate()).slice(-2) + '/'
        + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '/'
        + MyDate.getFullYear();
    return MyDateString[0];
}


export const getHoursAndMinutos = (timestamp) => {
    if (timestamp === null || timestamp === undefined) {
        return "-"
    } else {
        let dateTime = new Date(timestamp);
        let hoursWithMinutes = (dateTime.getHours() === 0 || dateTime.getHours() < 10 ? `0${dateTime.getHours()}` : dateTime.getHours()) + ":" + (dateTime.getMinutes() === 0 || dateTime.getMinutes() < 10 ? `0${dateTime.getMinutes()}` : dateTime.getMinutes());
        return hoursWithMinutes;
    }

}
export const joinWorkersAndAttendanceData = (arrWorkers, arr) => {
    let mappeArr = arrWorkers.map(obj => {
        let returningObj = {
            ...obj,
            ingreso: false,
            salida: false
        };
        let ingreso = arr.find(asistencia => asistencia.id === obj.id && asistencia.tipo === 'ingreso');
        let salida = arr.find(asistencia => asistencia.id === obj.id && asistencia.tipo === 'salida');
        if (ingreso !== undefined) {
            returningObj.ingreso = ingreso
        }
        if (salida !== undefined) {
            returningObj.salida = salida
        }

        return returningObj;
    })
    return mappeArr;
}
const createEmptyArrayOfDates = (days, start) => {
    let dataArr = [];
    for (let i = 0; i < days; i++) {
        let date = new Date(start);
        date.setDate(date.getDate() + i);
        let obj = {
            fecha: date.getTime(),
            ingreso: null,
            salida: null,
            almuerzo: true,
            comentario: "-",
            existInDbIngreso: false,
            existInDbSalida: false,
            ingresoId: null,
            salidaId: null,
            isEditedIngreso: false,
            isEditedSalida: false
        }
        dataArr.push(obj)
    }
    return dataArr;
}
export const joinOnlyWorkerData = (arr, days, start, end) => {
    let arrary = createEmptyArrayOfDates(days, start);
    return arrary.map(element => {
        if (arr !== null) {
            let ingresoObj = arr.find(obj => dateFormatOnlyDate(obj.fecha) === dateFormatOnlyDate(element.fecha) && obj.tipo === "ingreso");
            let salidaObj = arr.find(obj => dateFormatOnlyDate(obj.fecha) === dateFormatOnlyDate(element.fecha) && obj.tipo === "salida");
            if (ingresoObj) {
                element.ingreso = getHoursAndMinutos(ingresoObj.fecha)
                element.ingresoId = ingresoObj.id
                element.comentario = ingresoObj.comentario
                element.existInDbIngreso = true
            }
            if (salidaObj) {
                element.salidaId = salidaObj.id
                element.salida = getHoursAndMinutos(salidaObj.fecha)
                element.existInDbSalida = true
            }
            return element;
        } else {
            return element;
        }


    })
}

export const minutesToString = (minutes) => {
    let hours = Math.floor((minutes / 60));
    let sobrante = minutes % 60;
    return (hours === 0 || hours < 10 ? `0${hours}` : hours) + ":" + (sobrante === 0 || sobrante < 10 ? `0${sobrante}` : sobrante);

}
//local utils
const isSaturday = (date) => {
    let dateDay = new Date(date).getDay()
    if (dateDay === 6 || dateDay === 0) {
        return true;
    } else {
        return false;
    }
}
const sumOfHoursAndMinutes = (timestamp) => {
    let date = new Date(timestamp);
    return (date.getHours() * 60) + date.getMinutes();
}

export const fromStringToMinutes = (string) => {
    try {
        let arrOfNumbers = string.split(":");
        let hours = parseInt(arrOfNumbers[0])
        let minutes = parseInt(arrOfNumbers[1]);
        return ((hours * 60) + minutes);
    } catch (error) {
        return null;
    }
}
/**
 * @param {Writable} store 
 * esta function se enecarga de actualizar el salario de una persona contantemente dependiendo de los cambios que se hagan al store ingresado
 */
export const calcularSalario = (store) => {

    let defaultObjTotals = {
        sueldo: "-",
        asignacionFam: "-",
        bono: "-",
        cts: "-",
        afp: "-",
        onp: "-",
        total: "-"

    }

    if (store === null) {
        return x

    } else if (store === false) {
        return defaultObjTotals
    } else if (store.length === 0) {
        return defaultObjTotals

    } else {
        let totalMinutes = 0;
        for (const day of store) {
            if (day.almuerzo) {
                if ((day.ingreso !== null && day.salida !== null) && (day.ingreso !== "" && day.salida !== "")) {
                    let totalDay = fromStringToMinutes(day.salida) - fromStringToMinutes(day.ingreso) - 60
                    totalMinutes += totalDay;
                }
            } else {
                if ((day.ingreso !== null && day.salida !== null) && (day.ingreso !== "" && day.salida !== "")) {
                    let totalDay = fromStringToMinutes(day.salida) - fromStringToMinutes(day.ingreso)
                    totalMinutes += totalDay;
                }
            }

        }
        defaultObjTotals.total = totalMinutes;
        return defaultObjTotals;
    }
}


export const lookForNewAttendance = (arr, workerId) => {

    let elementsInit = arr.filter(element => element.ingreso !== null || element.salida !== null);
    let elementsToDel = elementsInit.filter(element => element.ingreso === "" || element.salida === "");
    let elements = elementsInit.filter(element => element.ingreso !== "" && element.salida !== "")

    let insertArray = [];
    let delArray = [];
    let editArray = [];

    if (elementsToDel.length > 0) {
        for (const delAttend of elementsToDel) {
            if (delAttend.ingresoId !== null && delAttend.ingreso === "") {
                delArray.push(delAttend.ingresoId)
            }
            if (delAttend.salidaId !== null && delAttend.salida === "") {
                delArray.push(delAttend.salidaId)
            }
        }
    }

    if (elements.length > 0) {
        for (const attendance of elements) {
            //caso en el cual el nuevo valor agregado no exista en la base de datos
            if (attendance.ingreso !== null && attendance.existInDbIngreso === false) {
                let splitHourIngreso = attendance.ingreso.split(":");
                let date = new Date(attendance.fecha);
                date.setHours(splitHourIngreso[0]);
                date.setMinutes(splitHourIngreso[1]);
                let insertObj = {
                    comentario: "",
                    fecha: date.getTime(),
                    id: workerId,
                    tipo: "ingreso"
                }
                insertArray.push(insertObj)
            }
            // caso en el cual el nuevo valor agregado no exista en la base de datos
            if (attendance.salida !== null && attendance.existInDbSalida === false) {
                let splitHourSalida = attendance.salida.split(":");
                let date = new Date(attendance.fecha);
                date.setHours(splitHourSalida[0]);
                date.setMinutes(splitHourSalida[1]);
                let insertObj = {
                    comentario: "",
                    fecha: date.getTime(),
                    id: workerId,
                    tipo: "salida"
                }
                insertArray.push(insertObj)
            }
            //caso en el cual el nuevo valor agregado si existe, entonces hay que editar la base de datos
            if (attendance.ingreso !== null && attendance.existInDbIngreso === true && attendance.isEditedIngreso === true) {
                let splitHourIngreso = attendance.ingreso.split(":");
                let date = new Date(attendance.fecha);
                date.setHours(splitHourIngreso[0]);
                date.setMinutes(splitHourIngreso[1]);
                let editObj = {
                    fecha: date.getTime(),
                    idDoc: attendance.ingresoId
                }
                editArray.push(editObj);
            }
            //caso en el cual el nuevo valor agregado si existe, entonces hay que editar la base de datos
            if (attendance.salida !== null && attendance.existInDbSalida === true && attendance.isEditedSalida === true) {
                let splitHourSalida = attendance.salida.split(":");
                let date = new Date(attendance.fecha);
                date.setHours(splitHourSalida[0]);
                date.setMinutes(splitHourSalida[1]);
                let editObj = {
                    fecha: date.getTime(),
                    idDoc: attendance.salidaId
                }
                editArray.push(editObj);

            }
        }
    }
    return { insertArray, delArray, editArray }

}
export const getDaysOfTheMonth = () => {
    let now = new Date();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    return new Date(year, month, 0).getDate();
}

export const getMoneyByMinutes = (minute, user) => {
    return Math.round((minute / 60) * (user.sueldo / (getDaysOfTheMonth() * user.horas)));
}
/*
export const validateInputs = (val) => {
    let simpleStringRegepx = /[a - zA - Z\s]+/g;
    let simpleNumberRegepx = /[0-9]+/g
    let simplePhoneMatch = /[9][0-9]{1,8}/g

    let obj = {
        nombre: {
            match: false || true,//true mean is bad
            lengthLimit: false || true
        }
    }
    //validando nombre
    obj.nombre.match = val.nombre.match(simpleStringRegepx) === null;
    obj.nombre.lengthLimit = val.nombre.length >= 25;

    obj.apellido.match = val.apellido.match(simpleStringRegepx) === null;
    obj.apellido.lengthLimit = val.apellido.length >= 25;


    obj.dni.match = val.dni.match.match(simpleNumberRegepx) === null
    obj.dni.lengthLimit = val.dni > 999999999 && val.dni < 10000000;



    obj.dni = val.dni.match.match(simpleNumberRegepx) === null
    obj.contacto = val.contacto.match(simplePhoneMatch) === null ? false : true;
}


*/

export const updateStore = (store) => {
    store.update(storeArr => {
        for (let i = 0; i < storeArr.length; i++) {
            const element = storeArr[i];
            if (element.ingreso === "") {
                storeArr[i].ingreso = null;
            }
            if (element.salida === "") {
                storeArr[i].salida = null;
            }
            if (element.isEditedSalida) {
                storeArr[i].isEditedSalida = false;
            }
            if (element.isEditedIngreso) {
                storeArr[i].isEditedIngreso = false;
            }
            if (element.ingreso !== null && element.ingreso !== "") {
                storeArr[i].existInDbIngreso = true;
            }
            if (element.salida !== null && element.salida !== "") {
                storeArr[i].existInDbSalida = true;
            }
        }
        return storeArr;
    })

}