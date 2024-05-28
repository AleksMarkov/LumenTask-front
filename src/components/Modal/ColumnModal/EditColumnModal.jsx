import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../Modal/Modal/Modal';
import {
  Modalform,
  ModalTitle,
  TitleInput,
  ButtonSend,
  PlusButton,
  IconWrap,
} from './ColumnModal.styled';
import Icon from '../../Icon/Icon';
import { selectCurrentBoard } from '../../../redux/boards/boards-selectors.js';
import { updateColumnThunk } from '../../../redux/column/column-operations';

const EditColumnModal = ({ showModal, columnId, title, onColumnUpdate }) => {
  const [newTitle, setNewTitle] = useState(title ? title : '');
  const { _id: boardId } = useSelector(selectCurrentBoard);
  const dispatch = useDispatch();
  const [modalWidth, setModalWidth] = useState(350); // Default width
  useEffect(() => {
    const updateModalWidth = () => {
      console.log('Current window Width:', window.innerWidth);
      if (window.innerWidth < 768) {
        setModalWidth(335); // Change width if Width is 768px or less
      } else {
        setModalWidth(350); // Default width
      }
    };

    // Initial check
    updateModalWidth();

    // Add event listener for window resize
    window.addEventListener('resize', updateModalWidth);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateModalWidth);
    };
  }, []);

  const handleSubmit = async evt => {
    evt.preventDefault();

    const editColumn = {
      title: newTitle,
    };
    try {
      dispatch(
        updateColumnThunk({ boardId: boardId, id: columnId, body: editColumn })
      );
      if (onColumnUpdate) {
        onColumnUpdate(newTitle);
      }
     
      showModal(false);
    } catch (error) {
      return error.message;
    }
  };

  const handleTitleChange = evt => {
    setNewTitle(evt.target.value);
  };

  return (
    <>
      <Modal width={modalWidth} height={221} onClose={() => showModal(false)}>
        <Modalform onSubmit={handleSubmit}>
          <ModalTitle>{'Edit column'}</ModalTitle>
          <TitleInput
            value={newTitle}
            onChange={handleTitleChange}
            required
            type="text"
            name="title"
            placeholder="Titie"
          />

          <ButtonSend type="submit">
            <PlusButton>
              <IconWrap>
                <Icon
                  width={14}
                  height={14}
                  fillColor={'none'}
                  strokeColor={'var(--icon-plus)'}
                  name={'icon-plus'}
                />
              </IconWrap>
              Edit
            </PlusButton>
          </ButtonSend>
        </Modalform>
      </Modal>
    </>
  );
};

export default EditColumnModal;
