const Game = require('../utils/Game');
const Rate = require('../utils/Rate');
const rate = new Rate();
const embedUtils = require('../utils/embedBuilder');

const defaultCountries = ['FR', 'RU'];

module.exports = async (msg, appId, countries) => {
    defaultCountries.filter(country => !countries.includes(country)).forEach(country => countries.push(country));

    const game = new Game(appId, rate);
    await game.fetchGameDetails(countries);

    if (!game.isInit())
        return msg.reply("\n:x: Les informations du jeu n'ont pas pu être récupérées").catch(err => console.error(err));

    msg.reply(embedUtils.build(msg, game)).catch(err => console.error(err));
}