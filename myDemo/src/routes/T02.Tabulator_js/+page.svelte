<script>
    import { onMount } from 'svelte';
    let tableEl;

    const tabulatorCss = "https://unpkg.com/tabulator-tables@5.5.0/dist/css/tabulator_site.min.css";
    const tabulatorJs = "https://unpkg.com/tabulator-tables@5.5.0/dist/js/tabulator.min.js";

    let tableData = [
        { id: 1, name: "John", age: 29, gender: "male" },
        { id: 2, name: "Jane", age: 32, gender: "female" },
        { id: 3, name: "Steve", age: 41, gender: "male" },
    ];

    let columns = [
        { title: "ID", field: "id", width: 100, headerFilter: true },
        { title: "Name", field: "name" },
        { title: "Age", field: "age", width: 80 },
        { title: "Gender", field: "gender" }
    ];

    onMount(async () => {
        if (!document.querySelector(`link[href="${tabulatorCss}"]`)) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = tabulatorCss;
            document.head.appendChild(link);
        }

        if (!window.Tabulator) {
            await new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = tabulatorJs;
                script.onload = resolve;
                document.body.appendChild(script);
            });
        }

        new window.Tabulator(tableEl, {
            data: tableData,
            columns: columns,
            layout: "fitColumns",
            responsiveLayout: "hide",
            height: "100%",
            width: "100%",
        });
    });
</script>

<style>
    .tabulator-container {
        width: 100vw;
        height: 100vh;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .tabulator-table-el {
        width: 100%;
        height: 100%;
    }
</style>

<div class="TopArea" style="height: var(--header-height, 80px);">
    <h1>Tabulator Example</h1>
    <p>This is a simple example of using Tabulator with Svelte.</p>
</div>
<div class="tabulator-container" style="height: calc(100vh - var(--header-height, 80px)); width: 100vw;">
    <div class="tabulator-table-el" bind:this={tableEl}></div>
</div>

