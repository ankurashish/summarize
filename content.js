function getArticleText(){
    let article=document.querySelector('article');
    if(article){
        return article.innerText
    }
    const paragraphs=Array.from(document.querySelectorAll("p"));
    return paragraphs.map((p)=>p.innerText).join("\n\n");
}
chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{
    if(request.type==="getArticleText"){
        const text=getArticleText();
        sendResponse({text});
    }
    
})
