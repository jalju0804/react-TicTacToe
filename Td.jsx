import React,{useCallback} from 'react'
import { CLICK_CELL } from './Tictactoe';

const Td = ({rowIndex,cellIndex,dispatch,cellData}) =>{
    const onClickTd = useCallback(() =>{
        console.log(rowIndex,cellIndex);
        if(cellData){
            return;
        }
        dispatch({type: CLICK_CELL, row : rowIndex, cell: cellIndex}); //비동기적으로 바뀜
    },[cellData]);

    return(
        <td onClick={onClickTd}>{cellData}</td>
    )
};

export default Td;