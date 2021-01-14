exports.baca = (id, BotName, corohelp, tampilTanggal, tampilWaktu, instagramlu, whatsapplu, kapanbotaktif, grupch1, grupch2) => {
	return `🔰 -----[ *PANDUAN PENGGUNAAN ${BotName}* ]----- 🔰
  
Hi, ${id.split("@s.whatsapp.net")[0]} 👋
BACA PESAN DARI ${BotName} DIBAWAH! 

⚠️ *${tampilTanggal}*
⚠️ *${tampilWaktu}*

SEBELUM MEMBACA FITUR DIBAWAH ALANGKAH BAIKNYA BACA DULU MENU 
SAMPAI HABIS! BACA TATA CARA PENGGUNAAN! JANGAN MALAS MEMBACA! 
AGAR BOT TIDAK ERROR, IKUTI PETUNJUK YANG ADA DI MENU!, CARA MEMBUKA
PETUNJUK SEMUA ADA DI MENU! PLIS JANGAN MALES BACA NGENTOD!


♻️ JANGAN  LUPA DONASI AGAR BISA MENAMBAH BANYAK  FITUR BARU
⚠️ DONASI DONG JAN BISA NYA CUMA MAKE AJG-_
♻️ MAU DONASI? SILAHKAN KETIK #donate

📺 *Iklan* :

✅ Follow akun instagram admin ${instagramlu}

⚠️ INFORMASI COVID-19 TERBARU!

⚠️ POSITIF: *${corohelp.confirmed.value}*
⚠️ SEMBUH: *${corohelp.recovered.value}*
⚠️ MENINGGAL: *${corohelp.deaths.value}*
⚠️ UPDATE: *${corohelp.lastUpdate}*

♻️ _TETAP JAGA KESEHATAN DAN SELALU PAKAI MASKER!_

♻️ CONTACT ADMIN *${BotName} ?*
☎️ WA : *${whatsapplu}*
  
⚠️ Gunakan dengan bijak ‼️
❗Dilarang Untuk SPAM! Barang Siapa Spam Akan Di BlackList / Block!
⚠️ Bot ini berjalan ${kapanbotaktif} ‼️

  
🔰 -----[ *POWERED BY REVOER ID* ]----- 🔰`
}

