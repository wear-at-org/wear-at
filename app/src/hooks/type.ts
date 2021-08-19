export interface StyleTestProps {
  content: Array<any>;
  totalElements: number;
  totalPages: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
  };
}

export interface categoriesProps {
  id: string;
  title: string;
  imageUrl: string;
  answer?: string | boolean;
  queryId: string;
}

export const initCategoriesProps: categoriesProps = {
  id: "",
  title: "",
  imageUrl: "",
  answer: false,
  queryId: "",
}


export interface styleTestItemProps {
  id: string;
  title: string;
  imageUrl?: string;
  categoryId: string;
  answer?: string | boolean;
  queryId: string;
  subtitle?: string;
  url?: string;
}

export const initStyleTestItemProps: styleTestItemProps = {
  id: "",
  title: "",
  imageUrl: "",
  categoryId: "",
  answer: false,
  queryId: "",
}

export interface styleTestListProps {
  id: string;
  title: string;
  uiType: string;
  queryItems: styleTestItemProps[];
  queryCategories: categoriesProps[];
}

export const initStyleTestListProps: [styleTestListProps] = [{
  id: "",
  title: "",
  uiType: "",
  queryItems: [{ ...initStyleTestItemProps }],
  queryCategories: [{...initCategoriesProps}]
  }]

export interface apiAnswerType {
    queryItemId: string;
  queryId: string;
        answer: string | boolean;
}

export interface makeAnswersType {
  id: string;
  queryId: string;
  answer: string | boolean;
}

export const initMakeAnswersType = {
  id: "",
  queryId: "",
  answer: false,
}


export interface styleTestFrontItemProps {
  type: string;
  items: [styleTestListProps];
}

export const initalStyleTestFrontItem: [styleTestFrontItemProps] = [
      {
        type: '',
        items: [
          {
            id: '',
            title: '',
            uiType: '',
            queryItems: [
              {
                id: '',
                title: '',
                imageUrl: '',
                categoryId: '',
                answer: '',
                queryId: '',
              },
            ],
            queryCategories: [{id: '', title: '', imageUrl: '', answer: '', queryId: ''}],
          },
        ],
      },
]
    
export interface reciveProps {
  item: styleTestListProps[],
  goNextStep: () => void,
  activeIndex: number,
  apiId: string,
  hooks: () => {}
}