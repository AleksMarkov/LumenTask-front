import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { TOASTER } from '../../../constants/index';
import { updateBoardThunk } from '../../../redux/boards/boards-operations';
import {  selectCurrentBoard } from '../../../redux/boards/boards-selectors';
import { validateInputMaxLength } from '../../../helpers/validateInputMaxLength.js';
import Modal from '../Modal/Modal';
import { IconsList } from './IconsList';
import { BacksList } from '../BoardModal/BacksList';
import Plus from '../../Icon/Plus';
import {
  Form,
  Title,
  Label,
  Input,
  Text,
  Button,
  Span,
} from './BoardModal.styled';


const BoardModalEdit = ({ closeModal,currentBoard}) => {
  const [errorMsgShown, setErrorMsgShown] = useState(false);
  const [errorClassName, setErrorClassName] = useState('');
  const dispatch = useDispatch();
  const oneBoard = useSelector(selectCurrentBoard);
  const [modalWidth, setModalWidth] = useState(350); // Default width
  useEffect(() => {
    const updateModalWidth = () => {
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

  const handleSubmit = e => {
    e.preventDefault();
    const { title, background, iconId } = e.target.elements;
    const data = {
      title: title.value,
      icon: iconId.value,
      background: background.value,
    };

    dispatch(updateBoardThunk({ boardId: currentBoard._id, newData: data }))
    .then(action => {
      if (action.type === 'boards/updateBoard/fulfilled') {
        toast('Board updated successfully ✅', TOASTER);
      } else {
        toast(action.payload, TOASTER);
      }
    });
    closeModal();
  };


  return (
    <Modal width={modalWidth} onClose={closeModal}>
      <Form onSubmit={handleSubmit}>
        <Title>Edit board</Title>
        <Label>
          <Input
            className={errorClassName}
            type="text"
            placeholder={'Title'}
            name="title"
            defaultValue={oneBoard.title}
            autoComplete="off"
            maxLength={20}
            onChange={e =>
              validateInputMaxLength(e, setErrorMsgShown, setErrorClassName)
            }
          />
          {errorMsgShown && <p>{'Maximum title length is 20 symbols'}</p>}
        </Label>
        <Text>{'Icons'}</Text>
        <IconsList iconId={ oneBoard.icon} />
        <Text>{'Background'}</Text>

        <BacksList
          backgroundId={oneBoard.background}
        />
        <Button type="submit">
          <Span>
            <Plus
              width={14}
              height={14}
              strokeColor={'var(--btn-icon-color)'}
            />
          </Span>
          Edit
        </Button>
      </Form>
    </Modal>
  );
};

export default BoardModalEdit;
