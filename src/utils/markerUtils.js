import {
    IMAGE_URL_BASE,
    IMAGE_URL_QUERY_LARGE,
    IMAGE_URL_QUERY_SMALL,
} from '@constants/constants';

export const formatImageUrl = ({ id, size }) => {
    if (size === 'small') {
        return IMAGE_URL_BASE + id + IMAGE_URL_QUERY_SMALL;
    }

    return IMAGE_URL_BASE + id + IMAGE_URL_QUERY_LARGE;
};
