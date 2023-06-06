//load all ai tools
const loadTools = async(alldata) => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    const res = await fetch(url);
    const data = await res.json();
    displayAiTools(data.data.tools,alldata);
    //load spinner
    loadSpinner(true);
}

//display ai tools
const displayAiTools = (tools,alldata) => {
    const toolswrap = document.getElementById('tool-wrap');
    tools = tools;
    const showless = document.getElementById('show-less');
    const showMore = document.getElementById('show-more');
    if (alldata === 'show-all') {
        tools = tools;
        showless.classList.remove('d-none');
        showMore.classList.add('d-none');
    }
    else if(alldata === 'show-less'){
        tools = tools.slice(6);
        showless.classList.add('d-none');
        showMore.classList.remove('d-none');
    }else{
        tools = tools.slice(6);
        showless.classList.add('d-none');
        showMore.classList.remove('d-none');
    }
   
    tools.forEach(tool => {
        console.log(tool);
        const lists = tool.features;
        const createCol = document.createElement('div');
        createCol.classList.add('col');
        createCol.innerHTML = `
        <div class="card">
            <img src="${tool.image}" class="card-img-top"
                alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <ol type="1">
                    <li>${lists[0]}</li>
                    <li>${lists[1]}</li>
                    <li>${lists[2]}</li>
                </ol>
                <hr>
                <div class="d-flex justify-content-between">
                    <div class="">
                        <h5 class="card-title">${tool.name}</h5>
                        <p class="mb-0"><span
                                class="material-symbols-outlined align-bottom">calendar_today</span>${tool.published_in}</p>
                    </div>
                    <div class="align-self-center">
                        <button onclick="loadMoreId(${tool.id})" type="button" class="border-0 bg-white" data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"><span
                                class="material-symbols-outlined text-danger">arrow_circle_right</span></button>
                    </div>
                </div>
            </div>
        </div>
        `;
        //load spinner
        loadSpinner(false);
        toolswrap.appendChild(createCol);

    });

}

//spiner load
const loadSpinner = (permission) => {
    const spinner = document.getElementById('spiner-load');
    if (permission === false) {
        spinner.classList.remove('d-none');
    }
    else{
        spinner.classList.add('d-none');
    }
}

//load single tool in modal
const loadMoreId = async(id) => {
    const idnum = id;
    const keepwith0 = String(idnum).padStart(2, '0');
    const url = `https://openapi.programming-hero.com/api/ai/tool/${keepwith0}`;
    const res = await fetch(url);
    const data = await res.json();
    displayMoreData(data);
}
//display single tool in modal
const displayMoreData = (info) => {
    
}

//show more event handler
document.getElementById('show-more').addEventListener('click',function(){
    loadTools('show-all');
})
document.getElementById('show-less').addEventListener('click',function(){
    loadTools('show-less');
})

loadTools();