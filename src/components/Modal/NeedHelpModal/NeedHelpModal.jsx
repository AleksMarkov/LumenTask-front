import React, { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../../Modal/Modal/Modal';
import { needhelpThunk } from '../../../redux/needhelp/needhelp-operation.js';
import { toast } from 'react-toastify';
import { TOASTER } from '../../../constants/index.js';
import {
  Modalform,
  ModalTitle,
  Emailinput,
  Commenttextarea,
  ButtonSend,
} from './NeedHelpModal.styled';
const NeedHelpModal = ({ showModal }) => {
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  
  const [modalWidth, setModalWidth] = useState(400); // Default width
  useEffect(() => {
    const updateModalWidth = () => {
      console.log('Current window Width:', window.innerWidth);
      if (window.innerWidth < 768) {
        setModalWidth(335); // Change width if Width is 768px or less
      } else {
        setModalWidth(400); // Default width
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

    if (email.trim() === '' || comment.trim() === '') {
      toast('Please enter data to submit ❗️', TOASTER);
      return;
    }

    if (comment.trim().length < 10) {
      toast('Comment must be at least 10 characters long ❗️', TOASTER);
      return;
    }

  
      dispatch(needhelpThunk({ email: email, comment: comment }));
      toast('Your message was sent successfully ✅', TOASTER);
      showModal(false);

  };

  const handleEmailChange = evt => {
    setEmail(evt.target.value);
  };

  const handleTextChange = evt => {
    setComment(evt.target.value);
  };

  return (
    <>
      <Modal width={modalWidth} height={307} onClose={() => showModal(false)}>
        <Modalform onSubmit={handleSubmit}>
          <ModalTitle>{'Need help'}</ModalTitle>
          <Emailinput
            value={email}
            onChange={handleEmailChange}
            required
            type="email"
            name="email"
            placeholder="Email address"
          />
          <Commenttextarea
            type="text"
            name="comment"
            value={comment}
            onChange={handleTextChange}
            placeholder="Comment"
          />
          <ButtonSend type="submit">Send</ButtonSend>
        </Modalform>
      </Modal>
    </>
  );
};

export default NeedHelpModal;
