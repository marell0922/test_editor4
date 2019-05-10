import * as React from 'react';
import Stringify from 'json-stable-stringify';
import { cloneDeep } from 'lodash';
// lodash
// lterating arrays, objects & strings
// manipulating & testing values
// creating composite function

export const Presence = ({ dataFn, id }) => {
  //Hook
  //useState : 함수형에서 상태관리시 이용.
  //prsence :value , setPresence : function
  const [presence, setPresence] = React.useState({});

  //userEffect : 컴포넌트가 render()할때 특정 작업을 수행.
  // 기본 형태  : useEffect(function, specialValue)
  //  - mount 될 때만 실행 : specialValue에 [] 삽입
  //  - 특정 값 업데이트시 실행 : specialValue에 [특정값] 삽입
  //  - unmount 되기 전 or update 되기 전 : function 안에 뒷정리 함수 (cleanup) 반환
      // unmount 시만 : cleanup function + specialValue에 [] 삽입
  React.useEffect(
    () => {
      const update = e => setPresence(cloneDeep(dataFn.doc.presence));
      dataFn.doc.on('presence', update);

      return () => dataFn.doc.removeListener('presence', update); //cleanup function
    },
    [id] //special value 
  );

  return (
    <div>
      {Object.values(presence).map(x => (
        <li key={x.u}>
          <b>{x.u}</b> - {Stringify(x)}
        </li>
      ))}
    </div>
  );
};

// +++ Hook
// createContext, useContext [theme 설정 가능. - css가능 ]
// ex) background : useContext(createContext('black'))

// useMemo [내부 연산 최적화]
// ex) useMemo(function, [standard value]) : standard value 변경시, functiono 실행.

// useCallback [event hadler 필요시에만 생성가능]
// * : rerendering 시 계속 생성 방지.
// ex)
//const onChange = useCallback(e => {
//  setNumber(e.target.value);
//}, []); // special value

// useRef
