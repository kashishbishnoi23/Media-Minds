const fileInput = document.getElementById('fileInput');

const fileInputBtn = document.getElementById('fileInputbtn');

fileInputBtn.addEventListener("click", ()=>{
    fileInput.click();
})

let mediaArray = [];
let video = "";

fileInput.addEventListener('change', (event)=>{
    
    const files = event.target.files; // extracting the files
    Array.from(files).forEach(file =>{
        const reader = new FileReader(); // make an object FileReader -> this will help us read the content of the file
        reader.readAsDataURL(file); // this will read the contents of the file

        //  jase hi file successfully read ho jati hai , onload event listener is triggered:
        reader.onload = function(event){
            const fileData = event.target.result; // is case me event.target is the object that is reading the file
            //  now we have got the URL, ab ham HTML elements banayenge -> img or video -> unke src me is URL ko daalenge
            const fileElement = document.createElement(file.type.startsWith('image/') ? 'img': 'video');
            
            fileElement.src = fileData;
            fileElement.controls = true;  
            mediaArray.push(fileElement); 
            post_btn.disabled = false;  

            const elementcheck = fileElement.nodeName;

            if (elementcheck !== 'IMG'){  
            video += `<video class="h-full w-full" controls autoplay src="${mediaArray[0].src}"> </video>`
            } 

            
        }
    })
})


// when we click share something -> a big textbox appears:

let share_input = document.querySelector("#share_input");
let enhanced_share_container = document.querySelector(".share_post_container");

share_input.addEventListener('click', ()=>{
    enhanced_share_container.classList.remove("hidden");
    enhanced_share_container.classList.add("z-10");
    share_input.classList.add('bg-gray-200')
})

enhanced_share_container.querySelector(".close").addEventListener('click', ()=>{
    enhanced_share_container.classList.add("hidden");
    console.log(enhanced_share_container.querySelector(".close"));
})

// enable the post button as we enter the data:
let post_text = "";
let post_btn = document.querySelector(".postbtn")



document.querySelector(".post-text").addEventListener('input', (event)=>{
    post_text = event.target.value;
    if (post_text){
        post_btn.disabled = false;    
    } else{
        post_btn.disabled = true;
    }
})

//  add post on clicking post btn:
post_btn.addEventListener('click', ()=>{
    enhanced_share_container.classList.add("hidden");
    addPost();
})

let images = "";




let feeds = document.querySelector(".feeds");

let moreimgbtn = document.querySelector(".moreimgbtn");

document.body.addEventListener('click', (event)=>{
    if (event.target.classList.contains("moreimgbtn")){
        document.querySelector(".images").classList.remove("overflow-y-hidden");
        document.querySelector(".images").classList.add("overflow-y-scroll");  
        console.log("children : ")   
        console.log(document.querySelector(".images").children);
        document.querySelector(".moreimgbtn").classList.add("hidden");

    }

})

function addPost(){

 
    mediaArray.forEach((img, index)=>{
        if (mediaArray.length > 1 && index == 0){
            images += `<button class="py-2 moreimgbtn px-3 rounded-full bottom-0  right-0 absolute bg-black/70 z-10 text-white"> +${mediaArray.length -1 } </button>`
            
        }
       images += `<img class="object-contain h-full" src="${img.src}">`

    })
    
    
   
    
    feeds.innerHTML += `<div class="h-content post rounded-lg flex flex-col gap-5 bg-gray-50 w-[50vw]  shadow-lg p-5">

        <div class="flex justify-between items-center">
            <div class="flex items-center gap-3">
            <div class="h-10 w-10 bg-[url('https://wallpapercave.com/wp/wp2036039.jpg')] bg-cover rounded-full"> </div>
            <div>
            <div class="font-bold text-sm">John Doe</div>
            <div class="text-xs text-gray-400">Just now</div>
            </div>
            </div>

        <button class="options_btn">
            <i class="fas fa-ellipsis"></i>
        </button>
        </div>

         <div class="text">${post_text}</div>

         <div class="images h-[40vh] relative overflow-y-hidden w-full flex flex-col" >
         ${images}
         ${video}
         </div>


        <div class="flex text-[#ACB9CD] items-center gap-4 text-sm">
            <div class="flex items-center gap-2 likes ">
                <img src="greyheart.png" class="h-5 w-5 greyheart" alt="">
                <img src="pinkheart.png" class="h-5 w-5 pinkheart hidden">
                <div class="like_text select-none ">Like</div>

                
            </div>
            <div class="flex items-center gap-2 comments">
                <img src="greycomment.png" class="h-4 w-4 greycomment" alt="">
                <img src="bluecomment.png " class="h-4 w-4 bluecomment hidden" alt="">
                <div class="comment_text select-none">Comment</div>
            </div>

            <div class="share flex items-center gap-2" >
               <img src="share.png" class="h-4 w-4">
               <div class="share_text">Share</div>


            </div>

        </div>

    </div> 
    `

    //  manage likes:
    let liked = false;


    document.querySelector(".likes").addEventListener('click', ()=>{
        liked = !liked;
        if (liked){
            document.querySelector(".pinkheart").classList.remove("hidden");
            document.querySelector(".like_text").classList.add('text-[#FB88A9]')
            document.querySelector(".greyheart").classList.add("hidden");
        } else{
            document.querySelector(".pinkheart").classList.add('hidden');
            document.querySelector(".greyheart").classList.remove('hidden');
            document.querySelector(".like_text").classList.remove('text-[#FB88A9]')
        }
    })


   

// manage comments:
document.querySelector(".greycomment").addEventListener('click', ()=>{
   document.querySelector(".greycomment").classList.add('hidden');
   document.querySelector(".bluecomment").classList.remove('hidden');
   document.querySelector(".comment_text").classList.add('text-[#5997FF]');
   document.querySelector(".post").innerHTML += `
       <div class="comment_section flex flex-col gap-4 pt-3">
        <div class="">58 comments</div>

        <div class="flex items-center gap-5">
        <div class="h-6 w-7 rounded-full border border-black"></div>
        <input placeholder="Add a comment..." class="comment text-md outline-none w-full">

        <button class="py-1 post_btn px-4 rounded-md bg-blue-500 text-white">Post</button>
        </div>

        <div class="user_comments">
             
        </div>


    </div>
   `
})





// share btn:



document.querySelector(".share").addEventListener('click', ()=>{
    document.querySelector(".share_text").classList.add('text-blue')
    document.querySelector(".share_text").classList.remove('text-[#ACB9CD]');
    document.querySelector(".share_modal").classList.remove("hidden");

})


document.querySelector(".share_cross").addEventListener('click', ()=>{
    document.querySelector(".share_modal").classList.add('hidden');

})

//  options:



}


