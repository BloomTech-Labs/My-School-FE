module.exports = function validateCredentials(value){
    if(value <= 0 ){
        return 'Must provide login information'
    }else{
        return null
    }
};