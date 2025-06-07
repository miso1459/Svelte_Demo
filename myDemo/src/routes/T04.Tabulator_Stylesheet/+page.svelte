<script>
    import TabulatorTable from '$lib/Tabulator/Table_Read.svelte';
    import { minMaxFilterEditor, minMaxFilterFunction } from '$lib/Tabulator/minMaxFilterEditor.js';
    import { onMount } from 'svelte';

    const columns = [
        { title: "ID", field: "id", headerFilter:"number", headerFilterPlaceholder:"at least...", headerFilterFunc:">="},
        { title: "Name", field: "name", headerFilter:true, headerFilterPlaceholder:"Find a Person...", headerFilterFunc:"like", headerFilterLiveFilter:true},
        { title: "Age", field: "age", headerFilter:minMaxFilterEditor, headerFilterFunc:minMaxFilterFunction, headerFilterLiveFilter:false},
        { title: "Gender", field: "gender", editor:"list", editorParams:{values:{"male":"Male", "female":"Female", clearable:true}}, headerFilter:true, headerFilterParams:{values:{"male":"Male", "female":"Female", "":""}, clearable:true}}
    ];  

    let data = [];
    let loading = true;
    let error = '';

    onMount(async () => {
        try {
            // 예시: 실제 API 엔드포인트로 변경하세요.
            const res = await fetch('/api/users');
            if (!res.ok) throw new Error('데이터를 불러오지 못했습니다.');
            data = await res.json();
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
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
<div class="tabulator-container" style="height: calc(100vh - var(--header-height, 100px)); 
                                        width: calc(100vw - 5px);">
    <div class="tabulator-table-el">
        {#if loading}
            <p>Loading...</p>
        <!-- {:else if error}
            <TabulatorTable {columns} {data} /> -->
        {:else}
            <TabulatorTable {columns} {data} />
        {/if}
    </div>
</div>

