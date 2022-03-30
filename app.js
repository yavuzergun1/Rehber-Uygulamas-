const ad= document.getElementById('ad');
const soyad= document.getElementById('soyad');
const mail= document.getElementById('mail');
const form= document.getElementById('form-rehber')
const kisiListesi= document.querySelector('.kisi-listesi')

// event listenerların tanımlanması
form.addEventListener('submit', kaydet);
kisiListesi.addEventListener('click', kaydedilenKisiIslemleri);

// girilen kişileri dizi olarak kaydetme
let tumKisilerDizisi=[];

let secilenSatir= undefined;

/* sil veya güncelle butonuna tıklayınca yapılacaklar */
function kaydedilenKisiIslemleri(event){
    if (event.target.classList.contains('btn--delete')){
        console.log('silme butonu');
        const silinecekTr= event.target.parentElement.parentElement;
        const silinecekMail=event.target.parentElement.previousElementSibling.textContent;
        rehberdenSil(silinecekTr,silinecekMail);
        
    } if (event.target.classList.contains('btn--edit')) {
        console.log('güncelleme butonu');
        document.querySelector('.kaydetGuncelle').value= 'Güncelle';
        const secilenTr= event.target.parentElement.parentElement; /* aşağıda kaydedilen verilerin olduğu satır */
        const guncellenecekMail= secilenTr.cells[2].textContent;/* Normalde silinecekMail'de olduğu şekilde de maile ulaşabilirdik. bu da farklı bir yöntem. tr nin altında bulunan hücrelerden 3. sırada olanı seçtik. */


        // Şimdi güncelleye tıklayınca altta kayıtlı olan verileri yukarıdaki boş satırlara aktarıyrouz
        ad.value=secilenTr.cells[0].textContent;    
        soyad.value=secilenTr.cells[1].textContent;
        mail.value=secilenTr.cells[2].textContent;

        secilenSatir=secilenTr; /* Başta bu değer undefined tanımlandı. Yukarıdaki işlem gerçekleştikten sonra secilenSatir'a secilenTr değeri eklendi. Böylece verileriKontrolEt() fonksiyonunda if(secilenSatır) undefined olmadığı için güncelleme işlemine geçiş yaptı */
        
        
    }
}

// sil butonuna tıklanınca yapılacaklar
function rehberdenSil(silinecekTr,silinecekMail){
silinecekTr.remove();
console.log(silinecekTr, silinecekMail);

// maile göre silme işlemi
// tumKisilerDizisi.forEach((kisi, index)=>{
//     if (kisi.mail===silinecekMail){
//     tumKisilerDizisi.splice(index,1)}
// })
// console.log('silme yapıldı son durum:');
// console.log(tumKisilerDizisi);

bilgiOlustur('Kişi bilgileri silindi', false);


// Maile Göre silme işlemi 2. Yöntem
const silinmeyenKisiler= tumKisilerDizisi.filter((kisi, index)=> (kisi.mail!==silinecekMail));
tumKisilerDizisi.length=0;

tumKisilerDizisi.push(...silinmeyenKisiler);
 /* ÖNEMLİ AÇIKLAMA: tumKisilerDizisi.push(silinmeyenKisiler) yazarsak tumkisiler içine silinmeyen kisiler dizisini atar. Ama (...silinmeyenKisiler) şeklinde yazarsak silinmeyen kişiler dizisi içindeki elemanları tek tek atar. */
 /* ÖNEMLİ AÇIKLAMA: tumKisilerDizisi isimli diziyi yukarıda const olarak tanımlamasaydık direk olarak " tumKisilerDizisi=silinmeyenKisiler; " şeklinde yazabilirdik. */
console.log(tumKisilerDizisi);
}

function kaydet(e){
    e.preventDefault()
    
    const eklenecekKisi= {
        ad: ad.value,
        soyad: soyad.value,
        mail: mail.value
    }

    const sonucu= verileriKontrolEt(eklenecekKisi);
    if(sonucu.durum){
        if(secilenSatir){
            // güncelleme yap
            kisiyiGuncelle(eklenecekKisi);
            console.log(tumKisilerDizisi);

    }else {
        kisiyiEkle(eklenecekKisi);
        bilgiOlustur('kişi rehbere kaydedildi', true);
        }
    //    Burada bilgiolustur fonksiyonu kisiyiekle fonksiyonu içinde çağırıldığı için tekrar yazılmadı.
        } else {
        bilgiOlustur(sonucu.mesaj, sonucu.durum)
        console.log(sonucu.mesaj);
      }   
      alanTemizle();

}

function kisiyiGuncelle(kisi){
// kisi parametresinde seçilen kişinin yeni değerleri vardır.
// secilenSatir'da ise eski değerler var. henüz güncelleme yapılmadı.
    for (let i=0; i<tumKisilerDizisi.length; i++){
        if (tumKisilerDizisi[i].mail=== secilenSatir.cells[2].textContent){
            tumKisilerDizisi[i]=kisi;
            break;
        }
    }

    secilenSatir.cells[0].textContent=ad.value;  
    secilenSatir.cells[1].textContent=soyad.value;
    secilenSatir.cells[2].textContent=mail.value;

    document.querySelector('.kaydetGuncelle').value= 'Kaydet';
    bilgiOlustur('Kişi bilgileri güncellendi', true);
    secilenSatir=undefined;
console.log(tumKisilerDizisi);
}

function verileriKontrolEt(kisi){
        for (const deger in kisi){ /* dizilerdeki "of" burada obje olduğu için in olarak kullanılıyor.Tek fark bu (ya bu aslında bildiğimiz for in metodu işte...)*/
        if (kisi[deger]){
        console.log(kisi[deger])} /* for in metodunda keylerin sağındaki value değerlerini almak için object[deger] yazılır. */
        else {
            const sonuc= {
                durum: false,
                mesaj: 'boş alan bırakmayın'
             }
             return sonuc;
            }
        }
        return{
            durum: true,
            mesaj: "Kaydedildi"
        }
}

function kisiyiEkle(eklenecekKisi){
const olusturulanTrElementi= document.createElement('tr');
olusturulanTrElementi.innerHTML= `<td>${eklenecekKisi.ad}</td>
<td>${eklenecekKisi.soyad}</td>
<td>${eklenecekKisi.mail}</td>
<td>
<button class="btn btn--edit"><i class="far fa-edit"></i></button>
<button class="btn btn--delete"><i class="far fa-trash-alt"></i></button>
</td>`;
tumKisilerDizisi.push(eklenecekKisi)
kisiListesi.appendChild(olusturulanTrElementi);
}

// Aşağıdaki fonksiyon uyarı levhalarının css özelliklerini rengini vs ayarlıyor:
function bilgiOlustur(mesaj, durum){
    const olusturulanBilgi= document.createElement('div');
    olusturulanBilgi.textContent= mesaj;
    olusturulanBilgi.className= 'bilgi';

    if (durum){
        olusturulanBilgi.classList.add('bilgi--success')
    } else {
        olusturulanBilgi.classList.add('bilgi--error')
    }
// Yukarıdaki 4 satırlık if işlemini aşağıda 1 satırda yazdık.

// olusturulanBilgi.classList.add(durum? 'bilgi--success' :'bilgi--error')
document.querySelector('.container').insertBefore(olusturulanBilgi, form);

// oluşan uyarının 2 saniye sonra silinmesi için:
setTimeout(function(){
    document.querySelector('.bilgi').remove();
},2000)
 
}

function alanTemizle(){
    ad.value='';
    soyad.value='';
    mail.value='';
}