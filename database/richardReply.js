class richardReply {
        static replyFetch() {       
             const cevaplar = global.cevaplar = {
    noyt:          "Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin.",
    üye:           "Bir kullanıcı etiketleyin veya ID giriniz.",
    süre:          "Geçerli bir süre belirtiniz.",
    sebep:         "Geçerli bir sebep girmelisiniz.",
    yetkiust:      "İşlem yapmaya çalıştığın üye senle aynı yetkide veya senden üst yetkide.",
    dokunulmaz:    "Botun yetkisi bu işlemi gerçekleştirmeye yetmiyor.",
    kayıtlı:       "Belirttiğin üye sunucuda zaten kayıtlı olarak bulunuyor.",
    kayıtsız:      "Belirttiğin üye sunucuda zaten kayıtsız olarak bulunuyor",
    kendi:         "Kendi üzerinde işlem gerçekleştiremezsin.",
    bulunamadi:    "Bir kullanıcı __ID__ giriniz.",
    üyeyok:        "Bir kullanıcı etiketleyin veya ID giriniz.",
    yenihesap:     "Belirttiğin üyenin hesabı yeni açıldığı için kayıt işlemi gerçekleştirilemiyor.",
    cezaliuye:     "Belirttiğin kullanıcı sunucuda `Cezalı` olarak bulunuyor.",
    yetersizyaş:   `Belirtilen üyenin yaşı yaş sınırının (${ayarlar.minYaş}) altında olduğu kayıt işlemi gerçekleştirilemiyor.`,
    argümandoldur: "Tüm argümanları doldurunuz.",
    taglıalım:     `Sunucumuz taglı alımda olduğu için belirtilen üyenin adında \`${sistem.tag}\` tagı bulunmadığı için kayıt işlemi gerçekleştirilemiyor.`,
    isimapi:       `Girdiğiniz isim 32 karakterden fazla olduğundan dolayı işlem gerçekleştirilemiyor.`,
    cezavar:       `Belirttiğin kullanıcının aktif bir cezalandırması bulunuyor.`,
    cezayok:       "Belirttiğin kullanıcının aktif cezalandırması bulunamadı.",
    yetkilinoban:  "Belirttiğin kullanıcı yetkili olduğu için yasaklayamazsın.",
    yasaklamayok:  `Sunucu da geçerli bir yasaklama bulunamadı.`,
    hatalikullanim: `Komutu doğru kullanmalısın.`
        }
        }
    }
module.exports = richardReply;
