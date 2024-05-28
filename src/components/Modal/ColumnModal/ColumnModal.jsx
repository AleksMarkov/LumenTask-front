import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Modal from '../../Modal/Modal/Modal';
import Icon from '../../Icon/Icon';
import { selectCurrentBoard } from '../../../redux/boards/boards-selectors.js';
import { addColumnThunk } from '../../../redux/column/column-operations';
import {
  Modalform,
  ModalTitle,
  TitleInput,
  ButtonSend,
  PlusButton,
  IconWrap,
  Text,
} from './ColumnModal.styled';

const ColumnModal = ({ showModal }) => {
  const [title, setTitle] = useState('');
  const { _id } = useSelector(selectCurrentBoard);
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

    const newColumn = {
      title,
    };

    try {
      dispatch(addColumnThunk({ boardId: _id, body: newColumn })).then(action => {
        if (action.type === 'columns/createColumn/fulfilled') {
          
        }
      });
      showModal(false);
    } catch (error) {
      return error.message;
    }
  };

  const handleTitleChange = evt => {
    setTitle(evt.target.value);
  };

  return (
    <>
      <Modal width={modalWidth} height={221} onClose={() => showModal(false)}>
        <Modalform onSubmit={handleSubmit}>
          <ModalTitle>{'Add column'}</ModalTitle>
          <TitleInput
            value={title}
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
            <Text>Add</Text>
            </PlusButton>
          </ButtonSend>
        </Modalform>
      </Modal>
    </>
  );
};

export default ColumnModal;
