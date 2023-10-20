import styled from "@emotion/styled";
const Header = styled.div`
  width: 100%;
  height: 15%;
  text-align: center;
  line-height: 150px;
  font-family: monospace;
  font-size: 50px;
  font-weight: 600;
  background-image: linear-gradient(to left, #1530c3, #cfd5fe);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
`;
const AddSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;
const ListSection = styled.div`
  width: 100%;
  height: 65%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const List = styled.div`
  width: 70%;
  height: 100%;
  overflow-y: scroll;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
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
  width: 86%;
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
  Header,
  AddSection,
  ListSection,
  List,
  Option,
  SortSection,
  FlexSection,
  StatusSection,
};
