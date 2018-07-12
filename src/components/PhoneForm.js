import React, { Component } from 'react';

class PhoneForm extends Component {
    state = {
        name: '',
        phone: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {

        // 원래 이벤트가 해야 하는 작업을 방지시킨다는 의미입니다. 
        // 원래는 form 에서 submit 이 발생하면 페이지를 다시 불러오게 되는데요, 
        // 그렇게 되면 우리가 지니고있는 상태를 다 잃어버리게 되니까 이를 통해서 방지해주었습니다.
        e.preventDefault();

        // props 로 받은 onCreate 함수를 호출하고, 상태 값을 onCreate 를 통하여 부모에게 전달
        this.props.onCreate(this.state);

        // 상태 초기화
        this.setState({
            name: '',
            phone: ''
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    placeholder="이름"
                    value={this.state.name}
                    onChange={this.handleChange}
                    name="name"
                />
                <input
                    placeholder="전화번호"
                    value={this.state.phone}
                    onChange={this.handleChange}
                    name="phone"
                />
                <button type="submit">등록</button>
            </form>
        );
    }
}

export default PhoneForm;