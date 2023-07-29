const mineflayer = require('mineflayer')
const config = require('./config.json')

const {Client, MessageEmbed} = require('discord.js')
function createbot (){
    const bot = mineflayer.createBot({
        ip : config.server_info['ip/domain'], //ip server
        username : config.mcbot_info['namebot'], // username
        port: config.server_info['port'],
        ver : config.server_info['ver']
    })
    const disc_bot = new Client();
    
    var pin = [config.mcbot_info['pin_1'], config.mcbot_info['pin_2'], config.mcbot_info['pin_3'], config.mcbot_info['pin_4']];
    
    
    bot.on('windowOpen', (window) => {
        window.requiresConfirmation = false;
        bot.clickWindow(pin[0], 0, 0)
        bot.clickWindow(pin[1], 0, 0)
        bot.clickWindow(pin[2], 0, 0)
        bot.clickWindow(pin[3], 0, 0);
        setTimeout(() => {bot.chat('/anarchyvn')}, 15 * 1000)
        setTimeout(() => { bot.clickWindow(10, 0, 0) }, 20 * 1000)
    })
    bot.on('login', async() =>{
        let channel = disc_bot.channels.cache.get(config.discordsetting['id_channel'])
        bot.once('spawn', ()=>{
            channel.send(`bot dang login vao acc ${username}`)
        })
    })
    bot.on('message', Message =>{
        let channel = disc_bot.channels.cache.get(config.discordsetting['id_channel'])
        if (!channel) return;
        const cn = new MessageEmbed()
            .setColor(config.discordsetting['ember_color'])
            .setDescription(`${Message}`)
        channel.send(cn)
    })
    bot.on('kicked', function() {
        let channel = disc_bot.channels.cache.get(`854712390817808404`)
        if (!channel) return;
          const cn3 = new MessageEmbed()
                .setColor('F90000')
                .setDescription(`Bot đã bị disconnect khỏi ${ip}`)
            channel.send(cn3);
        setTimeout(createbot, 2000)
        })
    
    
    
}
console.log(pin)
createbot()
bot.on(console.log("connected..."))
disc_bot.login(config.discordsetting['token'])

