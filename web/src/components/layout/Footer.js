import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div>
        <p className="copy-font">(주)웨어앳 © 2021 Wear’at. All rights reserved.</p>
      </div>
      <ul>
        <li>
          <Link to="/">이용약관</Link>
        </li>
        <li className="bold">
          <Link to="/">개인정보처리방침</Link>
        </li>
        <li>
          <Link to="/">고객센터</Link>
        </li>
        <li>
          <Link to="/">제휴/광고문의</Link>
        </li>
      </ul>
    </footer>
  );
}
