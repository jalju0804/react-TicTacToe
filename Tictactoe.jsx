import React,{useState, useReducer, useCallback,useEffect} from 'react' // 비동기를 처리할 땐 useEffect를 사용
import Table from './Table'

const initialState = {
    winner : "",
    turn : "O",
    tableData : [
        ["","",""],
        ["","",""],
        ["","",""]
    ],
    recentCell:[-1,-1],
};

export const SET_WINNER = 'SET_WINNER'; // action은 대문자로 설정
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'SET_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state,action) => {
    switch(action.type){
        case SET_WINNER:
            return{
                ...state,
                winner: action.winner,
            }; // 새로운 객체를 만들고 그 안에 바꾸는 값을 바꿔줘야됨(react 공통)
        case CLICK_CELL:{
            const tableData = [...state.tableData];//불변성을 지키기 위해 객체는 얕은 복사를 함
            tableData[action.row] = [...tableData[action.row]]; //immer라는 라이브러리로 가독성 해결
            tableData[action.row][action.cell] = state.turn; 
            return{
                ...state,
                tableData,
                recentCell : [action.row,action.cell],
            };
        }
        case CHANGE_TURN: {
            return {
                ...state,
                turn:state.turn === 'O' ? 'X' : 'O',
            }
        }
        case RESET_GAME:{
            return{
                ...state,
                turn : "O",
                tableData : [
                ["","",""],
                ["","",""],
                ["","",""]
                  ],
                recentCell:[-1,-1],
            }
        }
        default:
            return state;
    }
}; //action를 dispatch할 때 마다 reducer가 실행

const Tictactoe = () =>{
    const[state,dispatch] = useReducer(reducer,initialState);
    const {tableData,turn,winner,recentCell}= state;
    // const[winner,setWinner]= useState("");
    // const[turn,setTurn]= useState("O");
    // const[tableData,setTableData] = useState([["","",""],["","",""],["","",""]]);

    const onClickTable = useCallback(() => {
        dispatch({ type: SET_WINNER , winner: 'O'}) //dispatch 안에 들어가는걸 action이라 함
    },[]);

    useEffect(()=>{
        const[row,cell] = recentCell;
        if (row < 0) {
            return;
          }
          let win = false;
          if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
            win = true;
          }
          if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
            win = true;
          }
          if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
            win = true;
          }
          if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
            win = true;
          }
          if(win){
            dispatch({type : SET_WINNER, winner:turn});
            dispatch({type:RESET_GAME});
          }else{
            //무승부 검사
            let all = true;
            tableData.forEach((row)=>{
                row.forEach((cell) =>{
                    if(!cell){
                        all = false;
                    }
                })
            })
            if(all){
                dispatch({type:RESET_GAME});
            }else {
                dispatch({type: CHANGE_TURN});
            }
          }
    },[tableData]);
    return(
        <>
        <Table onClick = {onClickTable} tableData = {tableData} dispatch = {dispatch}/>
        {winner && <div>{winner}님의 승리</div>}
        </>
    );
};

export default Tictactoe;