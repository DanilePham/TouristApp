module.exports.generateSlug = (length) => {
    let rs='';
    for (let i=0; i<length; i++) {
        rs += Math.floor(Math.random() * 10);
    }
    return rs;
}  
