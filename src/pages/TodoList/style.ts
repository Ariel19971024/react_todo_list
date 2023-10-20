import styled from "@emotion/styled";
const Container = styled.div`
  width: 100vw;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #cfe8fc;
  overflow-y: hidden;

  @media (max-width: 991px) {
    display: block;
    padding-top: 80px;
  }
  @media (max-width: 768px) {
    padding-top: 60px;
  }
`;
const Card = styled.div`
  background-color: #fff;
  width: 80%;
  max-width: 720px;
  height: 95%;
  padding: 50px;
  border-radius: 15px;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
  @media (max-width: 991px) {
    margin: 0 auto;
  }
  @media (max-width: 768px) {
    max-width: calc(100% - 20px);
    padding: 30px;
  }
`;
const Header = styled.div`
  width: 100%;
  text-align: center;
  line-height: 1.5;
  font-family: monospace;
  font-size: 50px;
  font-weight: 600;
  background-image: linear-gradient(to left, #1530c3, #cfd5fe);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  @media (max-width: 991px) {
    font-size: 44px;
  }
  @media (max-width: 768px) {
    font-size: 36px;
  }
`;
const AddSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  gap: 6px;
  margin-top: 30px;

  .add-section {
    &_input,
    &_select,
    &_date,
    &_button {
      height: 40px;
    }

    &_input {
      flex-grow: 2;
    }
    &_select,
    &_date {
      flex-grow: 1;
    }
    &_button {
      flex-grow: 1;
    }
  }

  @media (max-width: 991px) {
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;

    .add-section {
      &_input,
      &_button {
        width: 100%;
      }
      &_select,
      &_date {
        width: calc(50% - 3px);
      }

      &_input,
      &_select,
      &_date,
      &_button {
        height: 32px;
      }
    }
  }
`;
const ListSection = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  `;
  const List = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const Option = styled.div`
  width: 99%;
  margin: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 45px;
  background: #eceff0;
  &:hover {
    opacity: 0.7;
  }
`;

const SortSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  margin-top: 3px;
`;

const FlexSection = styled.div`
  display: flex;
`;

const StatusSection = styled.div`
  display: flex;
  align-items: center;
`;

export {
  Container,
  Card,
  Header,
  AddSection,
  ListSection,
  List,
  Option,
  SortSection,
  FlexSection,
  StatusSection,
};
