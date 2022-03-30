class Kisi{
    constructor(ad, soyad, mail){
        this.ad=ad;
        this.soyad=soyad;
        this.mail=mail;
    }
}

class KontrolFonksiyonlari{
    static bosAlanKontrolEt(...alanlar){
        let sonuc= true;
        alanlar.forEach(alan=>{
            if (alan.length===0){
               return sonuc=false;
            }
        }); return sonuc;
        
    }
}

class Ekran{
    constructor(){
        this.ad= document.getElementById('ad');
        this.soyad= document.getElementById('soyad');
        this.mail= document.getElementById('mail');
        this.ekleGuncelleButon= document.querySelector('.kaydetGuncelle');
        this.form=document.getElementById('form-rehber');
        this.form.addEventListener('submit', this.kaydetGuncelle.bind(this));
        this.kisiListesi=document.querySelector('.kisi-listesi');
        this.kisiListesi.addEventListener('click', this.guncelleVeyaSil.bind(this));
        this.secilenSatir=undefined
        // this.depo= new Depo(); 
    }

    bilgiOlustur(mesaj, durum){
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

    document.querySelector('.container').insertBefore(olusturulanBilgi, this.form);
    
    // oluşan uyarının 2 saniye sonra silinmesi için:
    setTimeout(function(){
        document.querySelector('.bilgi').remove();
    },2000)
     
    }

    alanTemizle(){
    ad.value='';
    soyad.value='';
    mail.value='';
}
// Aşağı bölümdeki Güncelle veya sil butonlarına basıldığında yapılacak işlemler
    guncelleVeyaSil(event){
        if (event.target.classList.contains('btn--delete')){
            console.log('silme butonu');
            this.secilenSatir= event.target.parentElement.parentElement;
            this.rehberdenSil(this.secilenSatir)
    }if (event.target.classList.contains('btn--edit')) {
        console.log('güncelleme butonu');
        this.ekleGuncelleButon.value= 'Güncelle';
        this.secilenSatir= event.target.parentElement.parentElement;

        this.ad.value= this.secilenSatir.cells[0].textContent;
        this.soyad.value= this.secilenSatir.cells[1].textContent;
        this.mail.value= this.secilenSatir.cells[2].textContent;
    }
}

// kaydet butonu güncelleye dönüştükten sonra güncelle butonuna tıklayınca yapılacak işlemin fonksiyonu
    kaydedilenKisiyiGuncelle(kisi){
        // const eskiKisi= new Kisi(this.secilenSatir.cells[0].textContent, this.secilenSatir.cells[1].textContent, this.secilenSatir.cells[2].textContent)
        const guncellenmisKisi= new Kisi (this.ad.value, this.soyad.value, this.mail.value);

       this.secilenSatir.cells[0].textContent= this.ad.value;
       this.secilenSatir.cells[1].textContent= this.soyad.value;
       this.secilenSatir.cells[2].textContent= this.mail.value;
    }

    rehberdenSil(silinecekTr, silinecekMail){
        silinecekTr.remove();
        this.bilgiOlustur('Kişi Silindi', false);
    }

    // ekrana girilen bilgileri aşağı kaydeder
    kisiyiEkranaEkle(kisi){
        const olusturulanTrElementi=document.createElement('tr');
        olusturulanTrElementi.innerHTML= `<td>${kisi.ad}</td>
        <td>${kisi.soyad}</td>
        <td>${kisi.mail}</td>
        <td>
        <button class="btn btn--edit"><i class="far fa-edit"></i></button>
        <button class="btn btn--delete"><i class="far fa-trash-alt"></i></button>
        </td>`;

        this.kisiListesi.appendChild(olusturulanTrElementi);
    }

    kaydetGuncelle(e){
        e.preventDefault();
        const kisi= new Kisi(this.ad.value, this.soyad.value, this.mail.value);
        const sonuc=  KontrolFonksiyonlari.bosAlanKontrolEt(kisi.ad, kisi.soyad, kisi.mail);
       
        if (sonuc){
            
            
            if(this.secilenSatir){
               this.kaydedilenKisiyiGuncelle();
               this.bilgiOlustur('Kişi Güncellendi', true);
               this.alanTemizle()
               this.ekleGuncelleButon.value= 'Kaydet';
               
            }else{
                console.log('kaydedildi');
                this.kisiyiEkranaEkle(kisi);
                this.bilgiOlustur('Kişi Kaydedildi', true);
                this.alanTemizle();
        }       this.secilenSatir=undefined

        } else {
            console.log('boş alan var');
            this.bilgiOlustur('Boş Alan Bırakmayınız', false);

        }

    }
}


// class Depo{
//     // Uygulama ilk açıldığında verileri getirir. 

//     constructor(){
//         this.tumKisiler=[];
//     }
    
//     kisileriGetir(){
//         let tumKisilerLocal;
//         if(localStorage.getItem('tumKisiler')===null){
//             tumKisilerLocal=[];
//         } else {
//             tumKisilerLocal=JSON.parse(localStorage.getItem('tumKisiler'));
//         }
//         this.tumKisiler=tumKisilerLocal;
//         return tumKisilerLocal;
//     }
//     kisiEkle(kisi){
//         const tumKisilerLocal= this.kisileriGetir();
//         tumKisilerLocal.push(kisi);
//         localStorage.setItem('tumKisiler', JSON.stringify(tumKisilerLocal));
//     }
// }

document.addEventListener('DOMContentLoaded', function(e){
    const ekran= new Ekran();
});

// const yavuz = new Kisi('yavuz','ergun','posta@mail');
// const ekran= new Ekran();