'use strict'
class Knjiga{
    constructor(id, naziv, datumStampanja,url,opis,popularnost, iznajmljena){
        this.id = id
        this.naziv = naziv
        this.datumStampanja = datumStampanja
        this.url = url
        this.opis = opis
        this.popularnost = popularnost
        this.iznajmljena = iznajmljena
    }

}
function inicijalizujFormu(){
    let knjige=[]

    let knjigaString = localStorage.getItem("knjige")
    if(knjigaString){
        knjige=JSON.parse(knjigaString)
    }

    poveziFormu(knjige)
}
function poveziFormu(knjige){
    let dugme = document.querySelector("#submitBtn")
    dugme.addEventListener("click", function(){
        const formKnjiga = uzmiPodatkeIzForme()

        if (!formKnjiga.naziv || !formKnjiga.datumStampanja || !formKnjiga.url || !formKnjiga.opis ||
            isNaN(formKnjiga.popularnost) || formKnjiga.popularnost < 1 || formKnjiga.popularnost > 5) {
          prikaziPoruku("Molimo popunite sva polja i proverite popularnost (1–5).", "red")
          return
        }

        const noviId = izracunajNoviID(knjige)
        knjige.push(new Knjiga(noviId, formKnjiga.naziv, formKnjiga.datumStampanja, formKnjiga.url, formKnjiga.opis, formKnjiga.popularnost, false))

        localStorage.setItem("knjige", JSON.stringify(knjige))
        prikaziPoruku("Knjiga je uspešno dodata.", "green")
    })

}
function uzmiPodatkeIzForme(){
    const form = document.querySelector("#formaKnjiga")
    const formData = new FormData (form)
    const naziv= formData.get("naziv")
    const datumStampanja = formData.get("datumStampanja")
    const url = formData.get("url")
    const opis = formData.get("opis")
    const popularnost = parseInt(formData.get("popularnost"))

    return{
        naziv,
        datumStampanja,
        url,
        opis,
        popularnost
    }
}

function izracunajNoviID(knjige){
    let maxId= 0
    for(let i =0; i < knjige.length; i++){
        if(knjige[i].id >maxId){
            maxId = knjige[i].id
        }
    }
    return maxId+1
}

function prikaziPoruku(tekst, boja){
    const status = document.getElementById("statusPoruka")
    status.textContent= tekst
    status.style.color = boja
}

document.addEventListener("DOMContentLoaded", inicijalizujFormu)
