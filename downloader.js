let thereIsMore = (n) => {
    return !!(document.body.innerText.search(`Задача №${n}.`)+1)
}
let giveThatElement = (n) =>{
    let theOneElement;
    [...document.body.querySelectorAll("b")].forEach(el =>{
        if(el.innerText == `Задача №${n}.`){
            theOneElement = el.parentElement;
        }
    })
    return theOneElement;
}


let getObject = () => {
    let n = 1;
    let title = document.body.querySelector("h2").innerText;
    let problems = [];
    let author = [""];

    while(thereIsMore(n)){
        let thatElement = giveThatElement(n);

        if(thatElement.querySelector("font")){
            author[n] = thatElement.querySelector("font").innerText.trim();
            thatElement.removeChild(thatElement.querySelector("font"))
        }
        if(thatElement.querySelector("a")){
            thatElement.removeChild(thatElement.querySelector("a"))
        }
        if(thatElement.querySelector("b")){
            thatElement.removeChild(thatElement.querySelector("b"))
        }
        if(thatElement.querySelector("hr")){
            thatElement.removeChild(thatElement.querySelector("hr"))
        }


        [...thatElement.querySelectorAll("img")].forEach(img => {
            img.src = "https://matol.nomomon.repl.co/" + (img.src).replace(/\//gim, '&');
        })

        problems.push(thatElement.innerHTML);

        n++;
    }

    return {title, problems, author}
}


let mathDocument = (doc) => {
    return !!(doc.body.innerText.search("Математика")+1);
}


let changeDocument = async (olympiad) =>{
     return await fetch(`http://matol.kz/olympiads/${olympiad}`)
        .then(res => {
            if(res.ok){
                return res;
            }else{
                return "eatDeezNuts";
            }
        })
        .then(r => r.text())
        .then(r => {
            document.body.innerHTML = r;
            return mathDocument(document);
        }).catch((error) =>{
            return false;
        });
}



function download_txt(textToSave) {
  var hiddenElement = document.createElement('a');

  hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'задачи.js';
  hiddenElement.click();
}

let output;
let canDo = true;

let _init = async(from, to)=>{
    from = from || 1;
    to = to || 963;
    output = [];
    
    for(olymp = from; olymp <= to && canDo; olymp++){
        if(await changeDocument(olymp)){
            history.pushState("", "", `/olympiads/${olymp}`)
            output.push(getObject());
        }else{
            continue;
        }
    }


    download_txt("var jsonFile = "+JSON.stringify(output))
}
