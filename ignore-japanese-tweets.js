// ignore-japanese-tweets.js
(function () {
    'use strict';

    console.log("Betik başlatıldı...");

    // Tweetin menüsünü bulup "ilgimi çekmiyor" seçeneğine tıklama
    function clickIgnoreOption(tweet) {
        if (!tweet) {
            console.log("Tweet öğesi bulunamadı.");
            return;
        }

        // Menü butonunu tespit et
        const menuButton = tweet.querySelector('[role="button"][aria-label][data-testid="caret"]') ||
                           tweet.querySelector('[role="button"][aria-label="Daha fazla"]') ||
                           tweet.querySelector('[aria-label*="Daha fazla"]');

        if (!menuButton) {
            console.log("Menü butonu bulunamadı.");
            return;
        }

        console.log("Menü butonuna tıklanıyor...");
        menuButton.click(); // Menü butonuna tıklanıyor

        // Menüdeki "ilgimi çekmiyor" seçeneğine tıklamak için
        setTimeout(() => {
            // Menüde "ilgimi çekmiyor" metnini içeren öğe bulunuyor
            const ignoreButton = Array.from(document.querySelectorAll('[role="menuitem"]')).find(item => 
                item.innerText.includes("ilgimi çekmiyor") || item.innerText.includes("Not interested")
            );

            if (ignoreButton) {
                console.log("ilgimi çekmiyor seçeneği bulundu, tıklanıyor...");
                ignoreButton.click(); // "ilgimi çekmiyor" seçeneğine tıklanıyor
            } else {
                console.log("ilgimi çekmiyor seçeneği bulunamadı.");
            }
        }, 1000); // Menü yüklenmesi için 1 saniye bekle
    }

    // İmlecin üzerindeki öğeyi kontrol et
    function handleHover(event) {
        const tweet = event.target.closest('article'); // İlgili tweet öğesini bul
        if (!tweet) {
            console.log("Tweet öğesi üzerinde değil.");
            return;
        }

        const langAttr = tweet.querySelector('[lang="ja"]'); // Japonca içerik kontrolü
        if (langAttr) {
            console.log("Japonca tweet tespit edildi, 'ilgimi çekmiyor' seçeneğine tıklanıyor...");
            clickIgnoreOption(tweet);
        } else {
            console.log("Japonca tweet bulunamadı.");
        }
    }

    // Sayfa genelinde fare hareketlerini dinle
    document.addEventListener('mousemove', handleHover);
})();
