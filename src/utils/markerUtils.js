import { IMAGE_URL_BASE, IMAGE_URL_QUERY } from '@app/constants';

export const formatImageUrl = (id) => {
    return IMAGE_URL_BASE + id + IMAGE_URL_QUERY;
};
