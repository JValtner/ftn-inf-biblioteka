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
    createAvailableRows(knjige)
    saveLocalStorage(knjige)
}


function saveLocalStorage(knjige) {
    let jelaJSON = JSON.stringify(knjige)
    localStorage.setItem("knjige", jelaJSON)
}
function createProductRows(knjige) {
    let tabela = document.querySelector("#pregledBodyIznajmljenih")
    tabela.innerHTML = ''

    if (knjige.some(knjiga => knjiga.iznajmljena === true)) {
        for (let knjiga of knjige) {
            if (knjiga.iznajmljena) {
                let tr = document.createElement("tr")
                let br = document.createElement("td")
                let naziv = document.createElement("td")
                let opcija = document.createElement("td")
                let opcijaBtn = document.createElement("button")

                br.textContent = knjiga.id
                naziv.textContent = knjiga.naziv
                opcijaBtn.textContent = "Vrati"
                opcijaBtn.id = "opcijaBtn"
                opcijaBtn.name = "opcijaBtn"
                opcijaBtn.value = "Vrati"

                opcija.appendChild(opcijaBtn)

                opcijaBtn.addEventListener('click', function (event) {
                    handleReturnBook(knjiga, knjige)
                    event.stopPropagation()
                })

                tr.appendChild(br)
                tr.appendChild(naziv)
                tr.appendChild(opcija)
                tabela.appendChild(tr)
            }
        }
    } else {
        let head = document.querySelector("#pregledHeadIznajmljenih")
        head.style.display = "none"
        let tr = document.createElement("tr")
        let td = document.createElement("td")
        let p = document.createElement("p")
        p.textContent = "Nažalost ne postoje iznajmljene knjige"
        td.colSpan = 3
        td.appendChild(p)
        tr.appendChild(td)
        tabela.appendChild(tr)
    }
}

function handleReturnBook(knjiga,knjige){
    knjiga.iznajmljena = false
    createAvailableRows(knjige)
    createProductRows(knjige)
    saveLocalStorage(knjige)
    
}
function createAvailableRows(knjige){
    let tabela = document.querySelector("#pregledBodyPostojecih")
    tabela.innerHTML = ''

    const dostupneKnjige = knjige.filter(knjiga => knjiga.iznajmljena === false)

    if(dostupneKnjige.length > 0){
        for(let knjiga of dostupneKnjige){
            let tr = document.createElement("tr")
            let tdId = document.createElement("td")
            let tdNaziv = document.createElement("td")
            let tdOpcija = document.createElement("td")
            let dugme = document.createElement("button")

            tdId.textContent = knjiga.id
            tdNaziv.textContent = knjiga.naziv
            dugme.textContent = "Iznajmi"

            dugme.addEventListener("click", function(){
                knjiga.iznajmljena = true
                saveLocalStorage(knjige)
                createProductRows(knjige)
                createAvailableRows(knjige)
            })

            tdOpcija.appendChild(dugme)
            tr.appendChild(tdId)
            tr.appendChild(tdNaziv)
            tr.appendChild(tdOpcija)
            tabela.appendChild(tr)
        }
    }
    else{
        let tr= document.createElement("tr")
        let td= document.createElement("td")
        td.colSpan = 3
        td.textContent = "Trenutno nema dostupnih knjiga"
        tr.appendChild(td)
        tabela.appendChild(tr)
    }
}
