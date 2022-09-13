import React from 'react'
import Tr from './Tr'

const Table =({onClick,tableData,dispatch}) =>{
    return(
        <table>
            {Array(tableData.length).fill().map((tr,i)=> (
            <Tr key ={i} dispatch = {dispatch}rowIndex={i} rowData={tableData[i]}/>))}
        </table>
    );
};

export default Table;

// 자식이 리렌더링 되어서 부모인 table도 리렌더링이 되는 상황