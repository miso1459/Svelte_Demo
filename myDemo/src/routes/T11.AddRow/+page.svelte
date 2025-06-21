<script>
    import Page_Query from '$lib/Page_AddRow.svelte';
    import { minMaxFilterEditor, minMaxFilterFunction } from '$lib/Tabulator/minMaxFilterEditor.js';

    const columns = [
        { title: "ID", field: "id", maxWidth:100, headerFilter:"number", headerFilterPlaceholder:"at least...", headerFilterFunc:">="},
        { title: "Name", field: "name", minWidth:100, maxWidth:200, headerFilter:true, headerFilterPlaceholder:"Find a Person...", headerFilterFunc:"like", headerFilterLiveFilter:true},
        { title: "Age", field: "age", maxWidth:100, headerFilter:minMaxFilterEditor, headerFilterFunc:minMaxFilterFunction, headerFilterLiveFilter:false},
        { title: "Gender", field: "gender", maxWidth:100, editor:"list", editorParams:{values:{"male":"Male", "female":"Female", clearable:true}}, headerFilter:true, headerFilterPlaceholder:"Select...", headerFilterParams:{values:{"male":"Male", "female":"Female", "":""}, clearable:true}, readonly:true},
        { title: "Date", field: "date", maxWidth:100, headerFilter:true, clearable:true}
    ];
</script>

<Page_Query {columns} api="/api/users" />

