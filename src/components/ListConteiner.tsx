import React from 'react'
import './styles/main.css'
import ItemList from './ItemList'

export interface Item{
    name: string,
    port: number
}

interface Props{
    list: Item[],
    on_change_item:any
}

const ListConteiner:React.FC<Props> = ({list, on_change_item})=>{
    return(
        <ul className='list'>
            {list.map((item) => (
            <ItemList name={item.name} port={item.port} on_change={on_change_item}></ItemList>
            ))}
        </ul>
    )
}

export default ListConteiner