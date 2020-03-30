# 
```
// dependencies
npm i puppeteer

// script
const fs = require('fs')
const fileList = fs.readdirSync('./')
console.log('Files: ', fileList)

const puppeteer = require('puppeteer'); //  引入依赖
(async () => {   //使用async函数完美异步
    const browser = await puppeteer.launch();  //打开新的浏览器
    const page = await browser.newPage();   // 打开新的网页
    await page.goto('https://www.jd.com/');  //前往里面 'url' 的网页
    // Scenerio 1: 爬取网页图片
    // const result = await page.evaluate(() => {   //这个result数组包含所有的图片src地址
    //     let arr = []; //这个箭头函数内部写处理的逻辑
    //     const imgs = document.querySelectorAll('img');
    //     imgs.forEach(function (item) {
    //         arr.push(item.src)
    //     })
    //     return arr
    // });
    // console.log('source: ', result)
    // fs.writeFileSync('./img.json', JSON.stringify(result));

    // Scenerio 2: 打印网页为pdf
    let pdfFilePath = './index.pdf';
    //根据你的配置选项，我们这里选择A4纸的规格输出PDF，方便打印
    await page.pdf({
        path: pdfFilePath,
        format: 'A4',
        scale: 1,
        printBackground: true,
        landscape: false,
        displayHeaderFooter: false
    });
    await browser.close()
})()
```