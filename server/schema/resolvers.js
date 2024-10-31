const Author = require('../collections/authors');

const resolvers = {
    // ({name: "name1", id: "name1", age: 12})
    Query: {
        author: async (_, args) => Author.findById(args.id),
        authors:  async () => Author.find({}),
        // author: (_, args) => ({name: "name1", id: "name1", age: 12})
    },
    Mutation: {
        addAuthor: (_, args) => {
            const author = new Author({
                name: args.name,
                age: args.age,
            });
            return author.save();
        },
    },
};

module.exports = resolvers;
