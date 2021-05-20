
var toSearch = [];
var sizeOfSearch = 0;
var isSorted = false;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function numInput(){
        var input = document.getElementsByName('arr');
        var inpNum = parseInt((input[0].value));
        if (isNaN(inpNum)) {
            return;
        }
        addToArr(inpNum);
        document.getElementById('inp').focus();
}

const funcDict = {"Linear":linearSearch, "Binary":binarySearch}

function searchInput() {
    if (sizeOfSearch == 0) {
        document.getElementById('errors').innerText = "Empty Array Error";
        return;
    }
    const toFind = document.getElementById('toFind').value;
    if (isNaN(parseInt(toFind))) {
        document.getElementById('errors').innerText = "No Search Term Provided";
        return;
    }
    document.getElementById('errors').innerText = "";
    const meth = document.getElementById('findMethod').value;
    const speed = document.getElementById('speed').value;
    funcDict[meth](toFind, speed);


}
//Returns -1 or the index
async function linearSearch(toFind, speed) {
    var numLoops = 0;

    var arr = document.getElementById("el");
    var i;
    var found = false;
    const runTime = ((101-speed)/100)*1000
    for (i = 0; i < toSearch.length; i++) {
        /* resets the colors */
        arr.cells[i+1].style.color = "black";
    }

    for (i = 0; i < toSearch.length; i++) {
        arr.cells[i+1].style.color = "red";
        await sleep(runTime);
        if (toSearch[i] == toFind) {
            found = true;
            arr.cells[i+1].style.color = "green";
            break;
        }
        await sleep(runTime);

        arr.cells[i+1].style.color = "black";
        numLoops++;

    }
    await sleep(10);
    if (!found) {
        i = -1
    }
    if (i == -1) {
        document.getElementById('findResult').innerText = "Linear Search did not find "+toFind;
    } else {
        document.getElementById('findResult').innerText = "Linear Search found "+toFind+ " at index "+i;
    }
    printTimeComplexity(numLoops);
}

async function binarySearch(toFind, speed) {
    if (!isSorted) {
        document.getElementById('errors').innerHTML = "Cannot Run Binary Search on Unsorted Array";
        return;
    }
    const arr = document.getElementById("el");
    const size = toSearch.length
    const start = 0;
    const end = size-1;
    var runTime = ((101-speed)/100)*1000;
    if (speed >=98) {
        runTime = 0;
    }
    await binSearchHelper(toFind, arr, size, start, end, runTime);




}

async function binSearchHelper(toFind, arr, size, start, end, runTime) {
    await sleep(runTime);
    const mp = Math.ceil(start+(end-start)/2);
    arr.cells[mp+1].style.color = "blue";
    await sleep(runTime);
    if (toFind == toSearch[mp]) {
        arr.cells[mp+1].style.color = "green";
        document.getElementById('findResult').innerText = "Binary Search found "+toFind+ " at index "+mp;
        await sleep(2000);
        var c;
        for (c=0; c<arr.cells.length; c++) { // reset all
            arr.cells[c].style.color = "black";
            const storedHTML = arr.cells[c].innerText
            arr.cells[c].innerHTML = storedHTML;
        }
    } else if (end == start) {
        document.getElementById('findResult').innerText = "Binary Search did not find "+toFind;
        await sleep(runTime);
        var c;
        for (c=0; c<arr.cells.length; c++) { // reset all
            arr.cells[c].style.color = "black";
            const storedHTML = arr.cells[c].innerText
            arr.cells[c].innerHTML = storedHTML;
        }
    } else if (toFind > toSearch[mp]) {
        var i;
        for (i = start; i <= mp; i++){
            //console.log(i);
            const storedHTML = arr.cells[i+1].innerText
            arr.cells[i+1].innerHTML = '<s>'+storedHTML+'</s>';
        }
        binSearchHelper(toFind, arr, size, mp+1, end, runTime);
    } else if (toFind < toSearch[mp]) {
        var i;
        for (i = mp; i <= end; i++){
            const storedHTML = arr.cells[i+1].innerText
            arr.cells[i+1].innerHTML = '<s>'+storedHTML+'</s>';
        }
        binSearchHelper(toFind, arr, size, start, mp-1, runTime);
    }

}


function clearTable() {
    toSearch = [];
    var topRow = document.getElementById('ind');
    var row2 = document.getElementById('el');
    var top;
    var bot;
    for (top = topRow.cells.length-1; top >= 1 ; top --) {
        topRow.deleteCell(top);
        sizeOfSearch--;
    }
    for (bot = row2.cells.length-1; bot >= 1 ; bot --) {
        row2.deleteCell(bot);
    }

    document.getElementById('findResult').innerText = "";
    document.getElementById('errors').innerText = "";
    document.getElementById('timeComp').innerText = "";
}

function autoFill() {
    var i;
    for (i = 0; i < 10; i++) {
        const num = Math.floor(Math.random()*100);
        addToArr(num);
    }

}

function addToArr(num) {
    toSearch.push(num);
    document.getElementById('inp').value = '';

    var topRow = document.getElementById('ind');
    var newCell = topRow.insertCell(sizeOfSearch+1);
    newCell.innerHTML = sizeOfSearch;

    var row2 = document.getElementById('el');
    var newEl = row2.insertCell(sizeOfSearch+1);
    newEl.innerHTML = (toSearch[sizeOfSearch]);
    sizeOfSearch++;
    isSorted = false;
    document.getElementById("findMethod").options[1].disabled = true;
}

const sortDict = {"Selection":selectionSort, "Bubble":bubbleSort}

function sortInput() {
    if (sizeOfSearch == 0) {
        document.getElementById('errors').innerText = "Empty Array Error";
        return;
    }

    document.getElementById('errors').innerText = "";
    const meth = document.getElementById('sortMethod').value;
    const speed = document.getElementById('speed').value;

    sortDict[meth](speed);


}

async function selectionSort(speed) {
    var smallest = null;
    var smIndex = null;
    var itr;
    var itr2;
    var numLoops = 0;

    var arr = document.getElementById("el");
    var runTime = ((101-speed)/150)*1000;
    if (speed>=98) {
        runTime = 0;
    }
    for (itr = 0; itr<toSearch.length; itr++) {
        var color;
        for (color = itr; color<toSearch.length; color++) {
        //    Makes all non-sorted red
            arr.cells[color+1].style.color = "red";
        }
        for (itr2 = itr; itr2<toSearch.length; itr2++) {
            arr.cells[itr2+1].style.color = "blue";
            if (smallest == null || toSearch[itr2]<smallest) {
                if (smIndex != null) {
                    arr.cells[smIndex+1].style.border = "thin solid #000000";
                }
                smIndex = itr2;
                smallest = toSearch[itr2];
                arr.cells[itr2+1].style.border = "thick solid #0000FF";
                await sleep(runTime/2);
            }
            await sleep(runTime);
            numLoops++;

        }

        var store = toSearch[itr];
        toSearch[itr] = smallest;
        toSearch[smIndex] = store;

        arr.cells[itr+1].innerHTML = smallest;
        arr.cells[smIndex+1].innerHTML = store;

        arr.cells[itr+1].style.color = "green";
        arr.cells[smIndex+1].style.border = "thin solid #000000";
        await sleep(runTime);
        smallest = null;
        smIndex = null;

    }
    isSorted = true;
    document.getElementById("findMethod").options[1].disabled = false;
    await sleep(runTime/2);
    var c;
    for (c=0; c<arr.cells.length; c++) {
        arr.cells[c].style.color = "black";
    }
    printTimeComplexity(numLoops);
}

function printTimeComplexity(numLoops) {
    var mod = document.getElementById("timeComp")
    mod.innerHTML = "This process took " + numLoops + " loops... MAYBE SWITCH THIS TO TIME";
}

async function bubbleSort(speed) {
    var arr = document.getElementById("el");
    const size = toSearch.length;
    var unsorted = true;
    var numLoops = 0;
    var runTime = ((101-speed)/100)*1000;
    if (speed>=98) {
        runTime = 0;
    }
    while (unsorted) {
        unsorted = false;
        var i;
        for (i = 0; i < size-1; i++) {
            arr.cells[i+1].style.color = "blue"
            arr.cells[i+1].style.border = "thick solid #0000FF";
            arr.cells[i+2].style.color = "orange"
            arr.cells[i+2].style.border = "thick solid #FFA500";
            await sleep(runTime);
            if (toSearch[i]>toSearch[i+1]) {
                unsorted = true;
                const sto = toSearch[i];
                toSearch[i] = toSearch[i+1];
                toSearch[i+1] = sto;

                arr.cells[i+1].innerHTML = toSearch[i];
                arr.cells[i+2].innerHTML = toSearch[i+1];
                arr.cells[i+1].style.color = "orange"
                arr.cells[i+2].style.color = "blue"

            }
            await sleep(runTime);
            arr.cells[i+1].style.color = "black"
            arr.cells[i+1].style.border = "thin solid #000000";
            arr.cells[i+2].style.color = "black"
            arr.cells[i+2].style.border = "thin solid #000000";
        }
        numLoops++;
        await sleep(runTime);
    }

    console.log(toSearch);
    document.getElementById("findMethod").options[1].disabled = false;
    isSorted = true;
    await sleep(runTime/2);
    var c;
    for (c=0; c<arr.cells.length; c++) {
        arr.cells[c].style.color = "black";
    }
    printTimeComplexity(numLoops);
}