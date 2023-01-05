
//implémentation du graphe en utilisant les listes chainées


class Graph {

    constructor(date, foods, health){
        this.date = date;
        this.foods = foods;
        this.health = health;
        this.next = null;
    }
}

export class ListeChainéeGraph {

    constructor(){
        this.head = null;
        this.size = null;
    }

    //insérer 
    insert(date, foods, health){
        let graph = new Graph(date, foods , health);
        let current;
        if(this.head === null){
            this.head = graph;
        } else {
            current = this.head;
            while(current.next){
                current = current.next;
            }
            current.next = graph;
        }
        
        this.size++;
    }

    printGraphList(){
        let current = this.head;
        while(current){
            console.log("{ date:", current.date, " , foodsList :", current.foods," healthProblem : ",current.health," }");
            current = current.next;
        }
    }

    printGraphLength(){
        console.log(this.size);
    }

}

//avoir un tableau contenant uniquement les noms de nourriture pour une date précise
const getFoodsName = (foodsList) => {
    const res = [];
    for(let foods of foodsList){
        res.push(foods.name);
    }
    return res;
}


export const GenerateGraph = (nutritionList , foodsList) => {
   let listGraph = new ListeChainéeGraph();
    for( let nutritionInfo of nutritionList){
        const food = foodsList.filter((food) => food.nutritionId === nutritionInfo.jour);
        if(food.length > 0){
            
            listGraph.insert(nutritionInfo.jour , getFoodsName(food), nutritionInfo.isHealthy ? "NHP" :"HP" );
        }
    }
    listGraph.printGraphList();
}


//

