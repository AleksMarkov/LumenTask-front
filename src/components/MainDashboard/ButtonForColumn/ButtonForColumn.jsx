// import { AddColumnButton, IconPlus } from './ButtonForColumn.styled';
// import sprite from '../../../assets/svg/sprite.svg';
import ColumnModal from 'components/Modal/ColumnModal/ColumnModal';
import { useState } from 'react';
import Icon from '../../Icon/Icon';
import  {IconWrap, PlusButton, ButtonSend,Text,} from './ButtonForColumn.styled'

const ButtonForColumn = () => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(prevShowModal => !prevShowModal)

  return (
    <>
      <ButtonSend type="submit" onClick={toggleModal}>
        <PlusButton>
          <IconWrap>
            <Icon
              width={14}
              height={14}
              fillColor={'none'}
              strokeColor={'var( --btn-add-column'}
              name={'icon-plus'}
            />
          </IconWrap>

          <Text>Add another column</Text>
        </PlusButton>
      </ButtonSend>
      {showModal && <ColumnModal showModal={setShowModal} />}
    </>
  );
};

export default ButtonForColumn;