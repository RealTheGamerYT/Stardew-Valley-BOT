const Discord = require("discord.js"); 
const client = new Discord.Client(); 
const config = require("./config.json"); 
const bot = new Discord.Client();

function changing_status() {
  let status = [  `Servidores OP`,'Meu prefix é ! ´','Sendo Programado!']
  let random = status[Math.floor(Math.random() * status.length)]
  client.user.setActivity(random, { url: 'https://www.twitch.tv/Stormazil', type: "WATCHING"})
}

client.on('message', async message => {

  if (message.author.bot) return;
  if (message.channel.type === "dm") return message.channel.send(`<a:x:581465894178390017>| ${message.author} Sou um bot, não posso falar com vc :c`);
  if (!message.content.startsWith(config.prefix)) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);

  const command = args.shift().toLowerCase();


  try {
    let commandFile = require(`./comandos/${command}.js`) //isso aqui é para quando o bot não reconhecer o comando ele emite essa msg como  erro.
    commandFile.run(client, message, args);

  } catch (err) {
    if (err.code != 'MODULE_NOT_FOUND') {
      console.log(err)
    } else if (err.code == 'MODULE_NOT_FOUND') {
      message.channel.send({ embed: { description: " <:cold_sweat:581465847411900430> **|** ``Comando inexistente, tente novamente.``", color: 0x00F40101 } });
      message.delete(300)
    }
  }


});

client.on("ready", () => {
  console.log('MC Skils está ON');
  setInterval(changing_status, 10000);
}); 


client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const comando = args.shift().toLowerCase();

});


let traduzir = n => `${n}`.split('').map(e => e + '\u20E3').join('')

client.on('guildMemberAdd', member => {
    member.guild.channels.get('542772173828259850') // isso aqui é um contador de membors, que aparece no topico do chat, precisa do Id que você pega apertando aqui, olha a tela.
       
 .setTopic(`<a:tutstutsgs:581465880953618432> membros:  ${traduzir(member.guild.members.size)} <a:Hypergs:581465858358902824>  .`)
})
  
client.on('guildMemberRemove', member => {
    member.guild.channels.get('542772173828259850')
      
 .setTopic(`<a:tutstutsgs:581465880953618432> membros:  ${traduzir(member.guild.members.size)} <a:Hypergs:581465858358902824>  .`)
})

  
client.on('guildMemberAdd', member => {
  if (member.guild.id !== "542772173828259850") return; //aqui é o id do servidor, vc pega apertando aqui. Olha a tela
  let avatar = member.user.avatarURL
  let embed = new Discord.RichEmbed()
      .setColor('#f1f1f2')
      .setThumbnail(avatar)
      .setTitle("**Messagem de bem-vindo**")
      .addField('Bem vindo(a)!', `Bem vindo(a) ${member} Ao servidor :)`)
      .setFooter(`Agora você tem Hype ${member.username}`)
      .addField('<:mais1:581465845830516749> Você é o membro de numero:', member.guild.memberCount)
      .setDescription(" <:ateno:581465845616869396> Seja bem vindo(a) no servidor!  <:ateno:581465845616869396> ")
      .setTimestamp()
  client.channels.get('614090180319772693').send(embed) //aqui vai o id do chat que você pega apertando no nome do chat.
}); 




  client.login(config.token);