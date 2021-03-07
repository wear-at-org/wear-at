import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <ul>
        <li>
          <Link to="/">서비스소개</Link>
        </li>
        <li>
          <Link to="/">이용약관</Link>
        </li>
        <li>
          <Link to="/">개인정보처리방침</Link>
        </li>
        <li>
          <Link to="/">고객센터</Link>
        </li>
      </ul>
      <div>
        <p className="copy-font">
          Copyright © 2020 SCOT All rights reserved.
        </p>
      </div>
    </footer>
  );
}
