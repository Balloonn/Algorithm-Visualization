import { DataGraphStructure } from "../data/dataGraph";

export default function update_adjlis () {
    let adjlist = document.getElementById('adjlist');
    let text = '';
    for(let i = 0; i < DataGraphStructure.nodes.length; i ++) {
        const node = DataGraphStructure.nodes[i];
        text += node.id;
        for(let j = 0; j < node.adjList.length; j ++) {
            text += '->';
            text += node.adjList[j];
        }
        text += '\n'
    }
    adjlist.innerText = text;
}