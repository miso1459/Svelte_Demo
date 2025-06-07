// minMaxFilterEditor 및 minMaxFilterFunction을 별도 파일로 분리

export function minMaxFilterEditor(cell, onRendered, success, cancel, editorParams) {
    const container = document.createElement("span");

    const start = document.createElement("input");

    start.setAttribute("type", "number");
    start.setAttribute("placeholder", "Min");
    start.setAttribute("min", "0");
    start.setAttribute("max", "100");
    start.style.padding = "4px";
    start.style.width = "50%";
    start.style.boxSizing = "border-box";

    start.value = cell.getValue();

    const end = start.cloneNode();

    function buildValues() {
        success({
            start: start.value,
            end: end.value,
        });
    }

    function keypress(e) {
        if (e.keyCode == 13) {
            buildValues();
        }
        if (e.keyCode == 27) {
            cancel();
        }
    }

    end.setAttribute("placeholder", "Max");

    start.addEventListener("change", buildValues);
    start.addEventListener("blur", buildValues);
    start.addEventListener("keydown", keypress);

    end.addEventListener("change", buildValues);
    end.addEventListener("blur", buildValues);
    end.addEventListener("keydown", keypress);

    container.appendChild(start);
    container.appendChild(end);

    return container;
}

export function minMaxFilterFunction(headerValue, rowValue, rowData, filterParams) {
    if (rowValue) {
        if (headerValue.start != "") {
            if (headerValue.end != "") {
                return rowValue >= headerValue.start && rowValue <= headerValue.end;
            } else {
                return rowValue >= headerValue.start;
            }
        } else {
            if (headerValue.end != "") {
                return rowValue <= headerValue.end;
            }
        }
    }
    return true;
}