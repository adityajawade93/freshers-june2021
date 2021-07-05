var fi=0,se=1;
var n=13;
for(let i=1;i<=n;i++){
    if(i==1){
        console.log(fi);
        continue;
    }
    if(i==2){
        console.log(se);
        continue;
    }
    var help=fi+se;
    console.log(help);
    fi=se;
    se=help;
}