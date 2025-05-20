import parse from 'html-react-parser';

export const parseHTML = (str = '') => {
  const parsed = parse(str || '')
  return parsed
}


