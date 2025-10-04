const container = document.querySelector("#container");
const reset=document.querySelector("#reset");
const gridselector=document.querySelector("#gridSizePrompter");
const boxes=document.querySelectorAll(".box");
const GRID_SIZE=960;


const gridMaker=function(num=16){
    container.innerHTML="";
    const squareSize = (GRID_SIZE / num) ;
    for (let i=0;i<num;i++){
        for (let j=0;j<num;j++){
            const div=document.createElement("div");
            div.classList.add("box");
            div.style.backgroundColor="whitesmoke";
            div.style.boxSizing="border-box";
            div.style.border="1px solid black";
            div.style.width=`${squareSize}px`;
            div.style.height=`${squareSize}px`;
            container.appendChild(div);
            
            // div.addEventListener("mouseover", function () {
            //   const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
            //   div.style.backgroundColor = randomColor;
            //   div.style.opacity=0.1;
            // });

            div.addEventListener("mouseover", function () {
              let darkenLevel = parseInt(div.dataset.darken || "0");
              if (darkenLevel < 10) {
                darkenLevel += 1;
                div.dataset.darken = darkenLevel;
            
                // Get a random RGB
                const r = Math.floor(Math.random() * 256);
                const g = Math.floor(Math.random() * 256);
                const b = Math.floor(Math.random() * 256);
            
                // Reduce brightness based on darken level
                const factor = 1 - darkenLevel * 0.1; 
                const newR = Math.floor(r * factor);
                const newG = Math.floor(g * factor);
                const newB = Math.floor(b * factor);
            
                div.style.backgroundColor = `rgb(${newR}, ${newG}, ${newB})`;
              } else {
                // Fully black after 10 hovers
                div.style.backgroundColor = "black";
              }
            });

        }
    }
}

gridselector.addEventListener("click",()=>{
    let choice=parseInt(prompt("Enter size of grid (<100): "));
    if (choice>=100){
        alert("Sorry, you cannot enter size greater than 100.");
    }else if (!Number.isInteger(choice) || choice<=0){
        alert("Sorry, you can only enter positive integers.")
    }else{
        gridMaker(choice);
    }
})

reset.addEventListener("click", () => {
  gridMaker(); 
})

//call gridmaker to initialize the game/project
gridMaker();