function getArticleText(){
    let article=document.querySelector('articel');
    if(article){
        return article.innerText
    }
    const paragraphs=Array.from(document.querySelectorAll("p"));
    return paragraphs.map((p)=>p.innerText).join("\n\n");
}
chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{
    
}