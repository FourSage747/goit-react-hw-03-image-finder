const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38858047-0e9bab85a13771b942d481ede';


export const searchImages = (searchWord, page) => {
    return fetch(`${BASE_URL}?q=${searchWord}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
}