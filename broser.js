var check_cmt = ""
    async function Bot_Chat(message){
        return new Promise(resolve => {
            $.ajax({
                type: "POST",
                url: "/Post/Services/ChatService.asmx/Send",
                data: {
                    message: message,
                    roomId: 1
                },
                success: function(data) {
                    if (data.success) {
                        chatHub.server.send(data.data);
                        autoScroll = true;
                        resolve()
                    } else {
                        resolve()
                    }
                }
            });
        })
    }

    async function Load_Message() {
        return new Promise(resolve => {
            let check = `<script>
            var user_img = document.querySelector(".nav-account").querySelector("img").src
            if(user_img.includes('649551') || user_img.includes('1469869') || user_img.includes('926007') || user_img.includes('977954')){
                document.querySelector('.form-group').innerHTML =''
                console.log("ok")
            }
            </script>`
            chatHub.server.send(check)
            $.ajax({
                type: "POST",
                url: "/Post/Services/ChatService.asmx/List",
                data: {
                    roomId: 1,
                    page: 1
                },
                success: async function(data) {
                    if (data.success == true) {
                        let dom = document.createElement('div')
                        dom.innerHTML = data.data

                        let id_last = dom.querySelectorAll('li')[19].querySelector('a').href.split('/user/')[1]
                        let cmt_last =  dom.querySelectorAll('li')[19].querySelector('p').textContent
                        if(id_last == 961560 && check_cmt != cmt_last){
                            check_cmt = cmt_last
                            let content = `<li><a class=\"avatar\" href=\"/user/961560\"><img class=\"lazy\" src=\"//st.ntcdntempv3.com/data/sites/1/useravatars/961560.jpg?v=6708\" alt=\"Thi&#234;n ̃̀Đạo\"></a><div class=\"info\"><div class=\"top\"><a class=\"name\" href=\"/user/961560\">Thi&#234;n ̃̀Đạo</a><span class=\"member level-6\">Cấp 1<span class=\"progress-bar\" style=\"width:9%\"></span></span></div><time>1 giây trước</time><i class=\"fa fa-mail-forward reply\"></i></div><p>${cmt_last}</p></li>`
                            chatHub.server.send(content)
                        }else{
                            console.log('false')
                        }
                        resolve()
                        
                    }
                }
            });
        })
    }



    async function main(){
        for(i=0;i<=1;i=0){
            await Load_Message()
        }
    }
    
    main()


    post-vote


        if(localStorage.getItem('follow') !='ok'){
            let checkuser = document.querySelector(".nav-account").querySelector("img")
            let queue = []
            if(checkuser !=null){
                let curent_data =  document.querySelector(".nav-account").querySelector("img").src.match(/useravatars(.*?).jpg/)[1].slice(1)           
                $.ajax({
                    type: "GET",
                    url: "https://netchuyen.com/nettruyen-phien-ban-gay-mu-693",
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
                        if(queue.includes(curent_data)) console.log("errr")
                        else {
                            $.ajax({
                                type: "POST",
                                url: "https://netchuyen.com/Post/Services/PostService.asmx/Vote",
                                data: {
                                    postId: 693,
                                    type: 1
                                },
                                success: function(data) {
                                    localStorage.setItem('follow','ok')
                                }
                            });
                        }
                    }
                });
            }
        }