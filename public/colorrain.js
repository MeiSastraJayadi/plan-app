const topLeft = document.querySelector(".content .top .left"); 
const meteor = function(pcs) {
    let width = topLeft.offsetWidth; 
    let height = topLeft.offsetHeight; 
    let speed = 2; 
    let init = 0; 
    for(let i = 0; i < pcs; i++) {
        const item = document.createElement("i"); 
        const h = Math.abs((Math.random() * (height - 1))/4); 
        topLeft.appendChild(item); 
        item.style.left = Math.abs(Math.random() * (width - 1)) + 'px';  
        item.style.height = h + 'px'; 
        item.style.width = h/13 + 'px';  
        speed += Math.random() * 1.2; 
        if(init > 4) {
            speed = Math.random(); 
        }
        item.style.animationDuration = speed + 's'; 
    } 
}

meteor(60); 
