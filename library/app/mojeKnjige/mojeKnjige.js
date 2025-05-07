'use strict'
class Knjiga{
    constructor(id, naziv, datumStampanja,url,opis,popularnost,iznajmljena){
        this.id = id
        this.naziv = naziv
        this.datumStampanja = datumStampanja
        this.url = url
        this.opis = opis
        this.popularnost = popularnost
        this.iznajmljena = iznajmljena
    }

}

document.addEventListener("DOMContentLoaded", function(){
    let sveKnjige = []
    let stringKnjiga = localStorage.getItem("knjige")
})