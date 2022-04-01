const ad= document.getElementById('ad');
const soyad= document.getElementById('soyad');
const mail= document.getElementById('mail');
const form= document.getElementById('form-rehber');
const kisiListesi= document.querySelector('.kisi-listesi');
const kaydetButon=document.querySelector('.kaydetGuncelle');
let secilenSatir= undefined;

form.addEventListener('submit', kaydet);
kisiListesi.addEventListener('click', kaydedilenKisiIslemleri);

function kaydedilenKisiIslemleri(e){
e.preventDefault();
const kaydedilenTr= e.target.parentElement.parentElement;
if (e.target.className==='btn btn--edit'){
    ad.value=kaydedilenTr.cells[0].textContent;
    soyad.value=kaydedilenTr.cells[1].textContent;
    mail.value=kaydedilenTr.cells[2].textContent;

    
    kaydetButon.value='Güncelle';
    secilenSatir=kaydedilenTr;

}if(e.target.className==='btn btn--delete'){
    rehberdenSil(kaydedilenTr);
    bilgiOlustur(false, 'Kişi Bilgileri Silindi')
}
}



function rehberdenSil(tr){
tr.remove();
}

// Kaydet event fonksiyonları
function kaydet(e){
e.preventDefault();

const eklenecekKisi= {
    ad: ad.value,
    soyad: soyad.value,
    mail: mail.value
}
const fonkSonucu= verileriKontrolEt(eklenecekKisi);
if(fonkSonucu.durum){
    if(secilenSatir){
        secilenSatir.cells[0].textContent=ad.value;
        secilenSatir.cells[1].textContent=soyad.value;
        secilenSatir.cells[2].textContent=mail.value;

        kaydetButon.value='Kaydet';
        bilgiOlustur(true, 'Kişi Bilgileri Güncellendi');
        secilenSatir= undefined;
    } else {
    kisiyiEkle(eklenecekKisi);
    bilgiOlustur(fonkSonucu.durum, fonkSonucu.mesaj); }
} else {
    bilgiOlustur(fonkSonucu.durum, fonkSonucu.mesaj);
}
alanTemizle();

}

function bilgiOlustur(durum, mesaj){
    const olusturulanBilgi= document.createElement('div');
    olusturulanBilgi.textContent= mesaj;
    olusturulanBilgi.className= 'bilgi';

    if(durum){
        olusturulanBilgi.classList.add('bilgi--success');
    }else {
        olusturulanBilgi.classList.add('bilgi--error');
    }
    document.querySelector('.container').insertBefore(olusturulanBilgi, form);
    setTimeout(function(){
        document.querySelector('.bilgi').remove();
    },2000)
    
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

kisiListesi.appendChild(olusturulanTrElementi);

}

function verileriKontrolEt(kisi){
   for(deger in kisi){
       if (kisi[deger]){
       }else{ 
           let sonuc={
               durum: false,
               mesaj: 'Boş Alan Bırakmayın'
           }; return sonuc;
       } 
   } return {
    durum: true,
    mesaj:'Bilgiler Kaydedildi'
   } 
}

function alanTemizle(){
    ad.value='';
    soyad.value='';
    mail.value='';
}