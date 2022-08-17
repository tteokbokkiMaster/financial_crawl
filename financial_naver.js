const axios = require("axios");
const cheerio = require("cheerio");

const getHTML = async(keyword) => {
    try{
        if (keyword == "코스피"){
            return await axios.get("https://finance.naver.com/sise/sise_index.naver?code=KOSPI")
        }
    }catch(err){
        console.log(err)
    }
}

const parsing = async (keyword) => {
    const html = await getHTML(keyword);
    const $ = cheerio.load(html.data);
    let now_value = ""
    let change_value = ""
    let change_rate = ""

    if (keyword == "코스피"){
        const $indexArea = $("#quotient")

        let indexs = [];

        $indexArea.each((idx, node) => {
            now_value = $(node).find("#now_value").text()
            change_value = $(node).find("#change_value_and_rate").text()
            //change_rate = 
        });
        console.log(now_value)
        console.log(change_value)
    }

}

parsing("코스피");