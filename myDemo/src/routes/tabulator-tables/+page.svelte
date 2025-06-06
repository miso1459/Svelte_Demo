<script lang="ts">
    import type { PageData } from './$types';
    import TabulatorTable from '$lib/TabulatorTable.svelte';
    import { onMount } from 'svelte';
    
    // 예시 데이터
    let tableData = [
        { id: 1, name: "홍길동", age: 28 },
        { id: 2, name: "김철수", age: 34 },
        { id: 3, name: "이영희", age: 22 }
    ];

    // 컬럼 정의
    let columns = [
        { title: "ID", field: "id", width: 80, headerFilter: true },
        { title: "이름", field: "name" },
        { title: "나이", field: "age" }
    ];
</script>

<div class="TopArea" style="height: var(--header-height, 80px);">
    <h1>Tabulator Example</h1>
    <p>This is a simple example of using Tabulator with Svelte.</p>
</div>

<div class="tabulator-container" style="height: calc(100vh - var(--header-height, 80px)); width: 100vw;">
    <div class="tabulator-table-el">
        <!-- TabulatorTable 컴포넌트가 이곳에 렌더링됩니다. -->
        <svelte:component 
            this={TabulatorTable} data={tableData} columns={columns} 
            layout: "fitColumns"
            responsiveLayout: "hide"
            height: "100%"
            width: "100%"            
        />
    </div>
</div>

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