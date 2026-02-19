//items.js
import React, { Component } from "react"
import { Link } from "gatsby"
import ItemTable from "../components/ItemTable"

/*
Seite soll sich der Pokemon-API bedienen, über einen entsprechenden node alle items ziehen
und diese dann mit markanten Informationen in einer Tabelle darstellen!
 
Lernziel:
- Wiederholung: state, lifecycle methods, event handler, ...
- Vertiefung von API-Calls (jetzt neuer node "item")
- Sukszessive Einführung neuer Components (z. B. "table")
- Verlinkung zwischen verschiedenen pages!
*/

export default class Items extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: []
        }
    }

    fetchItems = async () => {
        const url = "https://pokeapi.co/api/v2/item?limit=20"
        const response = await fetch(url)
        const data = await response.json()

        console.log(data)
        /*
        {count: 2176, next: 'https://pokeapi.co/api/v2/item?offset=20&limit=20', previous: null, results: Array(20)}
    count
    :
    2176
    next
    :
    "https://pokeapi.co/api/v2/item?offset=20&limit=20"
    previous
    :
    null
    results
    :
    Array(20)
    0
    :
    {name: 'master-ball', url: 'https://pokeapi.co/api/v2/item/1/'}
    1
    :
    {name: 'ultra-ball', url: 'https://pokeapi.co/api/v2/item/2/'}
    2
    :
    {name: 'great-ball', url: 'https://pokeapi.co/api/v2/item/3/'}
    3
    :
    {name: 'poke-ball', url: 'https://pokeapi.co/api/v2/item/4/'}
    4
    :
    {name: 'safari-ball', url: 'https://pokeapi.co/api/v2/item/5/'}
    5
    :
    {name: 'net-ball', url: 'https://pokeapi.co/api/v2/item/6/'}
    6
    :
    {name: 'dive-ball', url: 'https://pokeapi.co/api/v2/item/7/'}
    7
    :
    {name: 'nest-ball', url: 'https://pokeapi.co/api/v2/item/8/'}
        */

        const detailInfos = data.results.map(async (eintrag) => {
            const detailResponse = await fetch(eintrag.url)
            const detailData = await detailResponse.json()
            let effectText = "Kein Effekt hinterlegt";
            if (detailData.effect_entries && detailData.effect_entries.length > 0) {
                effectText = detailData.effect_entries[0].short_effect || detailData.effect_entries[0].effect;
            }



            return {
                name: detailData.name,
                category: detailData.category.name,
                effect: effectText,
                price: detailData.cost
            }

        })
        const itemsWithDetails = await Promise.all(detailInfos)
        this.setState({ items: itemsWithDetails })

    }


    componentDidMount() {
        this.fetchItems()
    }

    render() {
        const { items } = this.state
        return (
            <div>
                <h1>Items-Page</h1>
                <p>Verlinkung zurück zur Startseite (=index.js)</p>
                <Link to="/">Startseite</Link>
                <ItemTable items={items} />


            </div>
        )
    }
}
/*
    Weitere Schritte:
    - 1. Irgendwie die 3 Placeholder-Daten über Sub-API-Call bekommen und auflisten!
    - 2. Die Table in eine wiederverwendbare "component" auslagern (Verwendung über "import")
*/