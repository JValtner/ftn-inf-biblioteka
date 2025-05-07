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
    const forma = document.getElementById("formaKnjiga")
    forma.addEventListener("submit", function(e){
        e.preventDefault()

        const naziv= document.getElementById("naziv")
        const stampa = document.getElementById("stampa")
        const url = document.getElementById("url")
        const opis = document.getElementById("opis")
        const popularnost = document.getElementById("popularnost")

        const status= document.getElementById("statusPoruka")
        if(!naziv || !stampa || !url || !opis || !popularnost){
            status.textContent = "Molimo popunite sva polja"
            status.style.color = "red"
            return
        }

        const noviId = izracunajNoviID(knjige)

        const novaKnjiga = new Knjiga(noviId, naziv, stampa, url, opis, popularnost, false)

        knjige.push(novaKnjiga)
        localStorage.setItem("knjige", JSON.stringify(knjige))

        status.textContent= "Knjiga je uspesno dodatata."
        status.style.color="green"

        forma.reset()
    })
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

document.addEventListener("DOMContentLoaded", inicijalizujFormu)
