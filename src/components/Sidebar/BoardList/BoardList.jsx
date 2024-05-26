import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  getAllBoardsThunk,
  getBoardByIdThunk,
  deleteBoardThunk
} from '../../../redux/boards/boards-operations';
import { BoardListContainer, BoardItem } from './BoardList.styled';
import BoardListItem from '../BoardListItem/BoardListItem';
import { selectBoards, selectCurrentBoard } from '../../../redux/boards/boards-selectors.js';
import { toast } from 'react-toastify';
import { TOASTER } from '../../../constants/index';

const BoardList = () => {
  const boards = useSelector(selectBoards);
  const currentBoard = useSelector(selectCurrentBoard);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activeBoardId = currentBoard?._id;

  const activeBoardIndex = boards.findIndex(board => board._id === activeBoardId);
  const nextBoardId = activeBoardIndex > 0 ? boards[activeBoardIndex - 1]?._id : boards[activeBoardIndex + 1]?._id;

  useEffect(() => {
    dispatch(getAllBoardsThunk());
  }, [dispatch]);


  if (!activeBoardId && boards.length > 0) {
    dispatch(getBoardByIdThunk(boards[0]._id));
  }

  const handleClick = boardId => {
    dispatch(getBoardByIdThunk(boardId));
  };

  const handleDeleteBoard = boardId => {
    dispatch(deleteBoardThunk(boardId)).then(action => {

      if (action.type === 'boards/deleteBoard/fulfilled') {
        toast('Board deleted successfully ✅', TOASTER);
      } else {
        toast(action.payload, TOASTER);
        return;
      }

      dispatch(getBoardByIdThunk(nextBoardId));
      navigate(nextBoardId ? `/home/${nextBoardId}` : '/');
    });
  };

  const elements = boards.map(({ _id, title, icon }) => (
    <BoardItem
      key={_id}
      onClick={() => handleClick(_id)}
      className={activeBoardId === _id ? 'activeBoard' : ''}
    >
      <NavLink to={`/home/${_id}`}>   
        <BoardListItem
          board={{ _id, title, icon }}
          activeBoardId={activeBoardId}
          onDelete={() => handleDeleteBoard(_id)}
        />
      </NavLink>
    </BoardItem>
  ));

  return (
    <BoardListContainer>{boards.length > 0 && elements}</BoardListContainer>
  );
};

export default BoardList;
