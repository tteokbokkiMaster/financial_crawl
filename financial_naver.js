const axios = require("axios");
const cheerio = require("cheerio");
let list = [];

const getHTML = async(keyword) => {
    try{
        if (keyword == "코스피"){
            return await axios.get("https://finance.naver.com/sise/sise_index.naver?code=KOSPI")
        }else if(keyword == "나스닥"){
            return await axios.get("https://finance.naver.com/world/sise.naver?symbol=NAS@IXIC")
        }
    }catch(err){
        console.log(err)
    }
}

const parsing = async (keyword) => {
    const html = await getHTML(keyword);
    const $ = cheerio.load(html.data);
    let now_value = ""
    let symbol = ""
    let change_value = ""
    let change_rate = ""

    if (keyword == "코스피"){
        const $indexArea = $("#quotient")
        $indexArea.each((idx, node) => {
            now_value = $(node).find("#now_value").text();
            temp = $(node).find("#change_value_and_rate").text();
            
            if(temp.substr(temp.indexOf(" ")+1, 1)=='-'){
                symbol = '▼ '
            }else{
                symbol = '▲ '
            }

            change_value = symbol + temp.substring(0, temp.indexOf(" "))
            change_rate = temp.substring(temp.indexOf(" ")+1, temp.indexOf("%")+1);

            list.push({
                name: keyword,
                now_value: now_value,
                change_value: change_value,
                change_rate: change_rate
            })
        });
    }else if(keyword=="나스닥"){
        const $indexArea = $('.today');

        $indexArea.each((idx, node) => {
            now_value = $(node).find(".no_today").text().trim();
            temp = $(node).find(".no_up > span").text().trim();
            console.log(temp)
        })
    }

}

const open = async() => {
    await parsing("코스피");
    await parsing("나스닥");

    console.log(list)
}

open()