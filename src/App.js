import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm'
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {

  //id는
  //컴포넌트의 일반 클래스 내부 변수로서 선언
  //컴포넌트 내부에서 필요한 값 중에서, 
  //렌더링 되는것과 상관이 없는것들은 굳이 state 에 넣어줄 필요가 없습니다.
  id = 2

  state = {
    information: [
      {
        id: 0,
        name: '고준희',
        phone: '010-1111-2222'
      },
      {
        id: 1,
        name: '테스트',
        phone: '010-3333-4444'
      }
    ],
    keyword: ''
  }

  handleChange = (e) => {
    this.setState({
      keyword: e.target.value
    })
  }

  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({
        id: this.id++,
        ...data
      })
    })
  }

  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    })
  }

  // 이 함수는 id 와 data 라는 파라미터를 받아와서 필요한 정보를 업데이트 해줍니다. 
  // 이 handleUpdate 는 PhoneInfoList 의 onUpdate 로 전달해주세요.
  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(
        info => id === info.id
          ? { ...info, ...data }  // 새 객체를 만들어서 기존의 값과 전달받은 data 을 덮어씀
          : info //기존의 값은 그대로 유지
      )
    })
  }

  render() {
    console.log('app rendering')
    const { information, keyword } = this.state;
    const filteredList = information.filter(
      info => info.name.indexOf(keyword) !== -1
    );

    // App 컴포넌트의 상태가 업데이트 되면, 컴포넌트의 리렌더링이 발생하게 되고, 
    // 컴포넌트가 리렌더링되면 그 컴포넌트의 자식 컴포넌트도 리렌더링됩니다 
    // 검색어 input 을 수정한다음에 콘솔을 확인해봅시다.
    // App 이 리렌더링됨에 따라 PhoneInfoList 도 리렌더링이 되고 있죠. 
    // 물론, 실제로 변화가 일어나진 않으니 지금은 Virtual DOM 에만 리렌더링 합니다. 
    // 지금의 상황에는 별로 큰 문제가 되지 않는데, 
    // 리스트 내부의 아이템이 몇백개, 몇천개가 된다면 
    // 이렇게 Virtual DOM 에 렌더링 하는 자원은 아낄 수 있으면 아끼는게 좋습니다.
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate} />
        <p>
          <input
            placeholder="검색할 이름을 입력하세요.."
            onChange={this.handleChange}
            value={keyword}
          />
        </p>
        <hr />
        <PhoneInfoList
          data={filteredList}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate} />
      </div>
    );
  }
}

export default App;