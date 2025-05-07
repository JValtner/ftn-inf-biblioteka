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
document.addEventListener('DOMContentLoaded', initializeKnjige)

function initializeKnjige() {
    let knjige = []
    
    let knjigeString = localStorage.getItem("knjige")
    if (knjigeString) {
        knjige = JSON.parse(knjigeString)
    }

    createProductRows(knjige)
    saveLocalStorage(knjige)
    poveziFormu(knjige)
}


function saveLocalStorage(knjige) {
    let jelaJSON = JSON.stringify(knjige)
    localStorage.setItem("knjige", jelaJSON)
}
function createProductRows(knjige) {
    let table = document.querySelector("pregled")
    let tabela = document.querySelector("#pregledBody")
    tabela.innerHTML = ''

    for (let knjiga of knjige) {
        let tr = document.createElement("tr")
        let br = document.createElement("td")
        let naziv = document.createElement("td")
        let opcija = document.createElement("td")
        let opcijaBtn = document.createElement("button")

        br.textContent = knjiga.id
        naziv.textContent = knjiga.naziv
        opcija.appendChild(opcijaBtn)
        opcijaBtn.id = "opcijaBtn"
        opcijaBtn.name = "opcijaBtn"
        opcijaBtn.value = "Obrisi"
        opcijaBtn.textContent ="Obrisi"

        tr.appendChild(br)
        tr.appendChild(naziv)
        tr.appendChild(opcija)
        opcijaBtn.addEventListener('click',
            function (event) {
                handleDeleteBook(knjiga,knjige)
                event.stopPropagation()
            })
        tabela.appendChild(tr)
    }
}
function handleDeleteBook(knjiga,knjige){
    if(knjige){
        const index = knjige.indexOf(knjiga)
        if (index !== -1) {
            knjige.splice(index, 1)
            createProductRows(knjige)
            saveLocalStorage(knjige)
        }
    }

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

        status.textContent= "Knjiga je uspesno dodatata."
        status.style.color="green"

        forma.reset()
        createProductRows(knjige)
        saveLocalStorage(knjige)
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

