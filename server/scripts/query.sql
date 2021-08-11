use wearat;

truncate table query_category;
truncate table query_item;
truncate table query;


INSERT INTO query (id, title, ui_type)
VALUES (1, '어디에서 입을 옷이 필요하신가요?', 'U_LIST_ITEMS');

INSERT INTO query_item (category_id, query_id, title, subtitle, url)
VALUES (NULL, 1, '비지니스룩', '회사에서', 'icon://step1-1'),
       (NULL, 1, '캠퍼스룩', '학교에서', 'icon://step1-2'),
       (NULL, 1, '리조트룩', '여행지에서', 'icon://step1-3'),
       (NULL, 1, '홈웨어', '집에서', 'icon://step1-4'),
       (NULL, 1, '스포츠웨어', '운동할 때', 'icon://step1-5'),
       (NULL, 1, '타운웨어', '쇼핑, 간단한 모임에서', 'icon://step1-6'),
       (NULL, 1, '소셜웨어', '데이트나 파티에서', 'icon://step1-7'),
       (NULL, 1, '포멀웨어', '결혼식이나 면접에서', 'icon://step1-8')
;

INSERT INTO query (id, title, ui_type)
VALUES (2, '좋아하는 스타일을 3~10개 사이로 선택해주세요.', 'U_LIST_IMAGES');
select * from query;
INSERT INTO query_item (category_id, query_id, title, subtitle, url)
VALUES (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/01.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/02.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/03.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/04.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/05.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/06.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/07.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/08.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/09.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/10.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/11.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/12.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/13.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/14.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/15.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/16.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/17.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/18.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/19.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/20.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/21.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/22.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/23.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/24.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/25.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/26.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/27.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/28.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/29.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/30.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/31.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/32.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/33.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/34.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/35.jpg'),
       (NULL, 2, '', '', 'https://wearat.s3.ap-northeast-2.amazonaws.com/styletest/36.jpg')
;

INSERT INTO query (id, title, ui_type)
VALUES (3, '추천 받을 가격대를 골라주세요.', 'U_LIST_2DEP_ITEMS');

INSERT INTO query_category (id, query_id, title, subtitle, url)
VALUES (1, 3, '아우터', '', 'icon://step3-1'),
       (2, 3, '상의', '', 'icon://step3-2'),
       (3, 3, '하의', '', 'icon://step3-3'),
       (4, 3, '원피스', '', 'icon://step3-4')
;

INSERT INTO query_item (category_id, query_id, title, subtitle, url)
VALUES (1, 3, '가격대보다는 옷에 더 신경써주세요.', '', ''),
       (1, 3, '중간 가격대(10-30만원대)로 추천해주세요.', '', ''),
       (1, 3, '저렴한 옷 위주로 추천해주세요.', '', ''),
       (1, 3, '이건 추천 안받을게요.', '', ''),
       (2, 3, '가격대보다는 옷에 더 신경써주세요.', '', ''),
       (2, 3, '중간 가격대(10-30만원대)로 추천해주세요.', '', ''),
       (2, 3, '저렴한 옷 위주로 추천해주세요.', '', ''),
       (2, 3, '이건 추천 안받을게요.', '', ''),
       (3, 3, '가격대보다는 옷에 더 신경써주세요.', '', ''),
       (3, 3, '중간 가격대(10-30만원대)로 추천해주세요.', '', ''),
       (3, 3, '저렴한 옷 위주로 추천해주세요.', '', ''),
       (3, 3, '이건 추천 안받을게요.', '', ''),
       (4, 3, '가격대보다는 옷에 더 신경써주세요.', '', ''),
       (4, 3, '중간 가격대(10-30만원대)로 추천해주세요.', '', ''),
       (4, 3, '저렴한 옷 위주로 추천해주세요.', '', ''),
       (4, 3, '이건 추천 안받을게요.', '', '')
;

INSERT INTO query (id, title, ui_type)
VALUES (4, '신체 중 자신있게 노출하고 싶은 곳이 있다면 모두 선택해주세요.', 'U_LIST_BODY');

INSERT INTO query (id, title, ui_type)
VALUES (5, '신체 중 노출하기 부담스러운 부분이 있다면 모두 선택해주세요.', 'U_LIST_BODY');

INSERT INTO query_item (category_id, query_id, title, subtitle, url)
VALUES (NULL, 4, '팔', '', ''),
       (NULL, 4, '어깨', '', ''),
       (NULL, 4, '가슴골', '', ''),
       (NULL, 4, '배', '', ''),
       (NULL, 4, '등', '', ''),
       (NULL, 4, '상체', '', ''),
       (NULL, 4, '엉덩이', '', ''),
       (NULL, 4, '하체', '', ''),
       (NULL, 5, '팔', '', ''),
       (NULL, 5, '어깨', '', ''),
       (NULL, 5, '가슴골', '', ''),
       (NULL, 5, '배', '', ''),
       (NULL, 5, '등', '', ''),
       (NULL, 5, '상체', '', ''),
       (NULL, 5, '엉덩이', '', ''),
       (NULL, 5, '하체', '', '')
;

INSERT INTO query (id, title, subtitle, ui_type)
VALUES (
           6,
           '웨어앳의 AI가 회원님의 스타일을 정확히 파악할 수 있도록, 최근 사진 중 옷이 잘 보이는 사진으로 3장 이상을 올려주세요.',
           '업로드된 사진은 회원님을 위한 스타일테스트 분석 및 결과 제공 목적으로만 사용됩니다.',
           'U_UPLOAD_IMAGE'
       );