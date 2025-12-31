# 💌 Dinamik Dijital Mektup Oluşturucu

Bu proje; kullanıcıların kişiselleştirilmiş, animasyonlu dijital mektuplar oluşturmasına ve bu mektupları herhangi bir veritabanı (DB) veya sunucu tarafı (Backend) işlemleri gerektirmeden, sadece bir URL aracılığıyla paylaşmasına olanak tanıyan **serverless** bir web uygulamasıdır.

<img width="100%" alt="Proje Kapak" src="https://github.com/user-attachments/assets/8bea30c2-745d-4c84-8170-5819aace4b1b" />

## 🚀 Öne Çıkan Özellikler

* **Veritabanı Gerektirmeyen Veri İletimi:** Mesaj içeriği, gönderen ismi ve hitap şekli Base64 algoritması ile encode edilerek URL parametrelerine gömülür.
* **Finite State Machine (FSM) Mantığı:**
    * **Durum 0:** Kapalı zarf (Bekleme).
    * **Durum 1 (Preview):** Zarf kapağı açık, kağıt kısmen yükselmiş (İnceleme).
    * **Durum 2 (Full Open):** Mektup tam boyut, içerik okunabilir (Okuma).
* **İnteraktif Zarf Deneyimi:** Kalp simgesi üzerinde "pulsing" (nabız) efekti ile kullanıcı yönlendirmesi.
* **Modern CSS Animasyonları:** `clip-path`, `rotateX` ve `transition` ile fiziksel bir mektup açma hissi.

## 🛠️ Teknik Altyapı

| Teknoloji | Kullanım Amacı |
| :--- | :--- |
| **HTML5** | Semantik yapı ve kullanıcı veri giriş formları. |
| **CSS3** | Responsive tasarım ve interaktif animasyon yönetimi. |
| **JavaScript (ES6)** | Durum yönetimi (State Management) ve Veri kodlama (Encoding). |

## 📖 Çalışma Mantığı ve Veri Akışı

Proje, veriyi taşımak için **Backend** yerine **Client-Side URL Encoding** yöntemini kullanır:

### 1. Veri Girişi ve Link Oluşturma
Kullanıcı formu doldurur ve sistem tarafından anlık olarak dinamik bir URL üretilir.

| Form Doldurma Ekranı | Link Oluşturma Aşaması |
| :---: | :---: |
| <img width="2856" height="1629" alt="image" src="https://github.com/user-attachments/assets/90ed9dcd-8c3a-4430-9106-56c8f40db451" /> | <img width="2856" height="1625" alt="image" src="https://github.com/user-attachments/assets/af2780c5-9a36-4d05-99a3-b10b7e6d0e9b" />

### 2. Encoding ve URL Yapısı
Veriler JSON formatına getirilir ve `btoa(unescape(encodeURIComponent(...)))` fonksiyonu ile UTF-8 destekli Base64 koduna dönüştürülür. Bu sayede Türkçe karakter sorunu yaşanmadan veri URL sonuna `?m=` parametresi olarak eklenir.

### 3. Decoding ve Render
Alıcı linki açtığında tarayıcı `URLSearchParams` ile bu kodu yakalar ve DOM manipülasyonu ile içeriği asenkron olarak basar.

| Gönderici (Önizleme) | Alıcı (Görünüm)1 | Alıcı (Görünüm)2 |
| :---: | :---: | :---: |
| <img src="https://github.com/user-attachments/assets/b84b36e1-4792-4e81-8441-24423a6f2b8e" width="300" /> | <img src="https://github.com/user-attachments/assets/37a5f37f-6b55-4113-aaa3-588c3b903700" width="300" /> | <img src="https://github.com/user-attachments/assets/372ec64d-d7fa-4808-bbd0-45dce0218578" width="300" /> |

## 👨‍💻 Mühendislik Notları

* **XSS Güvenliği:** Kullanıcıdan gelen dinamik içerikler DOM'a basılırken potansiyel script enjeksiyonlarına karşı güvenli metodlarla işlenmektedir.
* **Performans:** Proje statik dosyalardan oluştuğu için CDN üzerinden milisaniyeler içerisinde yüklenir ve minimum kaynak tüketir.
* **UX Tasarımı:** Zarfın açılıp kapanma özelliği (`toggle`) ve görsel ipuçları kullanıcı deneyimini maksimize etmek için optimize edilmiştir.

---
**Geliştirici:** [Yunus Emre Akbulut]  
*Bu proje, sevginin mühendislikle birleştiği dijital bir hatıra çalışmasıdır.*
