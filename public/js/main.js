class StarWars{
    constructor(props) {
        this.starWarsResult = document.querySelector(".starwars_result");
        this.container = document.querySelector(".container");
        this.resultContainer = document.querySelector(".starwars_result");
        this.imgLoading = `<img src="/img/loading.gif" width="150" height="150">`;
        this.nextBtn = document.querySelector("#next");
        this.prevBtn = document.querySelector("#prev");
        this.viewAllBtn = document.querySelector("#viewAll");

        this.paginationMaxPeople = Math.ceil(83/10);
        this.paginationMaxPlanets = Math.ceil(60/10);
        this.activeContent = '';

        this.init();
    }
    async getPeople(url){
        const response = await axios.get(url);
        this.processRequest(response.data)
    }
    async getPlanets(url){
        const response = await axios.get(url);
        this.processRequest(response.data)
    }

    async viewAllRequest(){
        let resultToParse = '';
        if (this.activeContent === 'people'){
            for (let i=1;i<=this.paginationMaxPeople;i++){
                const response = await axios.get(`https://swapi.dev/api/people/?page=${i}`)
                for(let result of response.data.results){
                   resultToParse += `<li>${result.name}</li>`
                }
            }
            this.resultContainer.innerHTML = resultToParse;
        }
        else if (this.activeContent === 'planets'){
            for (let i=1;i<=this.paginationMaxPlanets;i++){
                const response = await axios.get(`https://swapi.dev/api/planets/?page=${i}`)
                for(let result of response.data.results){
                    resultToParse += `<li>${result.name}</li>`
                }
            }
            this.resultContainer.innerHTML = resultToParse;
        }
        this.prevBtn.disabled = true;
        this.nextBtn.disabled = true;
        this.viewAllBtn.disabled = true;
    }

    processRequest(response){
        let resultToParse = '';
        for(let result of response.results){
            resultToParse += `<li>${result.name}</li>`
        }
        this.resultContainer.innerHTML = resultToParse;

        this.nextBtn.disabled = false;
        this.nextBtn.setAttribute('data-value',response.next)
        this.prevBtn.disabled = false;
        this.prevBtn.setAttribute('data-value',response.previous)
        this.viewAllBtn.disabled = false;

        if(this.prevBtn.getAttribute('data-value') === `null`){
            this.prevBtn.disabled = true;
        }
        if(this.nextBtn.getAttribute('data-value') === `null`){
            this.nextBtn.disabled = true;
        }
    }
    init(){
        this.container.addEventListener("click",(e)=>{

            if(e.target.id === 'people'){
                this.activeContent = 'people';
                this.resultContainer.innerHTML = this.imgLoading;
                this.getPeople(`https://swapi.dev/api/people/?page=1`);
            }
            else if (e.target.id === 'planets'){
                this.activeContent = 'planets'
                this.resultContainer.innerHTML = this.imgLoading;
                this.getPlanets(`https://swapi.dev/api/planets/?page=1`);
            }

            //for btn next
            if(e.target.id === 'next' && this.activeContent === 'people'){
                this.resultContainer.innerHTML = this.imgLoading;
                this.getPeople(e.target.getAttribute('data-value'));
            }
            if(e.target.id === 'next' && this.activeContent === 'planets'){
                this.resultContainer.innerHTML = this.imgLoading;
                this.getPlanets(e.target.getAttribute('data-value'));
            }

            //for btn prev
            if(e.target.id === 'prev' && this.activeContent === 'people'){
                this.resultContainer.innerHTML = this.imgLoading;
                this.getPeople(e.target.getAttribute('data-value'));
            }
            if(e.target.id === 'prev' && this.activeContent === 'planets'){
                this.resultContainer.innerHTML = this.imgLoading;
                this.getPlanets(e.target.getAttribute('data-value'));
            }

            //for viewAll Btn
            if (e.target.id === 'viewAll' && this.activeContent === 'people'){
                this.resultContainer.innerHTML = this.imgLoading;
                this.viewAllRequest()
            }
            if (e.target.id === 'viewAll' && this.activeContent === 'planets'){
                this.resultContainer.innerHTML = this.imgLoading;
                this.viewAllRequest()
            }

        })
    }

}

new StarWars();