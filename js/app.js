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
        const lists = tool.features;
        const createCol = document.createElement('div');
        createCol.classList.add('col');
        createCol.innerHTML = `
        <div class="card">
            <img style="height:230px;" src="${tool.image}" class="card-img-top"
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

//load single tool in modal
const loadMoreId = async(id) => {
    const idnum = id;
    const keepwith0 = String(idnum).padStart(2, '0');
    const url = `https://openapi.programming-hero.com/api/ai/tool/${keepwith0}`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    displayMoreData(data);
}
//display single tool in modal
const displayMoreData = (info) => {
    console.log(info.data);
    const detailsWrap = document.getElementById('modal-wrap');
    //modal title
    document.getElementById('modal-title').innerText = info.data.tool_name;

    //fetures  function
    const features = info.data.features;
    function featuresCall(){
        let feature = "";
        for (const key in features) {
            if (features.hasOwnProperty(key)) {
               feature = `
               <li>${features[1].feature_name ? features[1].feature_name : 'No data'}</li>
               <li>${features[2].feature_name ? features[2].feature_name : 'No data'}</li>
               <li>${features[3].feature_name ? features[3].feature_name : 'No data'}</li>
               `;
            }
          }
          return feature;
    }
 
    //integration  function
    const integrations = info.data.integrations;
    function integrationCall(){
        let integration = "";
        for (const key in features) {
            if (integrations.hasOwnProperty(key)) {
                integration = `
               <li>${integrations[0] ? integrations[0] : 'No data'}</li>
               <li>${integrations[1] ? integrations[1] : 'No data'}</li>
               <li>${integrations[2] ? integrations[2] : 'No data' }</li>
               `;
            }
          }
          return integration;
    }
    //accurancy percentage
    function floatToPercentage(value) {
        const percentage = (value * 100).toFixed(0); // Multiply by 100 and round to 2 decimal places
        if (percentage == 0 ) {
            return "No data found";
        }
        return percentage + "% acuuracy"; // Append "%" symbol
      }

    detailsWrap.innerHTML =  `
    <div class="col">
    <div class="card" style="background-color: #eb575716;">
      <div class="card-body">
        <h5 class="card-title">${info.data.description}</h5>
        <div class="d-flex justify-content-around">
          <button class="btn btn-light border border-danger">${info.data.pricing[0].plan ? info.data.pricing[0].plan : 'no data'}<br>${info.data.pricing[0].price ? info.data.pricing[0].price : 'no data'}</button>
          <button class="btn btn-light border border-danger">${info.data.pricing[1].plan ? info.data.pricing[1].plan : 'no data'}<br>${info.data.pricing[1].price ? info.data.pricing[1].price : 'no data'}</button>
          <button class="btn btn-light border border-danger">${info.data.pricing[2].plan ? info.data.pricing[2].plan : 'no data'}<br>${info.data.pricing[2].price ? info.data.pricing[2].price : 'no data'}</button>
          
  
        </div>
        <div>
          <div class="d-flex justify-content-between mt-2">
              <div>
                  <h5>Features</h5>
                  <ol type='1'>
                    ${featuresCall()}
                  </ol>
              </div>
              <div>
                  <h5>Integrations</h5>
                  <ol type="1">
                      ${integrationCall()}
                  </ol>
              </div>
          </div>
      </div>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
    <span id="accuracy" class="accuracy">${floatToPercentage(info.data.accuracy.score)}</span>    
      <img src="${info.data.image_link[0]}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title text-center">Hi, how are you doing today?</h5>
        <p class="card-text text-center">I'm doing well, thank you for asking. How can I assist you today?</p>
      </div>
    </div>
  </div>
</div>
    `
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