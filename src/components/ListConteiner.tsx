import React from 'react'
import './styles/main.css'
import ItemList from './ItemList'

export interface Item{
    name: string,
    port: number
}

interface Props{
    list: Item[]
}

const ListConteiner:React.FC<Props> = ({list})=>{
    return(
        <ul className='list'>
            {list.map((item) => (
            <ItemList name={item.name} port={item.port}></ItemList>
            ))}
        </ul>
    )
}

export default ListConteiner