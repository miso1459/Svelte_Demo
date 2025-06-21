<script>
    import { run } from 'svelte/legacy';

    import TabulatorTable from '$lib/Tabulator/Table_Read.svelte';
    import { minMaxFilterEditor, minMaxFilterFunction } from '$lib/Tabulator/minMaxFilterEditor.js';

    const columns = [
        { title: "ID", field: "id", maxWidth:100, headerFilter:"number", headerFilterPlaceholder:"at least...", headerFilterFunc:">="},
        { title: "Name", field: "name", minWidth:100, maxWidth:200, headerFilter:true, headerFilterPlaceholder:"Find a Person...", headerFilterFunc:"like", headerFilterLiveFilter:true},
        { title: "Age", field: "age", maxWidth:100, headerFilter:minMaxFilterEditor, headerFilterFunc:minMaxFilterFunction, headerFilterLiveFilter:false},
        { title: "Gender", field: "gender", maxWidth:100, editor:"list", editorParams:{values:{"male":"Male", "female":"Female", clearable:true}}, headerFilter:true, headerFilterPlaceholder:"Select...", headerFilterParams:{values:{"male":"Male", "female":"Female", "":""}, clearable:true}}
    ];  

    let data = $state([]);
    let loading = $state(false);
    let saving = $state(false);
    let error = $state('');

    // TabulatorTable에 접근할 수 있도록 ref 선언
    let tableRef = $state();

    async function fetchData() {
        loading = true;
        error = '';
        try {
            const res = await fetch('/api/users');
            if (!res.ok) throw new Error('데이터를 불러오지 못했습니다.');
            data = await res.json();
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    }

    async function saveData() {
        saving = true;
        error = '';
        try {
            fetchData();
        } catch (e) {
            error = e.message;
        } finally {
            saving = false;
        }
    }    

    // data가 변경될 때 TabulatorTable에 적용
    run(() => {
        if (tableRef && typeof tableRef.setData === 'function') {
            tableRef.setData(data);
        }
    });
</script>

<style>
    :root {
        --header-height: 80px;
    }
    .toparea-flex {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
    }
    .toparea-btns {
        display: flex;
        gap: 3px;
    }
    .toparea-condition {
        display: flex;
        align-items: center;
        height: 30px;
        padding-left: 10px;
    }

    .tabulator-container {
        width: calc(100vw - 6px);
        height: calc(100vh - var(--header-height, 80px) - 3px);
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .tabulator-table-el {
        width: 100%;
        height: 100%;
    }

</style>

<div class="TopArea">
    <div class="toparea-flex">
        <div>
            <h3>프로그램 이름...</h3>
        </div>
        <div class="toparea-btns">
            <button type="button" class="btn preset-outlined-primary-500" onclick={fetchData} disabled={loading}>
                {#if loading}조회 중...{/if}
                <span class="material-icons">조회</span>
            </button>    
            <button type="button" class="btn preset-outlined-primary-500" onclick={saveData} disabled={saving}>
                {#if saving}저장 중...{/if}
                <span class="material-icons">저장</span>
            </button>    
            <button type="button" class="btn preset-outlined-primary-500" onclick={() => history.back()}>
                <span class="material-icons">닫기</span>
            </button>    
        </div>
    </div>
    <div class="toparea-condition">
        <h2>Tabulator Table with Filters</h2>
    </div>

</div>

<div class="tabulator-container">
    <div class="tabulator-table-el" style="margin: 0px 3px 0px 3px;">
        {#if error}
            <p style="color:red">{error}</p>
        {/if}

        <TabulatorTable bind:this={tableRef} {columns} {data} />
    </div>
</div>

