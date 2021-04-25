import { getDaysOfTheMonth, getMoneyByMinutes } from '../utils'

it('probando si obtenemos los dias de los meses', () => {
    expect(getDaysOfTheMonth(1)).toBe(31)
    expect(getDaysOfTheMonth(2)).toBe(28)
    expect(getDaysOfTheMonth(3)).toBe(31)
    expect(getDaysOfTheMonth(4)).toBe(30)

})


it('Probando si se entrega bien el calculo de su dinero', () => {
    let user = {
        asignacion_familiar: true,
        bono_anual: 50,
        dni: "42011857",
        horas: 8,
        id: "5ZY06gdb3DCWaCScJ1tH",
        ingreso: false,
        nombre: "JUDITH MARTINEZ",
        salida: false,
        sueldo: 930
    }
    expect(getMoneyByMinutes(600,user)).toBe()
})