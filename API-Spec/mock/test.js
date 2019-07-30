let users = [];
for(let i=0; i<2; ++i){
    let user={};
    user["\"heanNum\""] = i*10;
    user["\"reportNum\""] = i*9;
    user["\"dairyNum\""] = i*8;
    user["\"journelNum\""] = i*9;
    user["\"fans\""] = i*7;
    user["\"idle\""] = i*6;
    user["\"uId\""] = i;
    user["\"phone\""] = "10086";
    user["\"username\""] = "user"+String(i);
    users.push(user);
}
console.log(users);