import * as Styled from './Header.styled';
import ThemeSelection from './ThemeSelection/ThemeSelection';
import Icon from 'components/Icon/Icon';

const Header = ({ openSidebar, showSidebar }) => {
  return (
    <Styled.Header showSidebar={showSidebar}>
      <Styled.MobMenuBtn type="button" onClick={openSidebar} showSidebar={showSidebar}>
        <Icon name="icon-menu" />
      </Styled.MobMenuBtn>
      <Styled.UserInfoDiv>
        <ThemeSelection />
      </Styled.UserInfoDiv>
    </Styled.Header>
  );
};

export default Header;
