const moment = require("moment");
const cheerio = require("cheerio");
const get = require('got')
const fs = require("fs");
const dl = require("./lib/downloadImage.js");
const fetch = require('node-fetch');
const urlencode = require("urlencode");
const axios = require("axios");
const imageToBase64 = require('image-to-base64');
const PdfToBase64 = require('pdf-to-base64');
const audioToBase64 = require('audio-decode');
const menu = require("./lib/menu.js");
const baca = require("./lib/baca.js");
const cara = require("./lib/cara.js");
const donate = require("./lib/donate.js");
const info = require("./lib/info.js");
//
const BotName = '</RevBotz>'; // Nama Bot Whatsapp
const instagramlu = 'https://www.instagram.com/revoer_id/'; // Nama Instagramlu cok
const whatsapplu = '0857-3689-1082'; // Nomor whatsapplu cok
const kapanbotaktif = '24 Jam'; // Kapan bot lu aktif
const vthearapi = 'BELI SENDIRI LAH KONTOL'
const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
            + 'VERSION:3.0\n' 
            + 'FN:Revoer ID\n' // full name
            + 'ORG:Owner/Ceo RevBotz;\n' // the organization of the contact
            + 'TEL;type=CELL;type=VOICE;waid=6285736891082:+62 857-3689-1082\n' // WhatsApp ID + phone number
            + 'END:VCARD'
const grupch1 = 'https://chat.whatsapp.com/GNjc27uuF454GOc2K5R28p'; // OFFICIAL GRUP LU 1
const grupch2 = 'https://chat.whatsapp.com/DTtvkJecHqtBIxrfJAcirL'; // OFFICIAL GRUP LU 2
//


const
{
   WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   waChatKey,
   GroupSettingChange,
   mentionedJid,
   processTime,
} = require("@adiwajshing/baileys");
var jam = moment().format("HH:mm");

function foreach(arr, func)
{
   for (var i in arr)
   {
      func(i, arr[i]);
   }
}
const rev = new WAConnection()
rev.on('qr', qr =>
{
   qrcode.generate(qr,
   {
      small: true
   });
   console.log(`[ ${moment().format("HH:mm:ss")} ] Scan kode qr mu cok#`);
});

rev.on('credentials-updated', () =>
{
   // save credentials whenever updated
   console.log(`credentials updated#`)
   const authInfo = rev.base64EncodedAuthInfo() // get all the auth info we need to restore this session
   fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t')) // save this info to a file
})
fs.existsSync('./session.json') && rev.loadAuthInfo('./session.json')
// uncomment the following line to proxy the connection; some he proxy I got off of: https://proxyscrape.com/free-proxy-list
//rev.connectOptions.agent = ProxyAgent ('http://1.0.180.120:8080')
rev.connect();

rev.on('user-presence-update', json => console.log(`[ ${moment().format("HH:mm:ss")} ] => OBROLAN GA PENTING AJG || REV`))
rev.on('message-status-update', json =>
{
   const participant = json.participant ? ' (' + json.participant + ')' : '' // participant exists when the message is from a group
   console.log(`[ ${moment().format("HH:mm:ss")} ] => RECEIVE MESSAGE : REVOER_ID`)
})

rev.on('message-new', async(m) =>
{
   const messageContent = m.message
   const text = m.message.conversation
   let id = m.key.remoteJid
   const messageType = Object.keys(messageContent)[0] // message will always contain one key signifying what kind of message
   let imageMessage = m.message.imageMessage;
   let videoMessage = m.message.videoMessage;
   console.log(`[ ${moment().format("HH:mm:ss")} ] => Nomor: [ ${id.split("@s.whatsapp.net")[0]} ] => ${text}`);


// Groups

        
if (text.includes("#buatgrup"))
   {
var nama = text.split("#buatgrup")[1].split("-nomor")[0];
var nom = text.split("-nomor")[1];
var numArray = nom.split(",");
for ( var i = 0; i < numArray.length; i++ ) {
    numArray[i] = numArray[i] +"@s.whatsapp.net";
}
var str = numArray.join("");
console.log(str)
const group = await rev.groupCreate (nama, str)
console.log ("created group with id: " + group.gid)
rev.sendMessage(group.gid, "Hello Gays Revoer Bot Disini :v", MessageType.extendedText) // say hello to everyone on the group

}

// FF
if(text.includes("#cek")){
var num = text.replace(/#cek/ , "")
var idn = num.replace("0","+62");

console.log(id);
const gg = idn+'@s.whatsapp.net'

const exists = await rev.isOnWhatsApp (gg)
console.log(exists);
rev.sendMessage(id ,`${gg} ${exists ? " exists " : " does not exist"} on Bumi`, MessageType.text, {quoted : m})
}

    
/*if (text.includes("#tts")){
const teks = text.replace(/#tts /, "")
const gtts = (`https://rest.farzain.com/api/tts.php?id=${teks}&apikey=O8mUD3YrHIy9KM1fMRjamw8eg`)
    rev.sendMessage(id, gtts ,MessageType.audio, {ptt : true} );
}*/

if (text.includes('#creator')){
rev.sendMessage(id, {displayname: "Jeff", vcard: vcard}, MessageType.contact)
rev.sendMessage(id, 'Ingin donasi untuk masukin Bot ke group?, chat Owner :D', MessageType.text, {quoted : m})
}


if (text.includes('#nulis')){
  var teks = text.replace(/#nulis /, '')
    axios.get('http://salism3.pythonanywhere.com/nulis?text='+teks)
    .then((res) => {
      imageToBase64(res.data.images)
        .then(
          (ress) => {
            rev.sendMessage(id, '[❗] Membuat Tulisan...\nNote: '+res.data.message, MessageType.text, {quoted : m} )
            var buf = Buffer.from(ress, 'base64')
            rev.sendMessage(id, buf, MessageType.image)
        })
    })
}

if (text.includes("#ytmp3")){
const teks = text.replace(/#ytmp3 /, "")
axios.get(`https://api.vhtear.com//ytmp3?query=${teks}&apikey=${vthearapi}`).then((res) => {
	rev.sendMessage(id, '[❗] Membuat Link Download... ', MessageType.text, {quoted : m})
    let hasil = `*Judul:* ${res.data.result.title}\n\n *Size:* ${res.data.result.size}\n\n *Audio:* ${res.data.result.mp3}\n\n *Duration:* ${res.data.result.duration}`;
    rev.sendMessage(id, hasil ,MessageType.text, {quoted : m});
})
}

if (text.includes("#masak")){
const teks = text.replace(/#masak /, "")
axios.get(`https://api.vhtear.com/resepmasakan?query=${teks}&apikey=${vthearapi}`).then((res) => {
    let hasil = `CARA MEMASAK *${res.data.result.title}*\n\nBahan Bahan: *${res.data.result.bahan}*\n\nCara Memasak : *${res.data.result.cara}*\n`;
    rev.sendMessage(id, hasil ,MessageType.text, {quoted : m});
})
}

if (text.includes("#infonope")){
const teks = text.replace(/#infonope /, "")
axios.get(`https://docs-jojo.herokuapp.com/api/infonomor?no=${teks}`).then((res) => {
    let hasil = `│➸INTERNATIONAL PHONE :*${res.data.international}*\n\n│➸Operator : *${res.data.op}*\n\n`;
    rev.sendMessage(id, hasil ,MessageType.text, {quoted : m} );
})
}

/*if (text.includes("#yutubdl")){
const teks = text.replace(/#yutubdl /, "")
axios.get(`https://scrap.terhambar.com/yt?link=${teks}`).then((res) => {
    let hasil = `Terjadi Kesalahan Server Saat MengUpload.Kamu Dapat Mengunduh Secara Manual Disini :..\n\nJudul Video: ${res.data.title}\n\nLink: ${res.data.linkVideo}\n\nDurasi : ${res.data.inText}`;
    rev.sendMessage(id, hasil ,MessageType.text, {quoted : m});
})
}*/


if (text.includes("#fb")){
const teks = text.replace(/#fb /, "")
axios.get(`https://api.vhtear.com/fbdl?link=${teks}&apikey=${vthearapi}`).then((res) => {
    let hasil = `BERHASIL DI *DOWNLOAD#* SILAHKAN UNDUH MELALUI LINK BERIKUT\n\nJudul: - \n\nLink: ${res.data.result.VideoUrl}`;
    rev.sendMessage(id, hasil ,MessageType.text, {quoted : m});
})
}

if (text.includes("#buatnama")){
const teks = text.replace(/#buatnama /, "")
axios.get(`https://api.terhambar.com/nama?jenis=${teks}`).then((res) => {
    let hasil = `NAMA YANG COCOK UNTUK ANAKMU/MU\n\n*${res.data.result.nama}*`;
    rev.sendMessage(id, hasil ,MessageType.text, {quoted : m});
})
}

if (text.includes("#stalkig")){
  const teks = text.replace(/#stalkig /, "")
  axios.get(`https://api.vhtear.com/igprofile?query=${teks}&apikey=${vthearapi}`).then ((res) =>{
  rev.sendMessage(id, '[❗] Sabar Lagi Stalking IG Punya '+teks, MessageType.text, {quoted : m})
  let hasil = `YAHAHA TELAH DI STALK BOS KU UNTUK USERNAME ${teks} \n\n *Username👀* : _${res.data.result.username}_ \n *Nama✍️* : _${res.data.result.full_name}_ \n *Jumlah Follower🤷‍♀️¸* : _${res.data.result.follower}_ \n *Jumlah Following👥¸* : _${res.data.result.follow}_ \n *Jumlah Post💌* : _${res.data.result.post_count}_ \n *Biografi❣️ :* _${res.data.result.biography}`;
  rev.sendMessage(id, hasil, MessageType.text, {quoted : m});
})
}

if (text.includes("#lirik")){
const teks = text.replace(/#lirik /, "")
axios.get(`https://scrap.terhambar.com/lirik?word=${teks}`).then((res) => {
    let hasil = `${res.data.result.lirik}`;
    rev.sendMessage(id, hasil ,MessageType.text, {quoted : m});
})
}

if (text.includes("#seberapagay")){
const teks = text.replace(/#seberapagay /, "")
axios.get(`https://arugaz.herokuapp.com/api/howgay`).then((res) => {
    let hasil = `Nih Liat Data Gay Si ${teks}\n\n\nPersentase Gay : ${res.data.persen}%\nAlert!!! : ${res.data.desc}`;
    rev.sendMessage(id, hasil ,MessageType.text, {quoted : m});
})
}

if (text.includes("#ngajisurah")){
const teks = text.replace(/#ngajisurah /, "")
axios.get(`https://api.vhtear.com/quran?no=${teks}&apikey=${vthearapi}`).then((res) => {
    let hasil = `NAMA SURAH : ${res.data.result.surah}\n\n${res.data.result.quran}`;
    rev.sendMessage(id, hasil ,MessageType.text, {quoted : m});
})
}

if (text.includes("#brain")){
const teks = text.replace(/#brain /, "")
axios.get(`https://api.vhtear.com/branly?query=${teks}&apikey=${vthearapi}`).then((res) => {
    let hasil = `${res.data.result.data}`;
    rev.sendMessage(id, hasil ,MessageType.text, {quoted : m});
})
}

if (text.includes("#jadwalsholat")){
const teks = text.replace(/#jadwalsholat /, "")
axios.get(`https://api.vhtear.com/jadwalsholat?query=${teks}&apikey=${vthearapi}`).then((res) => {
    let hasil = `JADWAL SHOLAT DI ${teks}\n\nSubuh: ${res.data.result.Shubuh}\nDzuhur: ${res.data.result.Zduhur}\nAshar: ${res.data.result.Ashr}\nMaghrib: ${res.data.result.Maghrib}\nIsya : ${res.data.result.Isya}\nTanggal: ${res.data.result.tanggal}`;
    rev.sendMessage(id, hasil ,MessageType.text, {quoted : m});
})
}
if (text.includes("#quotes")){
const teks = text.replace(/#quotes /, "")
axios.get(`https://api.vhtear.com/quoteid&apikey=${vthearapi}`).then((res) => {
    let hasil = `*_${res.data.result.kata}_*\n\n\n  _By : RevBotz_`;
    rev.sendMessage(id, hasil ,MessageType.text, {quoted : m});
})
}

if (text.includes("#mediafiredl")){
const teks = text.replace(/#mediafiredl /, "")
axios.get(`https://docs-jojo.herokuapp.com/api/mediafire?url=${teks}`).then((res) => {
    let hasil = `File Name : *_${res.data.filename}_*\nSize : ${res.data.filesize}\nType Of File: ${res.data.filetype}\nUpload On : ${res.data.uploaded}\nDirect Link : ${res.data.url}`;
    rev.sendMessage(id, hasil ,MessageType.text, {quoted : m});
})
}

if (text.includes("#convert")){
const teks = text.replace(/#convert /, "")
axios.get(`https://api.terhambar.com/currency?curr=usd&bal=${teks}`).then((res) => {
    let hasil = `HASIL DARI $${teks} Adalah\n\n*${res.data.result.resultConvert}*`;
    rev.sendMessage(id, hasil ,MessageType.text, {quoted : m});
})
}


if (text.includes("#chord")){
const teks = text.replace(/#chord /, "")
axios.get(`https://arugaz.herokuapp.com/api/chord?q=${teks}`).then((res) => {
    let hasil = `${res.data.result}`;
    rev.sendMessage(id, hasil ,MessageType.text, {quoted : m});
})
}

if (text.includes("#ceknope")){
const teks = text.replace(/#ceknope /, "")
axios.get(`https://api.vhtear.com/nomerhoki?no=${teks}&apikey=${vthearapi}`).then((res) => {
    let hasil = `${res.data.result.hasil}`;
    rev.sendMessage(id, hasil ,MessageType.text, {quoted : m});
})
}

if (text.includes("#simi")){
const teks = text.replace(/#simi /, "")
axios.get(`https://st4rz.herokuapp.com/api/simsimi?kata=${teks}`).then((res) => {
    let hasil = `*${res.data.result}*`;
    rev.sendMessage(id, hasil ,MessageType.text, {quoted : m} );
})
}

if (text.includes("#faktaunix")){
const teks = text.replace(/#faktaunix /, "")
axios.get(`https://arugaz.my.id/api/random/text/faktaunik`).then((res) => {
    let hasil = `*${res.data.result}*`;
    rev.sendMessage(id, hasil ,MessageType.text, {quoted : m} );
})
}

if (text.includes("#translate")){
const teks = text.replace(/#translate /, "")
axios.get(`https://arugaz.my.id/api/edu/translate?lang=en&text=${teks}`).then((res) => {
    let hasil = `INDONESIA : ${teks}\n\n => Translate : *${res.data.text}*`;
    rev.sendMessage(id, hasil ,MessageType.text, {quoted : m} );
})
}

if (text.includes("#ig")){
const teks = text.replace(/#ig /, "")
axios.get(`https://arugaz.my.id/api/media/ig?url=${teks}`).then((res) => {
    let hasil = `Download Sendiri Nih :v\n\n${res.data.result.url}\n\nNB : Error? Berarti Akun IG Diprivate!`;
    rev.sendMessage(id, hasil ,MessageType.text, {quoted : m});
})
}

if (text.includes("#shortit")){
const teks = text.replace(/#shortit /, "")
axios.get(`https://api.vhtear.com/shortener?link=${teks}&apikey=${vthearapi}`).then((res) => {
	rev.sendMessage(id, '[❗] Memendekan URL... ', MessageType.text, {quoted : m})
    let hasil = `UDH NIH AJG\n\nLINK ASLI: ${res.data.result.Url}\n\nSHORTED: ${res.data.result.Short}`;
    rev.sendMessage(id, hasil ,MessageType.text, {quoted : m});
})
}

if (text.includes("#ttslontong")){
const sleep = require('sleep');
const teks = text.replace(/#ttslontong /, "")
axios.get(`https://api.vhtear.com/funkuis&apikey=${vthearapi}`).then((res) => {
	rev.sendMessage(id, '[❗] SOAL : '+res.data.result.soal, MessageType.text, {quoted : m})
	  function sleep(n) {
  sleep.sleep(n*100000000000000000000000000000000000000000000000000000000);
}
    let hasil = `YHAAA GA TAU YA?? \n\nJawaban: ${res.data.result.jawaban}\nKarena : ${res.data.result.desk}`;
    rev.sendMessage(id, hasil ,MessageType.text, {quoted : m});
})
}


if (text.includes("#zodiak")){
const teks = text.replace(/#zodiak /, "")
axios.get(`https://api.vhtear.com/zodiak?query=${teks}&apikey=${vthearapi}`).then((res) => {
	rev.sendMessage(id, '[✔️] ZODIAK '+ teks + ' DITEMUKAN#', MessageType.text, {quoted : m})
    let hasil = `ZODIAK: *${res.data.result.zodiak}*\n\nRAMALAN : *${res.data.result.ramalan}*\n\nLUCKY NUMBER : ${res.data.result.nomorKeberuntungan}\n\nMOTIVASI: ${res.data.result.motivasi}`;
    rev.sendMessage(id, hasil ,MessageType.text, {quoted : m});
})
}


if (text.includes("#bapack")){
const teks = text.replace(/#bapack /, "")
axios.get(`https://api.terhambar.com/bpk?kata=${teks}`).then((res) => {
    let hasil = `*${teks}* ==> *${res.data.text}*`;
    rev.sendMessage(id, hasil ,MessageType.text, {quoted : m});
})
}





/*if (text.includes('#randomhentong')){
  var teks = text.replace(/#randomhentong /, '')
    axios.get('https://tobz-api.herokuapp.com/api/hentai')
    .then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            rev.sendMessage(id, '[❗] Bacol Hentai Sedang Dikirimkan.. ', MessageType.text, {quoted : m})
            var buf = Buffer.from(ress, 'base64')
            rev.sendMessage(id, buf, MessageType.image, {caption : 'jangan coly bro, kalau lu spam ini gua block'} )
        })
    })
}*/

if (text.includes('#scrapanime')){
  var teks = text.replace(/#scrapanime /, '')
    axios.get('https://st4rz.herokuapp.com/api/kuso?q='+teks)
    .then((res) => {
      imageToBase64(res.data.thumb)
        .then(
          (ress) => {
            rev.sendMessage(id, '[❗] Mengambil Data Informasi...', MessageType.text, {quoted : m} )
            var buf = Buffer.from(ress, 'base64')
            rev.sendMessage(id, buf, MessageType.image, {caption : 'HASIL DIBAWAH :\n\n*Anime '+res.data.title+' TELAH DI Scrapt!!*\n\n*Judul Anime* :'+res.data.title+'\n\n*Informasi*: ' +res.data.info+'\n\n*Sinopsis* : ' +res.data.sinopsis+'\n\n*LinkDownload* :'+res.data.link_dl})
        })
    })
}


if (text.includes('#marvellogo')){
   const request = require('request');
   var gh = text.split("#marvellogo ")[1];
    var t1 = gh.split("&")[0];
    var t2 = gh.split("&")[1];
    var url = "https://arugaz.my.id/api/textpro/marvelstudio?text1="+t1+"&text2="+t2
    axios.get(url)
    .then((res) => {
      imageToBase64(url)
        .then(
          (ress) => {
            rev.sendMessage(id, '[💪😎] Wait Cok', MessageType.text, {quoted : m} )
            var buf = Buffer.from(ress, 'base64')
            rev.sendMessage(id, buf, MessageType.image, {caption : 'Nih Bwang'} )
        })
    })
}


if (text.includes('#randomeme')){
var teks = text.replace(/#randomeme /, '')
    axios.get('https://api.zeks.xyz/api/memeindo?apikey=xptnbot352')
    .then((res) => {
      imageToBase64(res.data.result) 
        .then(
          (ress) => {
            rev.sendMessage(id, '[💪😎🤙] Mencari Meme Cringe.. . ', MessageType.text, {quoted : m} )
            var buf = Buffer.from(ress, 'base64')
            rev.sendMessage(id, buf, MessageType.image, {caption : 'Bjir'} )
        })
    })
}

if (text.includes('#darkjoke')){
var teks = text.replace(/#darkjoke /, '')
    axios.get('https://api.zeks.xyz/api/darkjokes?apikey=xptnbot352')
    .then((res) => {
      imageToBase64(res.data.result) 
        .then(
          (ress) => {
            rev.sendMessage(id, '[💪😎🤙] Mencari Candaan Gelap. ', MessageType.text, {quoted : m} )
            var buf = Buffer.from(ress, 'base64')
            rev.sendMessage(id, buf, MessageType.image, {caption : 'D4rk b4ng3t'} )
        })
    })
}

if (text.includes('#lightext')){
var teks = text.replace(/#lightext /, '')
    axios.get('https://api.zeks.xyz/api/lithgtext?text=' +teks+'&apikey=apivinz')
    .then((res) => {
      imageToBase64(res.data.result) 
        .then(
          (ress) => {
            rev.sendMessage(id, '[💪😎🤙] Bentar Bor ', MessageType.text, {quoted : m} )
            var buf = Buffer.from(ress, 'base64')
            rev.sendMessage(id, buf, MessageType.image, {caption : 'Dh Jadi Tulisan '+teks+' Nya'} )
        })
    })
}


if (text.includes('#grafitytext')){
var teks = text.replace(/#grafitytext /, '')
    axios.get('https://hujanapi.herokuapp.com/api/lightgraffiti?text='+teks+'&apiKey=trialhujanapi')
    .then((res) => {
      imageToBase64(res.data.result.result)
        .then(
          (ress) => {
            rev.sendMessage(id, '[❗] Sabar Tod Lagi Dibikin Yekan', MessageType.text, {quoted : m} )
            var buf = Buffer.from(ress, 'base64')
            rev.sendMessage(id, buf, MessageType.image, {caption : 'Awowkwokk'} )
        })
    })
}



if (text.includes('#minionteks')){
  var teks = text.replace(/#minionteks /, '')
  var url = "https://arugaz.my.id/api/textpro/miniontext?text="+teks;
    axios.get(url)
    .then((res) => {
      imageToBase64(url)
        .then(
          (ress) => {
            rev.sendMessage(id, '[🔰] Bemtar Bro', MessageType.text, {quoted : m } )
            var buf = Buffer.from(ress, 'base64')
            rev.sendMessage(id, buf, MessageType.image, {quoted : m, caption : ':v'} )
        })
    })
}

if (text.includes('#lavatext')){
  var teks = text.replace(/#lavatext /, '')
  var url = "https://arugaz.my.id/api/textpro/lavatext?text="+teks;
    axios.get(url)
    .then((res) => {
      imageToBase64(url)
        .then(
          (ress) => {
            rev.sendMessage(id, '[🔰] Tunggu Bro', MessageType.text, {quoted : m } )
            var buf = Buffer.from(ress, 'base64')
            rev.sendMessage(id, buf, MessageType.image, {caption : ':v'} )
        })
    })
}



if (text.includes('#hartatahta')){
  var teks = text.replace(/#hartatahta /, '')
  var url = "https://api.vhtear.com/hartatahta?text=" +teks+ "&apikey=" +vthearapi;
    axios.get(url)
    .then((res) => {
      imageToBase64(url)
        .then(
          (ress) => {
            rev.sendMessage(id, '[❗] Hirti Tihti Tai Babi :v', MessageType.text, {quoted : m}, {quoted : m } )
            var buf = Buffer.from(ress, 'base64')
            rev.sendMessage(id, buf, MessageType.image, {caption : 'jadiin #sticker bagus keknya (No Tag Ajg) '} )
        })
    })
}

if (text.includes('#hengkertext')){
  var teks = text.replace(/#hengkertext /, '')
  var url = "https://arugaz.my.id/api/textpro/matrixtext?text=" +teks;
    axios.get(url)
    .then((res) => {
      imageToBase64(url)
        .then(
          (ress) => {
            rev.sendMessage(id, '[❗] Wad00h 4D4 H3ngk3r', MessageType.text, {quoted : m}, {quoted : m } )
            var buf = Buffer.from(ress, 'base64')
            rev.sendMessage(id, buf, MessageType.image, {caption : ':v'} )
        })
    })
}

if (text.includes('#camerikatext')){
  var teks = text.replace(/#camerikatext /, '')
  var url = "https://arugaz.my.id/api/textpro/captamerica?text=" +teks;
    axios.get(url)
    .then((res) => {
      imageToBase64(url)
        .then(
          (ress) => {
            rev.sendMessage(id, '[🔰] Tunggu Anjg', MessageType.text, {quoted : m}, {quoted : m } )
            var buf = Buffer.from(ress, 'base64')
            rev.sendMessage(id, buf, MessageType.image, {caption : ':v'} )
        })
    })
}

if (text.includes('#baloontext')){
  var teks = text.replace(/#baloontext /, '')
  var url = "https://arugaz.my.id/api/textpro/foilballoon?text="+teks;
    axios.get(url)
    .then((res) => {
      imageToBase64(url)
        .then(
          (ress) => {
            rev.sendMessage(id, '[🔰] Sabar Cok Lagi Ditiup', MessageType.text, {quoted : m } )
            var buf = Buffer.from(ress, 'base64')
            rev.sendMessage(id, buf, MessageType.image, {caption : 'Besok Kempes :v'} )
        })
    })
}

if (text.includes('#pornhub')){
    const request = require('request');
    var gh = text.split("#pornhub ")[1];
    var t1 = gh.split("&")[0];
    var t2 = gh.split("&")[1];
  var url = "https://api.vhtear.com/pornlogo?text1=" +t1+ "&text2=" +t2+ "&apikey=" +vthearapi;
    axios.get(url)
    .then((res) => {
      imageToBase64(url)
        .then(
          (ress) => {
            rev.sendMessage(id, '[❗] Wah Parah Sering Nonton', MessageType.text, {quoted : m})
            var buf = Buffer.from(ress, 'base64')
            rev.sendMessage(id, buf, MessageType.image, {caption : 'jadiin pp bagus gayn'} )
        })
    })
}

if (text.includes('#mobalogo')){
    const request = require('request');
    var gh = text.split("#mobalogo ")[1];
    var t1 = gh.split("&")[0];
    var t2 = gh.split("&")[1];
  var url = "https://api.vhtear.com/logoml?hero=" +t1+ "&text=" +t2+ "&apikey=" +vthearapi;
    axios.get(url)
    .then((res) => {
      imageToBase64(url)
        .then(
          (ress) => {
            rev.sendMessage(id, '[❗] Wait Sayang :v', MessageType.text, {quoted : m} )
            var buf = Buffer.from(ress, 'base64')
            rev.sendMessage(id, buf, MessageType.image, {caption : 'Nih Bro'}, {quoted : m} )
        })
    })
}




if (text.includes('#makecalender')){
  var teks = text.replace(/#makecalender /, '')
    axios.get('https://api.zeks.xyz/api/calendar?img=' +teks+'&apikey=xptnbot352')
    .then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            rev.sendMessage(id, '[✍️] Wait Sedang Membuat Calender... ', MessageType.text, {quoted : m})
            var buf = Buffer.from(ress, 'base64')
            rev.sendMessage(id, buf, MessageType.image, {caption : 'udah jadi mamank'} )
        })
    })
}

if (text.includes('#jooxdl')){
  var teks = text.replace(/#jooxdl /, '')
    axios.get('https://tobz-api.herokuapp.com/api/joox?q=' +teks+'&apikey=BotWeA')
    .then((res) => {
      imageToBase64(res.data.result.thumb)
        .then(
          (ress) => {
            rev.sendMessage(id,'TUNGGU SEBENTAR...', MessageType.text, {quoted : m} )
            var buf = Buffer.from(ress, 'base64')
            rev.sendMessage(id, buf, MessageType.image, {caption : '[❗] LAGU YANG DICARI BERHASIL Ditemukan!!\n\n[❓] Judul Lagu: '+res.data.result.judul+'\n[🤔] Album: '+res.data.result.album+'\n[✍️] Size Of File: Lah Mana Gua Tau\n[📖] Link Download : '+res.data.result.mp3+'\n[🦾] Release Date : ' +res.data.result.dipublikasi } )
        })
    })
}

if (text.includes('#embunteks')){
  var teks = text.replace(/#embunteks /, '')
    axios.get('https://tobz-api.herokuapp.com/api/textpro?theme=dropwater&text='+teks+'&apikey=BotWeA')
    .then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            rev.sendMessage(id, '[❗] Tunggu Bentaran...' , MessageType.text, {quoted : m} )
            var buf = Buffer.from(ress, 'base64')
            rev.sendMessage(id, buf, MessageType.image, {caption : 'Udh Jadi'} )
        })
    })
}

if (text.includes('#bloodteks')){
  var teks = text.replace(/#bloodteks /, '')
    axios.get('https://tobz-api.herokuapp.com/api/textpro?theme=blood&text='+teks+'&apikey=BotWeA')
    .then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            rev.sendMessage(id, '[❗] Tunggu Bentar Ngab' , MessageType.text, {quoted : m} )
            var buf = Buffer.from(ress, 'base64')
            rev.sendMessage(id, buf, MessageType.image, {caption : 'Yoi'} )
        })
    })
}




if (text.includes('#lionlogo')){
  const request = require('request');
    var gh = text.split("#lionlogo ")[1];
    var atas = gh.split("&")[0];
    var bawah = gh.split("&")[1];
    axios.get('https://tobz-api.herokuapp.com/api/textpro?theme=lionlogo&text1='+ atas +'&text2='+bawah+'&apikey=BotWeA')
    .then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            rev.sendMessage(id, '[😁] Lagi Dibikin Om...', MessageType.text, {quoted : m})
            var buf = Buffer.from(ress, 'base64')
            rev.sendMessage(id, buf, MessageType.image)
        })
    })
}

if (text.includes('#artijodoh')){
  const request = require('request');
    var gh = text.split("#artijodoh ")[1];
    var namalu = gh.split("&")[0];
    var pasangan = gh.split("&")[1];
    axios.get('https://api.vhtear.com/primbonjodoh?nama='+ namalu +'&pasangan='+ pasangan +'&apikey='+vthearapi)
          .then((res) => {
            rev.sendMessage(id, '[(^o^)] MENCARI HASIL...', MessageType.text, {quoted : m})
            let hasil = `${res.data.result.hasil}`;
            rev.sendMessage(id, hasil, MessageType.text, {quoted : m})
        })
}




if (text.includes('#randomwaifu')){
  var teks = text.replace(/#randomwaifu /, '')
    axios.get('https://docs-jojo.herokuapp.com/api/waifu2')
    .then((res) => {
      imageToBase64(res.data.img)
        .then(
          (ress) => {
            rev.sendMessage(id, '[🌠] Sedang Ngirim Gambar Waifu Kamu>//<', MessageType.text, {quoted : m}, {caption : 'Nih Kak...'} )
            var buf = Buffer.from(ress, 'base64')
            rev.sendMessage(id, buf, MessageType.image)
        })
    })
}

if (text.includes('#jokerlogo')){
  var teks = text.replace(/#jokerlogo /, '')
    axios.get('https://tobz-api.herokuapp.com/api/textpro?theme=jokerlogo&text='+teks+'&apikey=BotWeA')
    .then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            rev.sendMessage(id, '[🌠] Sedang Membuat Logo Jomker', MessageType.text, {quoted : m})
            var buf = Buffer.from(ress, 'base64')
            rev.sendMessage(id, buf, MessageType.image)
        })
    })
}

if (text.includes('#yutubdl')){
  var teks = text.replace(/#yutubdl /, '')
    axios.get('https://api.vhtear.com/ytdl?link='+ teks +'&apikey='+vthearapi)
    .then((res) => {
      imageToBase64(res.data.result.imgUrl)
        .then(
          (ress) => {
            rev.sendMessage(id, 'Tunggu Bentar Bro...' , MessageType.text, {quoted : m} )
            var buf = Buffer.from(ress, 'base64')
            rev.sendMessage(id, buf, MessageType.image, {caption : '[🌠] JUDUL : '+ res.data.result.title +'\n[✍️] Size : '+ res.data.result.size +'\n[🤷‍♀️] VIDEO LINK : '+ res.data.result.UrlVideo + '\n\nDonlot Sendiri Yak :v' } )
        })
    })
}


if (text.includes('#text3d')){
  var teks = text.replace(/#text3d /, '')
  var url = "https://docs-jojo.herokuapp.com/api/text3d?text="+teks;
    axios.get(url)
    .then((res) => {
      imageToBase64(url)
        .then(
          (ress) => {
            rev.sendMessage(id, '[🐤] Tunggu Bentar :v', MessageType.text, {quoted : m}, {caption : 'Nih Kak...'} )
            var buf = Buffer.from(ress, 'base64')
            rev.sendMessage(id, buf, MessageType.image, {caption : 'Noh'} )
        })
    })
}

if (text.includes("#spamsms")){
const teks = text.replace(/#spamsms /, "")
axios.get(`https://alfians-api.herokuapp.com/api/spamsms?no=${teks}&jum=5`).then((res) => {
    let hasil = `HASIL :\n${res.data.logs}`;
    rev.sendMessage(id, hasil ,MessageType.text, {quoted : m})
    .catch((msg) =>{
        reject(msg)
    })
})
}

if (text.includes("#wiki")){
const teks = text.replace(/#wiki /, "")
axios.get(`https://api.vhtear.com/wikipedia?query=${teks}&apikey=${vthearapi}`).then((res) => {
    let hasil = `Menurut Wikipedia:\n\n${res.data.result.Info}`;
    rev.sendMessage(id, hasil ,MessageType.text, {quoted : m});
})
}

if (text.includes("#hitung")){
const teks = text.replace(/#hitung /, "")
axios.get(`https://api.vhtear.com//calculator?value=${teks}&apikey=${vthearapi}`).then((res) => {
    let hasil = `INFO : ${res.data.result.info}\n\nHASIL:\n\n${res.data.result.data}`;
    rev.sendMessage(id, hasil ,MessageType.text, {quoted : m});
})
}


if (text.includes("#infogempa")){
const teks = text.replace(/#infogempa /, "")
axios.get(`https://arugaz.herokuapp.com/api/infogempa`).then((res) => {
    let hasil = `BERIKUT INFO GEMPA TERBARU:\n\n${res.data.kedalaman}\n\nKoordinat: ${res.data.koordinat}\n\nLokasi : ${res.data.lokasi}\n\nInfo Map : ${res.data.map}\n\nPotensi : ${res.data.potensi}\n\nWaktu Kejadian : ${res.data.waktu}\n\n\n`;
    rev.sendMessage(id, hasil ,MessageType.text, {quoted : m});
})
}

if (text.includes("#kbbi")){
const teks = text.replace(/#kbbi /, "")
axios.get(`https://api.vhtear.com/kbbi?query=${teks}&apikey=${vthearapi}`).then((res) => {
    let hasil = `Menurut KBBI Arti Dari *${teks}* Adalah :\n\n${res.data.result.hasil}`;
    rev.sendMessage(id, hasil ,MessageType.text, {quoted : m});
})
}

if (text.includes("#cekfilm")){
const teks = text.replace(/#cekfilm /, "")
axios.get(`https://rest.farzain.com/api/film.php?id=${teks}&apikey=uXFtM15mpXFxZmLAJkiBqcUXD`).then((res) => {
    let hasil = `HASIL PENCARIAN FILM *${teks}* Ditemukan#\n\nJumdul Film : ${res.data.Title}\n\nTahun Rilis : ${res.data.Released}\n\nRating Film : ${res.data.Rated}\n\nGenre : ${res.data.Genre}\n\nDurasi : ${res.data.Runtime}\n\nWritter / Sutradara: ${res.data.Writer} / ${res.data.Director}\n\n Sinopsis : ${res.data.Plot}\n\n Negara Pembuat : ${res.data.Country}\n\n Penghasilan : ${res.data.BoxOffice}\n\nWebsite Resmi : ${res.data.Website}` ;
    rev.sendMessage(id, hasil ,MessageType.text, {quoted : m});
})
}

if (text == '#openmenu'){
const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
rev.sendMessage(id, menu.menu(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagramlu, whatsapplu, kapanbotaktif, grupch1, grupch2), MessageType.text, {quoted : m} );
}

else if (text == '#quran'){
axios.get('https://api.banghasan.com/quran/format/json/acak').then((res) => {
    const sr = /{(.*?)}/gi;
    const hs = res.data.acak.id.ayat;
    const ket = `${hs}`.replace(sr, '');
    let hasil = `[${ket}]   ${res.data.acak.ar.teks}\n\n${res.data.acak.id.teks}(QS.${res.data.surat.nama}, Ayat ${ket})`;
    rev.sendMessage(id, hasil ,MessageType.text, {quoted : m});
})
}
else if (text == 'assalamualaikum'){
rev.sendMessage(id, 'Waalaikumsalam, ada yang bisa saya bantu? kalo bingung ketik #openmenu ya tod:v..' ,MessageType.text, {quoted : m});
}
else if (text == 'salam'){
rev.sendMessage(id, 'Waalaikumsalam, ada yang bisa saya bantu? kalo bingung ketik #openmenu ya tod:v..' ,MessageType.text, {quoted : m});
}
else if (text == 'asalamualaikum'){
rev.sendMessage(id, 'Waalaikumsalam, ada yang bisa saya bantu? kalo bingung ketik #openmenu ya tod:v..' ,MessageType.text, {quoted : m});
}
else if (text == '#kickme'){
rev.sendMessage(id, '*Berhasil!* Kamu Telah Dihapus Dari Daftar Penerima Pesan Siaran! ' ,MessageType.text, {quoted : m});
}
else if (text == 'Assalamualaikum'){
rev.sendMessage(id, 'Waalaikumsalam, ada yang bisa saya bantu? kalo bingung ketik #openmenu ya tod:v..' ,MessageType.text, {quoted : m});
}
else if (text == 'p'){
rev.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #openmenu ya tod:v..' ,MessageType.text, {quoted : m});
}
else if (text == 'P'){
rev.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #openmenu ya tod:v..' ,MessageType.text, {quoted : m});
}
else if (text == '#menu'){
rev.sendMessage(id, 'Command Bot Sekarang Menjadi #openmenu!!' ,MessageType.text, {quoted : m});
} 
else if (text == '#help'){
rev.sendMessage(id, '#openmenu Amsu!1!!1!' ,MessageType.text, {quoted : m});
}
else if (text == '!menu'){
rev.sendMessage(id, 'Command Bot Sekarang Menjadi #openmenu!!' ,MessageType.text, {quoted : m});
} 
else if (text == '!help'){
rev.sendMessage(id, 'Command Bot Sekarang Menjadi #openmenu!!' ,MessageType.text, {quoted : m});
} 
else if (text == '#zodiak'){
rev.sendMessage(id, 'Tolol Ajg Ngetik Cuman #zodiak Doang, Zodiak Lu Apaan Ngntd? ' ,MessageType.text, {quoted : m} );
}
else if (text == '#bapack'){
rev.sendMessage(id, 'Iya Yang Dijadiin Tulisan Bapack Apaan Asu.' ,MessageType.text, {quoted : m} );
}
else if (text == '#artijodoh'){
rev.sendMessage(id, 'Lah? Namanya Lu Sama Doi Mana?? Stres Ajg:v, Oh Iya Pasti Lu Gada Doi Aowkwowk' ,MessageType.text, {quoted : m} );
}
else if (text == '#spamsms'){
rev.sendMessage(id, 'Stres Ajg Nomor Nya Ga Ada, Baca Penggunaan Tomlol' ,MessageType.text, {quoted : m} );
}
else if (text == '#spamcall'){
rev.sendMessage(id, 'Stress Ajg Nomor Nya Ga Ada, Baca Penggunaan Asu' ,MessageType.text, {quoted : m} );
}
else if (text == '#ceknope'){
rev.sendMessage(id, 'Stres Lo Konsol Baca Menu Dulu Ajg' ,MessageType.text, {quoted : m});
}
else if (text == '#menu'){
rev.sendMessage(id, 'Command Bot Sekarang Menjadi #openmenu!!' ,MessageType.text, {quoted : m});
}
else if (text == '#pornhub'){
rev.sendMessage(id, 'Woo Kontol Kang Bokep, Fitur Ini Buat Logo Asu, Lihat Penggunaan Kalo Ga paham Ajg' ,MessageType.text, {quoted : m} );
}
else if (text == '#makecalender'){
rev.sendMessage(id, 'Lah? Link Gambar Mana Ajg' ,MessageType.text, {quoted : m} );
}
else if (text == '#openbo'){
rev.sendMessage(id, '#openmenu Tolol Gblk Ajg Emak Lo Sna Suruh Open BO' ,MessageType.text, {quoted : m} );
}
else if (text == '#artijodoh'){
rev.sendMessage(id, 'Lah? Nama Nya Mana' ,MessageType.text, {quoted : m} );
}
else if (text == '#randomhentong'){
rev.sendMessage(id, 'Aowkwow Ngentot Ada Wibu Sangean, Lu Bukan User VIP Tod Jadi Jangan Sok Keras Yekan :v, Mau Jadi VIP? Chat Owner ( #creator ) ' ,MessageType.text, {quoted : m} );
}
else if (text == '#nsfwnekonime'){
rev.sendMessage(id, 'Mohon Maaf Fitur Ini Tidak Lagi Dapat Lagi Di Akses Oleh User Gratis, tingkatkan akun anda ke Premium! Chat Owner(#creator) ' ,MessageType.text, {quoted : m} );
}
else if (text == '#bikinquote'){
rev.sendMessage(id, 'Baca Penggunaan Lah! Text Nya Mana??? ' ,MessageType.text, {quoted : m} );
}
else if (text == '#nsfwtrap'){
rev.sendMessage(id, 'Fitur Ini Hanya Bisa Gunakan Oleh User Premium!' ,MessageType.text, {quoted : m} );
}
else if (text == '#nulis'){
let hasil = fs.readFileSync('mp3/' + 'nulis' + '.mp3')
 rev.sendMessage(id, hasil, MessageType.audio, { quoted: m, ptt : true})
 rev.sendMessage(id, 'Baca Penggunaan Di Menu Napa Bgsd, Lu Mau Nulis Apa Palkon? BUTAMAP Ajg' , MessageType.text, {quoted : m}, { quoted: m })
}
else if (text == '#sticker'){
let hasil = fs.readFileSync('mp3/' + 'sticker' + '.mp3')
 rev.sendMessage(id, hasil, MessageType.audio, { quoted: m, ptt : true})
 rev.sendMessage(id, 'Tolol Ajg Buta Mata Nya, Kirim Gambar Caption #sticker asu Bukan #stiker' , MessageType.text, {quoted : m}, { quoted: m })
} 
else if (text == 'Kontol'){
let hasil = fs.readFileSync('mp3/' + 'kasar' + '.mp3')
 rev.sendMessage(id, hasil, MessageType.audio, { quoted: m } )
}
else if (text == 'Tolol'){
let hasil = fs.readFileSync('mp3/' + 'kasar' + '.mp3')
 rev.sendMessage(id, hasil, MessageType.audio, { quoted: m }, {ptt : true} )
}
else if (text == '#ingfo'){
const me = rev.user
const blocked = [] 
let ngontol = `│➸ NAMA : ${me.name}\n│➸ PHONE NUMBER : @${me.jid.split('@')[0]} \n│➸ Tanggal : *${tampilTanggal}* \n│➸ YOUTUBE : REVOER GMG\n│➸ IG : @revoer_id\n│➸ 𝗧𝗼𝘁𝗮𝗹 𝗕𝗹𝗼𝗰𝗸 𝗖𝗼𝗻𝘁𝗮𝗰𝘁 : ${blocked.length}\n│➸ Ingfo : ${me.Info}`
let hasil = fs.readFileSync('mp3/' + 'glitchtext' + '.png')
 rev.sendMessage(id, hasil, MessageType.image , {caption : ngontol} )
}
else if (text == 'Anjing'){
let hasil = fs.readFileSync('mp3/' + 'kasar' + '.mp3')
 rev.sendMessage(id, hasil, MessageType.audio, { quoted: m } )
}
else if (text == '#simi'){
 rev.sendMessage(id, 'Hadeh Punya Mata Gak Ajg? Baca Menu Ampe Habis Jangan Ngikutin Tulisan Di Mneu Mulu! Kan Ada Petunjuk Itu Dibagian Atas, Betina Pada Tolol Semua Ngentot' , MessageType.text, {quoted : m}, { quoted: m } )
} 
else if (text == 'bot'){
let hasil = fs.readFileSync('mp3/' + 'manggil' + '.wav')
 rev.sendMessage(id, hasil, MessageType.audio, { ptt : true } )
}
else if (text == 'Bot'){
//let hasil = fs.readFileSync('mp3/' + 'manggil' + '.wav')
 rev.sendMessage(id, 'mp3/' + 'manggil' + '.wav' ,MessageType.audio, { ptt : true}) 
}
else if (text == '#help'){
rev.sendMessage(id, 'Command Bot Sekarang Menjadi #openmenu!.' ,MessageType.text, {quoted : m});
}
else if (text == 'Halo'){
rev.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #openmenu ya tod:v..' ,MessageType.text, {quoted : m});
}
else if (text == 'Hai'){
rev.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #openmenu ya tod:v..' ,MessageType.text, {quoted : m});
}
else if (text == 'woi'){
rev.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #openmenu ya tod:v..' ,MessageType.text, {quoted : m});
}
else if (text == 'Woy'){
rev.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #openmenu ya tod:v..' ,MessageType.text, {quoted : m});
}
else if (text == 'hi'){
rev.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #openmenu ya tod:v..' ,MessageType.text, {quoted : m});
}
else if (text == 'gan'){
rev.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #openmenu ya tod:v..' ,MessageType.text, {quoted : m});
}
else if (text == 'sis'){
rev.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #openmenu ya tod:v..' ,MessageType.text, {quoted : m});
}
else if (text == 'bro'){
rev.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #openmenu ya tod:v..' ,MessageType.text, {quoted : m});
}
else if (text == 'Min'){
rev.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #openmenu ya tod:v..' ,MessageType.text, {quoted : m});
}
else if (text == 'Sayang'){
rev.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #openmenu ya tod:v..' ,MessageType.text, {quoted : m});
}
else if (text == 'Lopyu❤️'){
rev.sendMessage(id, 'love you too' ,MessageType.text, {quoted : m});
}
else if (text == 'mas'){
rev.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #openmenu ya tod:v..' ,MessageType.text, {quoted : m});
}
else if (text == '#maucomli'){
rev.sendMessage(id, 'Huehue :v Otak Sange, Lu Bukan User VIP Tod, Jadi Sagne Nya Tahan Dulu :v. Mau Jadi VIP? Chat Owner ( #creator) ' ,MessageType.text, {quoted : m} );
}
else if (text == 'mba'){
rev.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #openmenu ya tod:v..' ,MessageType.text, {quoted : m});
}
else if (text == '#puas'){
rev.sendMessage(id, 'Terima Kasih,Kalau Anda Suka Share Bot Ini. Iklan Bot Dimulai 1 Menit' ,MessageType.text, {quoted : m});
}
else if (text == '#tidakpuas'){
rev.sendMessage(id, 'Maaf, Kami Akan Tingkatkan Lagi.\NSupaya Bot Berkembang Dengan Baik, Anda Bisa Ikut BERDONASI Dengan Ketik #donasi..' ,MessageType.text, {quoted : m});
}
else if (text == 'Ngab'){
rev.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #openmenu ya tod:v..' ,MessageType.text, {quoted : m});
}
else if (text == 'Oi'){
rev.sendMessage(id, 'Apaan? Ini Nomor Bot Masukan #openmenu Untuk Mengetahui List Menu' ,MessageType.text, {quoted : m});
}
else if (text == 'cuy'){
rev.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #openmenu ya tod:v..' ,MessageType.text, {quoted : m});
}
else if (text == 'euy'){
rev.sendMessage(id, 'Ya?, ada yang bisa saya bantu? kalo bingung ketik #openmenu ya tod:v..' ,MessageType.text, {quoted : m});
}
else if (text == 'makasi'){
rev.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text, {quoted : m});
}
else if (text == 'Makasi'){
rev.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text, {quoted : m});
}
else if (text == 'makasih'){
rev.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text, {quoted : m});
}
else if (text == 'Makasih'){
rev.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text, {quoted : m});
}
else if (text == 'thank'){
rev.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text, {quoted : m});
}
else if (text == 'Thank'){
rev.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text, {quoted : m});
}
else if (text == 'thanks'){
rev.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text, {quoted : m});
}
else if (text == '#stiker'){
rev.sendMessage(id, 'bukan #stiker,tetapi #sticker' ,MessageType.text, {quoted : m} );
}
else if (text == 'Thanks'){
rev.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text, {quoted : m});
}
else if (text == '#donate'){
const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
rev.sendMessage(id, donate.donate(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagramlu, whatsapplu, kapanbotaktif, grupch1, grupch2) ,MessageType.text, {quoted : m});
}
else if (text == '#open menu'){
const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
rev.sendMessage(id, baca.baca(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagramlu, whatsapplu, kapanbotaktif, grupch1, grupch2) ,MessageType.text, {quoted : m});
}
else if (text == '#DONATE'){
const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
rev.sendMessage(id, donate.donate(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagramlu, whatsapplu, kapanbotaktif, grupch1, grupch2) ,MessageType.text, {quoted : m});
}
else if (text == '#gimana'){
  const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
switch(hari) {
 case 0: hari = "Minggu"; break;
 case 1: hari = "Senin"; break;
 case 2: hari = "Selasa"; break;
 case 3: hari = "Rabu"; break;
 case 4: hari = "Kamis"; break;
 case 5: hari = "Jum'at"; break;
 case 6: hari = "Sabtu"; break;
}
switch(bulan) {
 case 0: bulan = "Januari"; break;
 case 1: bulan = "Februari"; break;
 case 2: bulan = "Maret"; break;
 case 3: bulan = "April"; break;
 case 4: bulan = "Mei"; break;
 case 5: bulan = "Juni"; break;
 case 6: bulan = "Juli"; break;
 case 7: bulan = "Agustus"; break;
 case 8: bulan = "September"; break;
 case 9: bulan = "Oktober"; break;
 case 10: bulan = "November"; break;
 case 11: bulan = "Desember"; break;
}
var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
rev.sendMessage(id, cara.cara(id, BotName, corohelp, tampilTanggal, tampilWaktu, instagramlu, whatsapplu, kapanbotaktif, grupch1, grupch2) ,MessageType.text, {quoted : m});
}
else if (text == '#gacha'){
rev.sendMessage(id, 'kirim #gacha cewek/cowok\n\nContoh: #gacha cewek' ,MessageType.text, {quoted : m});
}
   if (messageType == 'imageMessage')
   {
      let caption = imageMessage.caption.toLocaleLowerCase()
      const buffer = await rev.downloadMediaMessage(m) // to decrypt & use as a buffer
      if (caption == '#sticker' )
      {
         const stiker = await rev.downloadAndSaveMediaMessage(m) // to decrypt & save to file

         const
         {
            exec
         } = require("child_process");
         exec('cwebp -q 50 ' + stiker + ' -o temp/' + jam + '.webp', (error, stdout, stderr) =>
         {
            let stik = fs.readFileSync('temp/' + jam + '.webp')
            rev.sendMessage(id, stik, MessageType.sticker, {quoted : m} )
         });
      }
   }

     
        if (messageType == 'imageMessage')
   {
      let caption = imageMessage.caption.toLocaleLowerCase()
      const buffer = await rev.downloadMediaMessage(m) // to decrypt & use as a buffer
      if (caption == '#stiker' )
      {
         const stiker = await rev.downloadAndSaveMediaMessage(m) // to decrypt & save to file

         const
         {
            exec
         } = require("child_process");
         exec('cwebp -q 50 ' + stiker + ' -o temp/' + jam + '.webp', (error, stdout, stderr) =>
         {
            let stik = fs.readFileSync('temp/' + jam + '.webp')
            rev.sendMessage(id, stik, MessageType.sticker, {quoted : m} )
         });
      }
   }
   
   if (messageType === MessageType.text, {quoted : m})
   {
      let is = m.message.conversation.toLocaleLowerCase()

      if (is == '#pantun')
      {

         fetch('https://raw.githubusercontent.com/pajaar/grabbed-results/master/pajaar-2020-pantun-pakboy.txt')
            .then(res => res.text())
            .then(body =>
            {
               let tod = body.split("\n");
               let pjr = tod[Math.floor(Math.random() * tod.length)];
               let pantun = pjr.replace(/pjrx-line/g, "\n");
               rev.sendMessage(id, pantun, MessageType.text, {quoted : m})
            });
      }

   }
  
     if (messageType === MessageType.text, {quoted : m})
   {
      let is = m.message.conversation.toLocaleLowerCase()

      if (is == '#cekbapak')
      {

         fetch('https://raw.githubusercontent.com/WhatTheSemvak/bot-wasapp/main/randombapak.txt')
            .then(res => res.text())
            .then(body =>
            {
               let tod = body.split("\n");
               let pjr = tod[Math.floor(Math.random() * tod.length)];
               let cekbapak = pjr.replace(/pjrx-line/g, "\n");
               rev.sendMessage(id, cekbapak, MessageType.text, {quoted : m})
            });
      }

   }
   
  /*if (text.includes("#yt"))
   {
      const url = text.replace(/#yt/, "");
      const exec = require('child_process').exec;

      var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);

      const ytdl = require("ytdl-core")
      if (videoid #= null)
      {
         console.log("video id = ", videoid[1]);
      }
      else
      {
         rev.sendMessage(id, "gavalid", MessageType.text, {quoted : m})
      }
      ytdl.getInfo(videoid[1]).then(info =>
      {
         if (info.length_seconds > 1000)
         {
            rev.sendMessage(id, " videonya kepanjangan", MessageType.text, {quoted : m})
         }
         else
         {

            console.log(info.length_seconds)

            function os_func()
            {
               this.execCommand = function (cmd)
               {
                  return new Promise((resolve, reject) =>
                  {
                     exec(cmd, (error, stdout, stderr) =>
                     {
                        if (error)
                        {
                           reject(error);
                           return;
                        }
                        resolve(stdout)
                     });
                  })
               }
            }
            var os = new os_func();

            os.execCommand('ytdl ' + url + ' -q highest -o mp4/' + videoid[1] + '.mp4').then(res =>
            {
		const buffer = fs.readFileSync("mp4/"+ videoid[1] +".mp4")
               rev.sendMessage(id, buffer, MessageType.video)
            }).catch(err =>
            {
               console.log("os >>>", err);
            })

         }
      });

   }*/


   if (text.includes("#nulis"))
   {

      const
      {
         spawn
      } = require("child_process");
      console.log("writing...")
      const teks = text.replace(/#nulis/, "")
      const split = teks.replace(/(\S+\s*){1,10}/g, "$&\n")
      const fixedHeight = split.split("\n").slice(0, 25).join("\\n")
      console.log(split)
      spawn("convert", [
            "./assets/paper.jpg",
            "-font",
            "Indie-Flower",
            "-size",
            "700x960",
            "-pointsize",
            "16",
            "-interline-spacing",
            "3",
            "-annotate",
            "+170+222",
            fixedHeight,
            "./assets/result.jpg"
         ])
         .on("error", () => console.log("error"))
         .on("exit", () =>
         {
            const buffer = fs.readFileSync("assets/result.jpg") // can send mp3, mp4, & ogg -- but for mp3 files the mimetype must be set to ogg

            rev.sendMessage(id, buffer, MessageType.image)
            console.log("done")
         })
   }



   if (text.includes("#gacha cewek"))
   {
    var items = ["ullzang girl", "cewe cantik", "hijab cantik", "korean girl", "cewe sexy"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var cewek =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(cewek) // Path to the image
        .then(
            (response) => {
	var buf = Buffer.from(response, 'base64'); // Ta-da	
              rev.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
    }



    
   if (text.includes("#gacha cowok"))
   {
    var items = ["cowo ganteng", "cogan", "korean boy", "chinese boy", "japan boy"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var cewek =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(cewek) // Path to the image
        .then(
            (response) => {
  var buf = Buffer.from(response, 'base64'); // Ta-da 
              rev.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
    }

if (text.includes("#randomanime"))
   {
    var items = ["anime sange", "anime cantik", "zero two", "sexy sagiri", "sexy waifu"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var cewek =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(cewek) // Path to the image
        .then(
            (response) => {
	var buf = Buffer.from(response, 'base64'); // Ta-da	
              rev.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
    }
    
    
    if (text.includes("#randommoba"))
   {
    var items = ["sexy hero mobile legends", "mobile legends nude heroes", "sex mobile legends", "sexy hero mobile legends", "mobile legends sexy"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var cewek =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(cewek) // Path to the image
        .then(
            (response) => {
	var buf = Buffer.from(response, 'base64'); // Ta-da	
              rev.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
    }

/*if (text.includes("#scdl")){
const fs = require("fs");
const scdl = require("./lib/scdl");

scdl.setClientID("iZIs9mchVcX5lhVRyQGGAYlNPVldzAoX");

scdl("https://m.soundcloud.com/abdul-muttaqin-701361735/lucid-dreams-gustixa-ft-vict-molina")
    .pipe(fs.createWriteStream("mp3song.mp3"));
}*/



/* else if (text.includes("#tts")) {
  var teks = text.split("#tts ")[1];
  var path = require('path');
  var url = ('http://api.farzain.com/tts.php?id=${text}&apikey=uXFtM15mpXFxZmLAJkiBqcUXD');
  var text1 = teks.slice(6);
  text1 = suara;
  var suara = text.replace(/#tts/g, text1);
  var filepath = 'mp3bacot.wav';
  
  
/*
 * save audio file
 */

/*tts.save(filepath, suara, function() {
  console.log(`${filepath} MP3 SAVED#`)
});
await new Promise(resolve => setTimeout(resolve, 500));

	if(suara.length > 200){ // check longness of text, because otherways google translate will give me a empty file
  rev.sendMessage(id, 'Text kepanjangan bro!', MessageType.text, {quoted : m} )
}else{

const buffer = fs.readFileSync(filepath)
	rev.sendMessage(id , buffer , MessageType.audio);

};


}*/






   // end of file


})
