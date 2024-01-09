const fs = require('fs/promises');
const fss = require('node:fs');
const jsdom = require("jsdom");
const { resolve } = require('path');
const { JSDOM } = jsdom;

var Bot_Cookie = "_ga=GA1.1.768879700.1696165315; cf_clearance=XLPPACD997oPGsNYUmUPHJHQfa_qqyMjpOgtM41a6Vw-1704804338-0-2-98a85f3d.43fe2b45.a39bb440-0.2.1704804338; .ASPXAUTH=BA43440EF457B79701249DD757F983420E2E8D09716CF6F8249AD4D883B36A83EBDD45BE037600197A37B83202688F533AE44F900F0365F3BFF2B19556D2A53213E72D18296D6AA42A891F82E65BC61B2515A730661C5E91036B1375ABE2E8258962663846A6BA971DDA26A4B81F0AB19BD44D0C0EF7E669B0CDE3CAB9710239C4EB06682099196EBCA01A24796B1C115ABC62DA975563F0199FF72AB48E75F910BBB55246C2D615F8123EA6CC53A6AE636C66A9EA9871D63FF39B3026F4D7F9B48C530502963D4CE8CBA89724BC397EB7B29102; ASP.NET_SessionId=w4f4opbe3cxzohf5au4itcb4; netchuyen.comportalroles1=429684C64068D76E53CC8E2156582EA59A923A1D6B6C20685385C5577FC34F998BF277F548FBE596CA9F811887DD91293425C79F599BCEDB99E0D2D88C15512EB7336C39955622BC1660DBBDEEAAA48375C454E86777AA43864A229F3BCE9F031263283E083A0C3BCBDB156E1DAB4CB5B72A3DC46F740C140EE4D753F2E1C05DB7852E001572689D5732069EE3C26DB015E8DDCFBE9DEC58BB62BC05534BB912545E7D6F9527207994D22C2A4DC4F1FE0F26C672; _ga_6TELXYEN9X=GS1.1.1704804337.14.1.1704804825.0.0.0"

async function chat(message){
    return new Promise(resolve => {
      console.log(message)
            fetch('https://netchuyen.com/Post/Services/ChatService.asmx/Send',{
              method: "POST",
              headers: {
                  'Content-Type': "application/json",
                  'Cookie': Bot_Cookie,
              },
              body:JSON.stringify(
                  {
                  message: message,
                  roomId: 1
                  }
                )  
          }).then(resolve)
         
    })
}


// read_bot_cookie()

async function get_chat_page(){
  return new Promise(resolve => {
    fetch("https://netchuyen.com/Post/Services/ChatService.asmx/List", {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Microsoft Edge\";v=\"120\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest"
      },
      "referrer": "https://netchuyen.com/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": "roomId=1&page=1",
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    }).then((response) => response.json())
      .then(async (data) => {
        // console.log(data.data)
        let dom = new JSDOM(data.data);
        let mainnode = dom.window.document
        let id_last = mainnode.querySelectorAll('li')[19].querySelector('a').href.split('/user/')[1]
        let name_last = mainnode.querySelectorAll('li')[19].querySelector('.name').textContent
        let cmt_last =  mainnode.querySelectorAll('li')[19].querySelector('p').textContent
        let lv_last = mainnode.querySelectorAll('li')[19].querySelector('.member').textContent
        let pt_last = mainnode.querySelectorAll('li')[19].querySelector('.progress-bar').style.width
        console.log(cmt_last)
        let text = ""
        switch(cmt_last){
          case "Myid":
              text = `ID của ${name_last} là : ${id_last}`
              await chat(text).then(resolve)
              break;
          case "Mylv":
              text = `LV của ${name_last} là : ${lv_last}:${pt_last}`
              await chat(text).then(resolve)
              break;
          case "Ta muốn độ kiếp":
              if(pt_last =='99%' || pt_last == '100%'){
                chat("Làm đéo j có chức năng này").then(resolve)
              }else{
                chat("Chưa thể độ kiếp lúc này, hãy cải thiện thực lực").then(resolve)
              }
              break;
          default:
              if(cmt_last.includes('#id')){
                  let name = (cmt_last.match(/@(.*?): #id/)||[])[1]
                  if(name  != undefined){
                      let id_log = ""
                      for(let i=0;i<mainnode.querySelectorAll('li').length;i++){
                          if(mainnode.querySelectorAll('li')[i].querySelector('.name').textContent == name){
                              id_log = mainnode.querySelectorAll('li')[i].querySelector('a').href.split('/user/')[1]
                          }
                      }
                      let text=`Id của @${name} là: ${id_log}`
                      await chat(text).then(resolve)
                  }else{
                      resolve()
                  }
              }else if(cmt_last.includes('#lv')){
                  let name = (cmt_last.match(/@(.*?): #lv/)||[])[1]
                  if(name  != undefined){
                      let pt_log = ""
                      let lv_log =""
                      for(let i=0;i<mainnode.querySelectorAll('li').length;i++){
                          if(mainnode.querySelectorAll('li')[i].querySelector('.name').textContent == name){
                              pt_log = mainnode.querySelectorAll('li')[i].querySelector('.progress-bar').style.width
                              lv_log = mainnode.querySelectorAll('li')[i].querySelector('.member').textContent
                          }
                      }
                      let text=`Tu vi của @${name} là: ${lv_log}:${pt_log}`
                      await chat(text).then(resolve)
                  }else{
                      resolve()
                  }
              }else if(cmt_last.slice(0,4)=='#Top'){
                let top = parseInt(cmt_last.slice(4))
                gettop(top).then()
                await chat(text).then(resolve)
            }else{
                  setTimeout(resolve,100);
              }
      }

      })
})}
      

async function main(){
  for(i=0;i<=1;i=0){
    await get_chat_page()
  }
}

main()

  async function gettop(index){
    return new Promise(resolve => {
      fss.readFile('./data/phongthan.txt', 'utf8', async (err, data) => {
      if (err) {
        console.error(err);
        return;
      }else{
        let list_lv6 = data.split('--')
        console.log(list_lv6.length)
        
        if(index <=list_lv6.length){
          let text = `top ${index}:  ${list_lv6[index -1]}`
          await chat(text).then(resolve)
        }
        else{
          await chat('Người này chưa đạt tu vi Luyện Hư cảnh').then(resolve)
        }
      }
    })
  })
}






