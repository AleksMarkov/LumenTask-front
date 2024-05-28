import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {createBoardThunk} from '../../../redux/boards/boards-operations';

import { TOASTER } from '../../../constants/index';
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
import { useNavigate } from 'react-router-dom';

const BoardModal = ({closeModal, menu, closeMenu }) => {
  const [errorMsgShown, setErrorMsgShown] = useState(false);
  const [errorClassName, setErrorClassName] = useState('');
  const titleRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  useEffect(() => {
    titleRef.current.focus();
  }, []);


  const handleSubmit = e => {
    e.preventDefault();
    const { title, background, iconId } = e.target.elements;

    if (!title.value.trim()) {
      return toast('Enter title to create a board ❗️', TOASTER);
    }
    
    const data = {
      title: title.value,
      icon: iconId.value,
      background:  background.value,
    };

   
      dispatch(createBoardThunk(data)).then(action => {
        if (action.type === 'boards/createBoard/fulfilled') {
          navigate(action.payload._id);
          toast('Board created successfully ✅', TOASTER);
        }
      });
 

    closeModal();
    if (menu) closeMenu();
    return;
  };

  return (
    <Modal width={modalWidth} onClose={closeModal}>
      <Form onSubmit={handleSubmit}>
        <Title>New board</Title>
        <Label>
          <Input
            className={errorClassName}
            ref={titleRef}
            type="text"
            placeholder={'Title'}
            name="title"
            defaultValue={''}
            autoComplete="off"
            maxLength={20}
            onChange={e =>
              validateInputMaxLength(e, setErrorMsgShown, setErrorClassName)
            }
          />
          {errorMsgShown && <p>{'Maximum title length is 20 symbols'}</p>}
        </Label>
        <Text>{'Icons'}</Text>
        <IconsList iconId={'project'} />
        <Text>{'Background'}</Text>
        <BacksList
          backgroundId={'default'}
        />
        <Button type="submit">
          <Span>
            <Plus
              width={14}
              height={14}
              strokeColor={'var(--btn-icon-color)'}
            />
          </Span>
          Create
        </Button>
      </Form>
    </Modal>
  );
};

export default BoardModal;
