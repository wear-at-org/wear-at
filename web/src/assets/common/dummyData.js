const dummyData = {
  login: {
    id: 'test',
    password: '123',
  },
};

export const tipStyleTag = [
  { label: '겨울룩', active: true },
  { label: '여름룩', active: false },
  { label: '가을룩', active: false },
  { label: '빅사이즈', active: false },
  { label: '스몰사이즈', active: false },
];

export const styleTipArray = [
  {
    key: 'styl-1',
    img: 'https://i.pinimg.com/originals/33/8f/92/338f92828ddcc3ff6b78a4847ded8b2e.jpg',
    title: '가을에 입기 좋은 트렌치룩',
    author: '바닐라향하마',
    isCheck: false,
    see: 12345,
    lo: 67890,
    vi: 99999,
  },
  {
    key: 'styl-2',
    img: 'https://pds.joins.com/news/component/htmlphoto_mmdata/201902/04/4e25eb7b-2c32-4741-b274-efacd9135af1.jpg',
    title: '심플한 데일리룩',
    author: '바닐라향하마',
    isBookmark: false,
    see: 0,
    lo: 0,
    vi: 0,
  },
  {
    key: 'styl-3',
    img: 'https://usercontents-d.styleshare.io/images/20428940/700x432',
    title: '심플한 데일리룩',
    author: '바닐라향하마',
    isBookmark: false,
    see: 34534,
    lo: 123,
    vi: 65353,
  },
  {
    key: 'styl-4',
    img: 'https://img4.yna.co.kr/etc/inner/KR/2016/05/10/AKR20160510181100030_01_i_P2.jpg',
    title: '심플한 데일리룩',
    author: '바닐라향하마',
    isBookmark: true,
    see: 325,
    lo: 26456,
    vi: 3435,
  },
  {
    key: 'styl-5',
    img: 'https://cdnweb01.wikitree.co.kr/webdata/editor/202005/20/img_20200520104404_7911aad7.webp',
    title: '심플한 데일리룩',
    author: '바닐라향하마',
    isBookmark: true,
    see: 12,
    lo: 3245,
    vi: 2345,
  },
];

export const replyData = [
  {
    id: 1,
    profile: 'https://mblogthumb-phinf.pstatic.net/20160625_240/bjy0524_146683775176259uj4_JPEG/attachImage_312025754.jpeg?type=w800',
    nickname: '닉네임',
    regDate: '2020.01.01',
    isMe: true,
    content:
      '댓글 내용은 여기에 쓰세요.댓글 내용은 여기에 쓰세요.댓글 내용은 여기에 쓰세요.댓글 내용은 여기에 쓰세요.댓글 내용은 여기에 쓰세요.댓글 내용은 여기에 쓰세요.댓글 내용은 여기에 쓰세요.댓글 내용은 여기에 쓰세요.댓글 내용은 여기에 쓰세요.댓글 내용은 여기에 쓰세요.댓글 내용은 여기에 쓰세요.댓글 내용은 여기에 쓰세요.댓글 내용은 여기에 쓰세요.',
    children: [
      {
        id: 2,
        profile: 'https://mblogthumb-phinf.pstatic.net/20160625_240/bjy0524_146683775176259uj4_JPEG/attachImage_312025754.jpeg?type=w800',
        nickname: '닉네임',
        regDate: '2020.01.01',
        content: '댓글 내용은 여기에 쓰세요.',
        children: [
          {
            id: 3,
            profile: 'https://mblogthumb-phinf.pstatic.net/20160625_240/bjy0524_146683775176259uj4_JPEG/attachImage_312025754.jpeg?type=w800',
            nickname: '닉네임',
            regDate: '2020.01.01',
            content: '댓글 내용은 여기에 쓰세요.',
          },
          {
            id: 4,
            profile: 'https://mblogthumb-phinf.pstatic.net/20160625_240/bjy0524_146683775176259uj4_JPEG/attachImage_312025754.jpeg?type=w800',
            nickname: '닉네임',
            regDate: '2020.01.01',
            content: '댓글 내용은 여기에 쓰세요.',
          },
          {
            id: 5,
            profile: 'https://mblogthumb-phinf.pstatic.net/20160625_240/bjy0524_146683775176259uj4_JPEG/attachImage_312025754.jpeg?type=w800',
            nickname: '닉네임',
            regDate: '2020.01.01',
            content: '댓글 내용은 여기에 쓰세요.',
          },
        ],
      },
      {
        id: 6,
        profile: 'https://mblogthumb-phinf.pstatic.net/20160625_240/bjy0524_146683775176259uj4_JPEG/attachImage_312025754.jpeg?type=w800',
        nickname: '닉네임',
        regDate: '2020.01.01',
        content: '댓글 내용은 여기에 쓰세요.',
        children: [
          {
            id: 7,
            profile: 'https://mblogthumb-phinf.pstatic.net/20160625_240/bjy0524_146683775176259uj4_JPEG/attachImage_312025754.jpeg?type=w800',
            nickname: '닉네임',
            regDate: '2020.01.01',
            content: '댓글 내용은 여기에 쓰세요.',
          },
        ],
      },
    ],
  },
  {
    id: 8,
    profile: 'https://mblogthumb-phinf.pstatic.net/20160625_240/bjy0524_146683775176259uj4_JPEG/attachImage_312025754.jpeg?type=w800',
    nickname: '닉네임',
    regDate: '2020.01.01',
    content: '댓글 내용은 여기에 쓰세요.',
  },
  {
    id: 9,
    profile: 'https://mblogthumb-phinf.pstatic.net/20160625_240/bjy0524_146683775176259uj4_JPEG/attachImage_312025754.jpeg?type=w800',
    nickname: '닉네임',
    regDate: '2020.01.01',
    content: '댓글 내용은 여기에 쓰세요.',
  },
];

export default dummyData;
