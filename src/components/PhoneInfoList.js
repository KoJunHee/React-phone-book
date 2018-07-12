import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo'

//여러개의 PhoneInfo 컴포넌트들을 보여줍니다.
class PhoneInfoList extends Component {

    static defaultProps = {
        data: [],
        onRemove: () => console.warn('onRemove not defined'),
        onUpdate: () => console.warn('onUpdate not defined')
    }

    // 낭비되는 자원을 아끼기 위해 구현. 
    // 다음 받아올 data 가 현재 data 랑 다른 배열일 때 true 로 설정
    // 그러면 이제 변화가 필요하지 않을 때는 render 함수가 호출되지 않게 됩니다.
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.data !== this.props.data;
    }

    // 이 컴포넌트에서는 data 라는 배열을 가져와서 map 을 통하여 JSX 로 변환을 해줍니다. 
    // 이 과정에서, key 라는 값도 설정이 되었는데요, 
    // 여기서 key 는 리액트에서 배열을 렌더링을 할 때 꼭 필요한 값입니다. 
    // 리액트는 배열을 렌더링 할 때 값을 통하여 업데이트 성능을 최적화하는데요

    // key 를 배열의 index 값으로 사용하는게 아니라, 
    // 우리가 데이터를 추가 할 때마다 고정적인 고유 값을 부여해주면, 
    // 리액트가 변화를 감지해내고 업데이트를 하게 될 떄 조금 더 똑똑하게 처리 할 수 있게됩니다.
    render() {  
        console.log('render PhoneInfoList');
        const { data, onRemove, onUpdate } = this.props;
        const list = data.map(
            info => (<PhoneInfo
                key={info.id}
                info={info}
                onRemove={onRemove}
                onUpdate={onUpdate}
            />)
        );

        return (
            <div>
                {list}
            </div>
        );
    }
}

export default PhoneInfoList;


