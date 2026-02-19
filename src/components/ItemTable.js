//ItemTable.js
import React from "react";

const ItemTable = ({ items }) => {
    if (!items || items.length === 0) {
        return <p>Lade Items...</p>;
    }
    return (
        <table className="table-items">
            <thead className="table-items-hd">
                <tr>
                    <th>Item</th>
                    <th>Kategorie</th>
                    <th>Effekt</th>
                    <th>Preis</th>
                </tr>
            </thead>
            <tbody className="table-items-bd">
                {items.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.effect}</td>
                            <td>{item.price}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>


    )
}

export default ItemTable;