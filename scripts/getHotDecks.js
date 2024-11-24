// NPM packages that we installed
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import _ from 'lodash';
import fs from "fs";

// Function starts here
async function getFormulaOneDrivers() {
    try {
        const decks = [];

        Promise.all(_.times(5).map(async (idx) => {
            const response = await fetch('https://www.swudb.com/decks/hot?skip=' + idx * 20);
            const body = await response.text();
            const $ = cheerio.load(body);

            return Promise.all($('.row.py-3.decks-result > div.col.mb-3.mb-sm-0 > a').map(async (i, el) => {
                const deck = await fetch('https://www.swudb.com' + el.attribs.href);
                // Convert the response into text
                const deckBody = await deck.text();
                // Load body data
                const deckData = cheerio.load(deckBody);

                const deckJSON = await fetch('https://www.swudb.com' + el.attribs.href + "?handler=JsonFile");
                // Convert the response into text
                const deckJSONBody = await deckJSON.text();

                decks.push({
                    json: JSON.parse(deckJSONBody),
                    comment: deckData("#deck-description > div > p").contents().map(function () {
                        return (this.type === 'text') ? $(this).text() : '';
                    }).get().join(' ')
                });
            }));
        })).then(() => {
            fs.writeFile('hotDecksRip.json', JSON.stringify(decks), 'utf8', () => { });
        });

    } catch (error) {
        console.log(error);
    }
}

// Run getFormulaOneDrivers
getFormulaOneDrivers();
