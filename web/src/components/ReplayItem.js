import React from 'react';
import margio from 'assets/img/mario.jpg';
import dot from 'assets/img/dot.png';

const ReplayItem = ({ item }) => {
  return (
    <div className={`mb24 ${item.isMe ? 'me' : ''}`} style={{ paddingLeft: (item.depth - 1) * 10 }}>
      <div className={`replay-container`}>
        <div className="left-contnet">
          <div className="info-img">
            <img src={item.profile} alt="" />
          </div>
          <div className="text-wrap">
            <div className="top-container">
              <h5 className="small mr10">{item.nickname}</h5>
              <h6 className="color-grayAEAE">{item.regDate}</h6>
            </div>
            <h5 className="small">{item.content}</h5>
          </div>
        </div>

        <div className="re-replay-container">
          <div className="anser">
            <p>{item.isMe ? '수정' : '답글'}</p>
          </div>
          <div className="dot-container">
            <img src={dot} alt="" />
            <div className={`dot-mod-item`}>
              <p>{item.isMe ? '수정' : '신고'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`save-btn-container pr20 ${item.replayStatus ? 'show-block' : 'hidden'}`} style={{ paddingLeft: item.depth * 20 }}>
        <div className="d-flex x-eq mb16">
          <div className="d-flex y-center">
            <div className="info-img">
              <img src={margio} alt="" />
            </div>
            <h5 className="small bold mr10">본인닉네임</h5>
            <h6 className="color-grayAEAE">2020.01.01</h6>
          </div>

          <div className="re-replay-container">
            <div className="anser">
              <p className={`${item.isMe ? 'color-grayAEAE' : 'color-red'}`}>{item.isMe ? '수정 취소' : '답글 취소'}</p>
            </div>
            <div className="dot-container">
              <img src={dot} alt="" />
            </div>
          </div>
        </div>
        <textarea className="textarea-style" placeholder="댓글을 남겨보세요."></textarea>
        <div className="reg-btn pr20">등록</div>
      </div>
    </div>
  );
};

export default ReplayItem;
