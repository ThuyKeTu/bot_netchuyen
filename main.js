const fs = require('fs/promises');
const fss = require('node:fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var Bot_Cookie = "_ga=GA1.1.768879700.1696165315; ASP.NET_SessionId=dxelloq25bpd2r1gj0iykesx; cf_clearance=UIZsbaxF15GVsp1Hm96rGesdvBC6FEsjSX99WEBtNZc-1704508062-0-2-f21cdf88.f89fd8c6.243cf3d0-0.2.1704508062; returnurl1=/; .ASPXAUTH=B3B54D22C800FFD908AF6E64C333508BE8736936488A40757752F27B119560DA8FBD5F735FB391A92807B5AE33F64EF309D120FD4B78E1B85412DAF8776D116EEE3EB90304D6C0D4923675E39CC30B6123B760F18CDD3F92E817A0DFC369902ADD353D0575B70D968CE8206B98FE65954C7F0B7D8E525817C2F520CFB74E1038329CB2E8EFE839787244D4F5B7B26F7F87F155CADF8827ABD5DFF35815EECDB8660A3F412FA51C38A6088EA26CD5FA066E984F751046F2F885D8FBBFD4CED50ADA1D5A1C; netchuyen.comportalroles1=1EA952F1EF269F483E3A9E5DCB4EEB33431D6E8015C6F98143D13870BA28F3F07FF31AB279D599CC751B9B05892E1999C95863F52267C04E36700E2C1F2A9D0054C4329781C284B9E8FA2D8EC41A0667C7B5221FAB2309F62C2AE334724F51F24292C6579D49C98EEA440A8675A52872158100B29696A1596921C80C0F430283EEF00C2ECA194B33024E3AE6E04297D29EF11611920998E17D47857D81A3771BEFCAAD00; _ga_6TELXYEN9X=GS1.1.1704508062.4.1.1704508078.0.0.0"

async function chat(message){
    return new Promise(resolve => {
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


function read_bot_cookie(){
  fss.readFile('./data/account.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }else{
      Bot_Cookie = data
      console.log(Bot_Cookie)
    }
  });
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
      .then((data) => {
        // console.log(data.data)
        let dom = new JSDOM(data.data);
        let mainnode = dom.window.document
        let id_last = mainnode.querySelectorAll('li')[19].querySelector('a').href
        let cmt_last =  mainnode.querySelectorAll('li')[19].querySelector('p').textContent
        
        if(cmt_last =='gettop5'){
          if(id_last == '/user/447259'){
            get_top5().then(resolve)
          }else{
            chat('bạn chưa có quyền sử dụng lệnh này').then(resolve)
          }
        }else if(cmt_last =="myid"){
          let idusercheck = id_last.split('/user/')[1]   
          let text = `id của bạn là:${idusercheck}`
          chat(text).then(resolve)
        }else if(cmt_last.includes('lập lời thề')){
          if(Math.floor(Math.random() * 10) <=6){
            chat("==============CHUẨN ==============").then(resolve)
          }else{
            chat('...').then(resolve)
          }
        }else if(cmt_last =="Phong thần bảng"){
          if(id_last == '/user/447259'){
            get_Lv6().then(resolve)
          }else{
            chat('bạn chưa có quyền sử dụng lệnh này').then(resolve)
          }
        }else{
          console.log(cmt_last)
          setTimeout(resolve,1000)
        }
      })
})}
      
async function get_top5(){
  return new Promise(resolve => {
    fetch('https://netchuyen.com/Post/Services/PostService.asmx/TopMembers?top=5',{
            method: "GET",
          }).then((response) => response.json())
          .then(async (data) => {
               let dom = new JSDOM(data.data)
               let listuser = dom.window.document.querySelectorAll('li')
               for(let i=0;i<5;i++){
                  let name = listuser[i].querySelector(".title").textContent
                  let lv = listuser[i].querySelector(".member").textContent
                  let pecent = listuser[i].querySelector(".progress-bar").style.width
                  let text = `top${i+1}:${name}----${lv}:${pecent}`
                  await chat(text)
               }  
                setTimeout(resolve,3000)
            })
})}



async function main(){
  for(i=0;i<=1;i=0){
    await get_chat_page()
  }
}

main()


async function get_Lv6(){
  return new Promise(resolve => {
  fss.readFile('./data/phongthan.txt', 'utf8', async (err, data) => {
    if (err) {
      console.error(err);
      return;
    }else{
      let list_lv6 = data.split('\r\n')
      console.log(list_lv6.length)
      for(i=0;i<list_lv6.length;i++){
        let text = `top ${i+1}:  ${list_lv6[i]}`
        await chat(text)
      }
      setTimeout(resolve,3000)
    }
  })
})}


