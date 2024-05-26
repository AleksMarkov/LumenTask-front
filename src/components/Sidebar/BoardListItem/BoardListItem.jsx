import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentBoard } from '../../../redux/boards/boards-selectors.js';
import {
  BoardItem,
  BoardItemTitleBlock,
  BoardIcon,
  BoardTitle,
  BoardItemButtonsBlock,
  BoardBtn,
  BoardBtnSvg,
} from './BoardListItem.styled';
import BoardModalEdit from '../../Modal/BoardModal/BoardModalEdit'
import sprite from '../../../assets/svg/sprite.svg';
import DeleteModal from 'components/Modal/DeleteModal/DeleteModal';

const BoardListItem = ({ board, activeBoardId, onDelete }) => {
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isActive = activeBoardId === board._id;
  const [isModalShown, setIsModalShown] = useState(false);
  const currentBoard = useSelector(selectCurrentBoard);
  const [localBoard, setLocalBoard] =   useState(board);

  useEffect(() => {
    if (currentBoard && currentBoard._id === board._id) {
      setLocalBoard(currentBoard);
    }
  }, [currentBoard, board._id]);


  return (
    <>
      <BoardItem
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        isActive={isActive}
      >
        <BoardItemTitleBlock>
          <BoardIcon isHovered={isHovered || isActive}>
            <svg>
              <use href={`${sprite}#${localBoard.icon}`}></use>
            </svg>
          </BoardIcon>
          <BoardTitle isHovered={isHovered || isActive}>
            {localBoard.title}
          </BoardTitle>
        </BoardItemTitleBlock>

        {isActive && (
          <BoardItemButtonsBlock>
            <li>
            <BoardBtn onClick={() => setIsModalShown(true)} type="button">
              <BoardBtnSvg isHovered={isHovered || isActive}>
                <svg>
                  <use href={`${sprite}#pencil`}></use>
                </svg>
              </BoardBtnSvg>
              </BoardBtn>
            </li>
            
            <li>
              <BoardBtn
                type="button"
                onClick={() => setIsDeleteModalShown(true)}
              >
                <BoardBtnSvg isHovered={isHovered || isActive}>
                  <svg>
                    <use href={`${sprite}#trash`}></use>
                  </svg>
                </BoardBtnSvg>
              </BoardBtn>
            </li>
          </BoardItemButtonsBlock>
        )}
      </BoardItem>

      {isDeleteModalShown && (
        <DeleteModal
          onClose={() => setIsDeleteModalShown(false)}
          onConfirm={()=> onDelete(board._id)}
        />
      )}
         {isModalShown && (
        <BoardModalEdit
          closeModal={() => setIsModalShown(false)}
          currentBoard={board}
        />
      )}
    </>
  );
};

export default BoardListItem;
