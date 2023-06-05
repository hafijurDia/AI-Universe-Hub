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
    toolswrap.innerHTML = '';
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
    
    console.log(tools);
    tools.forEach(tool => {
        console.log(tool);
        const createCol = document.createElement('div');
        createCol.classList.add('col');
        createCol.innerHTML = `
        <div class="card">
            <img src="https://i.blogs.es/7b41f4/google-bard/1366_2000.jpeg" class="card-img-top"
                alt="...">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <ul>
                    <li>Item one</li>
                    <li>Item two</li>
                    <li>Item three</li>
                </ul>
                <hr>
                <div class="d-flex justify-content-between">
                    <div class="">
                        <h5 class="card-title">Card title</h5>
                        <p class="mb-0"><span
                                class="material-symbols-outlined align-bottom">calendar_today</span>
                            12/06/2023</p>
                    </div>
                    <div class="align-self-center">
                        <button type="button" class="border-0 bg-white" data-bs-toggle="modal"
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

//show more event handler
document.getElementById('show-more').addEventListener('click',function(){
    loadTools('show-all');
})
document.getElementById('show-less').addEventListener('click',function(){
    loadTools('show-less');
})

loadTools();