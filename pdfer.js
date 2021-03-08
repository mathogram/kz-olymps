let createPdf = (file) =>{
    let value = "";

    value += `\n< ## ${file.title}`;
    value += `

<style>
#display{
  font-size:18px !important;
}
</style>

`;
    file.problems.forEach((prob, num)=>{
        p = prob.split("&nbsp;").join("").split("<br>").join("").trim().split("\n").join(" ").split("<br><br>").join("@#@").split("<br>").join("").split("@#@").join("br");
        value += `1. ${p.trim()} ${(file.author[num+1])?`_${file.author[num+1].split("( ").join("(").split(" )").join(")").split(" ").join("\u00A0")}_`: ""} \n\n`;            
    })

    editor.setValue(value);

    document.querySelector("title").innerText = ("math"+file.title.match(/\s\d{2}\s|\s\d{1}\s/)+"-1-tasks").split(" ").join("");
//     document.querySelector("title").innerText = file.title;
        
    print();
//     return confirm();
}

let chooseOlymp = (selector, json)=>{
    let output = [];
    json = json || jsonFile; 

    jsonFile.forEach(el => {
        let q = (s) => el.title.search(s)+1;
//         console.log(eval(selector))
        if(eval(selector)) output.push(el)
    })
    return output;
}

let theLOOOP = (arr) =>{
    let output = [];
    arr.forEach((olymp) =>{
        output.push(createPdf(olymp))
    })
    return output;
}