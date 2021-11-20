// get Selector

var $=document.querySelector.bind(document);
var $$=document.querySelectorAll.bind(document);
var listNavItem=$$(".nav-item");
var listTablish=$$(".tablish")
listNavItem.forEach(function(item,index){
        const tablish=listTablish[index]
        item.onclick=function(){    
            $(".nav-item.nav-item--active").classList.remove("nav-item--active") 
            $(".tablish.active").classList.remove("active") 
            tablish.classList.add("active")
            this.classList.add("nav-item--active")
        }
        
})
