const languageData = {
  COOMAND_ERROR: `Bu komut yürütülürken bir hata oluştu.`,
  COOLDOWN_WARNİNG: `lütfen \`{command.name}\` komutunu yeniden kullanmadan önce **{timeLeft}** saniye bekleyin.`,
  JOİNVOİCECHANNEL_ERROR: "Önce bir ses kanalına katılmanız gerekiyor!",

  play_args: "Kullanım: / play <YouTube URL'si | Video Adı>",
  playlist_args:
    "Kullanım: / playlist <YouTube Oynatma Listesi URL'si | Oynatma Listesi Adı>",

  LANGUAGE_UPDATED: "Bot dili güncellendi...",
  MISSING_LANGUAGE:
    "Geçerli bir dil belirtmelisiniz! (ingilizce ya da Fransızca)",
  LANGUAGE_NO_EXIST: "Bu dil mevcut değil!",

  perrmissions: {
    connect:
      "Ses kanalına bağlanamıyorum uygun izinlere sahip olduğumdan emin olun.",
    speak:
      "Bu ses kanalında konuşmak için uygun izinlere sahip olduğumdan emin olun!",
  },
};

const translate = (key, ...args) => {
  const translation = languageData[key];
  if (typeof translation === "function") return translation(...args);
  else return translation;
};

module.exports = translate;
