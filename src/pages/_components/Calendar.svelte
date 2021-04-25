<script>
    import bulmaCalendar from "bulma-calendar/dist/js/bulma-calendar";
    import { createEventDispatcher, onMount } from "svelte";
    const dispatch = createEventDispatcher();
    let start;
    let end;
    let calendar;
    let daysRange;
    const options = {
        color: "info",
        type: "date",
        displayMode: "inline",
        dateFormat: "DD/MM/YYYY",
        todayLabel: "Hoy",
        showHeader: false,
        showFooter: false,
        closeOnSelect: true,
        isRange: true,
    };
    const onConsultar = () => {
        if (start === undefined && end === undefined) {
            alert("selecciona una fecha de comienzo y de final");
        } else if (start === undefined && end !== undefined) {
            alert("Seleciona una fecha de comienzo pls");
        } else if (start !== undefined && end === undefined) {
            alert("selecciona una fecha de termino pls");
        } else {
            dispatch("onConsultar", {
                start: start,
                end: end,
                days: daysRange,
            });
        }
    };
    onMount(() => {
        calendar = bulmaCalendar.attach(`#rightCalendar`, options)[0];
        let datePickerNav = document.querySelector(".datepicker-nav");
        calendar.datePicker.on("select", (event) => {
            start = event.data._date.start;
            end = event.data._date.end;
            daysRange = Math.round((end - start) / (1000 * 60 * 60 * 24));
        });
    });
</script>

<style>
    .calendar-container {
        margin: 40px;
    }
    .center {
        display: flex;
        justify-content: center;
    }
</style>

<div class="calendar-container">
    <input id="rightCalendar" type="datetime" />
    <div class="center">
        <button
            class="boton-bascontti es-azul"
            on:click={onConsultar}>Consultar</button>
    </div>
</div>
