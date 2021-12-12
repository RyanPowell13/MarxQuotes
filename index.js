const PORT = 8080
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const res = require('express/lib/response')
const { response } = require('express')

const app = express()

const quotes = []


app.get('/marx', (req, res) => {
    axios.get('https://www.marxists.org/archive/marx/works/subject/quotes/index.htm')
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)

            $('p:contains("Marx")', html).each(function () {
                const quoteSplit = $(this).text().split("\n")
                const quote = quoteSplit[0]
                const source = quoteSplit[1]

                if (quote != "" && source != null && source.includes("Marx"))
                quotes.push({
                    quote,
                    source
                })
            })
            res.json(quotes)
        })
        
})

app.listen(PORT, () => console.log(`server running on port ${PORT}`))