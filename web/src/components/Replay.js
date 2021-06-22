import React, { useState, useEffect } from 'react';
import { replyData } from 'assets/common/dummyData';
import ReplayItem from './ReplayItem';

const Replay = ({ list }) => {
  const [replayArray, setReplayArray] = useState([]);
  useEffect(() => {
    setReplayArray(drawRepleArray(replyData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const drawRepleArray = (arr) => {
    let result = [];
    arr.forEach((value) => {
      const forResult = makeReple(value, 0);
      result = result.concat(forResult);
    });

    return result;
  };

  const makeReple = (reple, index) => {
    index++;
    let reslutArr = [];
    if (reple.children) {
      reple.depth = index;
      reple.replayStatus = true;
      reslutArr.push(reple);
      reple.children.forEach((val) => {
        const result = makeReple(val, index);
        reslutArr = reslutArr.concat(result);
      });
    } else {
      reple.depth = index;
      reple.replayStatus = false;
      reslutArr.push(reple);
    }

    return reslutArr;
  };

  return (
    <div className="replay-wrap">
      <div className="btn-container">
        <div className="btn-style2 narrow">
          <p className="btn-font small">
            댓글 <span className="color-blue">{replayArray.length}</span>
          </p>
        </div>

        <div className="btn-style2 small">
          <p className="btn-font small">목록</p>
        </div>
      </div>

      {replayArray.map((item, index) => {
        return <ReplayItem key={'replay-' + index} item={item} />;
      })}

      <div className={`save-btn-container`}>
        <textarea className="textarea-style" placeholder="댓글을 남겨보세요."></textarea>
        <div className="reg-btn">등록</div>
      </div>
    </div>
  );
};

export default Replay;
