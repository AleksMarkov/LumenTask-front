import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { logOut } from '../../redux/auth/auth-operations';
import BoardList from './BoardList/BoardList';
import NeedHelp from './NeedHelp/NeedHelp';
import BoardModal from '../Modal/BoardModal/BoardModal';
import {
  SidebarWrapper,
  SidebarHeader,
  LogoBlock,
  LogoutLink,
  SidebarBoardsList,
  LogoutBlock,
  LogoutIcon,
  BoardBlock,
  CreateBoardBlock,
  CreateBoardText,
  Button,
  PlusIcon,
} from './Sidebar.styled';
import sprite from '../../assets/svg/sprite.svg';
const Sidebar = ({ showSidebar }) => {
  const [isAddBoardModalShown, setIsAddBoardModalShown] = useState(false);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <SidebarWrapper showSidebar={showSidebar}>
      <SidebarHeader>
        <LogoBlock>
          <div>
            <svg>
              <use href={`${sprite}#logo`}></use>
            </svg>
          </div>
          <p>Task Pro</p>
        </LogoBlock>
      </SidebarHeader>
      <BoardBlock>
        <h2>My boards</h2>
        <CreateBoardBlock>
          <CreateBoardText>Create a new board</CreateBoardText>
          <Button onClick={() => setIsAddBoardModalShown(true)} type="button">
            <PlusIcon>
              <svg>
                <use href={`${sprite}#plus`}></use>
              </svg>
            </PlusIcon>
          </Button>
        </CreateBoardBlock>
      </BoardBlock>

      <SidebarBoardsList> <BoardList /></SidebarBoardsList>
      <div>
        <NeedHelp />
      </div>
      <LogoutBlock>
        <LogoutLink>
          <LogoutIcon>
            <svg>
              <use href={`${sprite}#log-out`}></use>
            </svg>
          </LogoutIcon>
          <Link to="/" onClick={handleLogOut}>
            <p>Log out</p>
          </Link>
        </LogoutLink>
      </LogoutBlock>
      {isAddBoardModalShown && (
        <BoardModal
          closeModal={() => setIsAddBoardModalShown(false)}
          closeMenu={showSidebar}
        />
      )}
    </SidebarWrapper>
  );
};

export default Sidebar;

