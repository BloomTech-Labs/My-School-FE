module.exports = function timechange(num){ 
    if(num){
        var hours = Math.floor(num / 60);  
        var minutes = num % 60;
        return hours + "h " + minutes + "m";    
    }else{
        return '0h 0m'
    }
     
};