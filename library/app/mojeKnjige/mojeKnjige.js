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
}


function saveLocalStorage(knjige) {
    let jelaJSON = JSON.stringify(knjige)
    localStorage.setItem("knjige", jelaJSON)
}
function createProductRows(knjige) {
    let tabela = document.querySelector("#pregledBody")
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
        let head = document.querySelector("#pregledHead")
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
    createProductRows(knjige)
    saveLocalStorage(knjige)
    
}

