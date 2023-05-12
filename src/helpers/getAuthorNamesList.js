export const getAuthorsNamesList = (authorIdList, authors) => {
    return authorIdList.map((authorId) => {
        const author = authors?.find((author) => author.id === authorId);
        return author.name || '';
    });
};
