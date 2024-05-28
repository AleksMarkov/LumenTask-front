import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal/Modal';
import Icon from 'components/Icon/Icon';
import CardPriorityList from './CardPriorityList';
import Calendar from 'components/Calendar/Calendar';
import { addCardThunk } from '../../../redux/cards/cards-operations';
import {
  ButtonSend,
  IconWrap,
  ModalTitle,
  Modalform,
  PlusButton,
  Text,
  Textarea,
  TitleInput,
  TextAdd,
} from './CardModal.styled';
import { selectCurrentBoard } from '../../../redux/boards/boards-selectors';

const CardAddModal = ({ columnId, showModal }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cardPriority, setCardPriority] = useState('without');
  const [deadline, setDeadline] = useState(new Date());
  const board = useSelector(selectCurrentBoard);
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

  const changeDeadline = date => {
    setDeadline(date);
  };
  const handleSubmit = e => {
    e.preventDefault();

    const newCard = {
      title: title.trim(),
      description: description.trim(),
      priority: cardPriority,
      deadline,
    };

    try {
      dispatch(addCardThunk({ boardId: board._id, columnId, body: newCard }));
      showModal(false);
    } catch (error) {
      return error.message;
    }
    
  };

  return (
    <Modal width={modalWidth} height={522} onClose={() => showModal(false)}>
      <Modalform onSubmit={handleSubmit}>
        <ModalTitle>{'Add card'}</ModalTitle>
        <TitleInput
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          type="text"
          name="title"
          placeholder="Title"
        />
        <Textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          type="text"
          name="description"
          placeholder="Description"
        />
        <Text>{'Label color'}</Text>
        <CardPriorityList value={cardPriority} onChange={setCardPriority} />
        <Text>{'Deadline'}</Text>
        <Calendar style={{fontSize:`14px`}} date={deadline} changeDate={changeDeadline} />
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
            <TextAdd>Add</TextAdd>
          </PlusButton>
        </ButtonSend>
      </Modalform>
    </Modal>
  );
};

export default CardAddModal;
