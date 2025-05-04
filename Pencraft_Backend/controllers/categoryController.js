const Category = require('../models/category');



const defaultCategories =
        [
            {
                "name": "Fiction",
                "description": "Discussions and posts related to fictional writing, including short stories, novels, and fan fiction.",
                "imageUrl": "/images/categories/fiction.jpg"
            },
            {
                "name": "Non-Fiction",
                "description": "For writers and readers of non-fiction, including essays, biographies, memoirs, and historical accounts.",
                "imageUrl": "/images/categories/non-fiction.jpg"
            },
            {
                "name": "Poetry",
                "description": "A place to share and critique poetry, discuss forms and styles, and connect with other poets.",
                "imageUrl": "/images/categories/poetry.jpg"
            },
            {
                "name": "Science Fiction & Fantasy",
                "description": "Explore worlds of imagination. Discussions around sci-fi and fantasy writing, world-building, and speculative fiction.",
                "imageUrl": "/images/categories/science-fiction-fantasy.jpg"
            },
            {
                "name": "Mystery & Thriller",
                "description": "Uncover the suspenseful and the enigmatic. Share and discuss writings that keep readers on edge.",
                "imageUrl": "/images/categories/mystery-thriller.jpg"
            },
            {
                "name": "Romance",
                "description": "All about love and passion. A place for romance writers to share their work and discuss the genre.",
                "imageUrl": "/images/categories/romance.jpg"
            },
            {
                "name": "Horror",
                "description": "For those who like to inspire fear through their writing. Share your most chilling stories.",
                "imageUrl": "/images/categories/horror.jpg"
            },
            {
                "name": "Young Adult",
                "description": "Writing for young adults and teenagers. Discuss themes, characters, and trends in YA literature.",
                "imageUrl": "/images/categories/young-adult.jpg"
            },
            {
                "name": "Children's Literature",
                "description": "A place to discuss the craft of writing for children, from picture books to middle-grade novels.",
                "imageUrl": "/images/categories/childrens-literature.jpg"
            },
            {
                "name": "Historical Fiction",
                "description": "Combining the accuracy of history with the creativity of storytelling. Share your journeys into the past.",
                "imageUrl": "/images/categories/historical-fiction.jpg"
            },
            {
                "name": "Creative Nonfiction",
                "description": "For work that tells true stories with the style of narrative writing. Essays, personal narratives, travel writing, and more.",
                "imageUrl": "/images/categories/creative-nonfiction.jpg"
            },
            {
                "name": "Technical Writing",
                "description": "Discussion around the precise and clear communication of technical information and instructions.",
                "imageUrl": "/images/categories/technical-writing.jpg"
            },
            {
                "name": "Academic Writing",
                "description": "A place for scholarly and educational writing, discussions on research papers, theses, and dissertations.",
                "imageUrl": "/images/categories/academic-writing.jpg"
            },
            {
                "name": "Blogging",
                "description": "For bloggers and online writers. Share tips, strategies, and experiences.",
                "imageUrl": "/images/categories/blogging.jpg"
            },
            {
                "name": "Journaling",
                "description": "A space to discuss personal writing, life documentation, and reflective practices.",
                "imageUrl": "/images/categories/journaling.jpg"
            },
        ];

const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newCategory = new Category({ name, description });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Failed to create category', error: error.message });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Failed to fetch categories', error: error.message });
    }
};

const updateCategory = async (req, res) => {
    const { id, name, description } = req.params;
    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Failed to update category', error: error.message });
    }
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Failed to delete category', error: error.message });
    }
};

const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error('Error fetching category by ID:', error);
        res.status(500).json({ message: 'Failed to fetch category', error: error.message });
    }
};


async function addDefaultCategories() {
    try {
    for (const defaultCategory of defaultCategories) {
        const categoryExists = await Category.findOne({ name: defaultCategory.name }).exec();

        if (!categoryExists) {
        const newCategory = new Category(defaultCategory);
        await newCategory.save();
        console.log(`Category ${defaultCategory.name} added to the database.`);
        } else {
        console.log(`Category ${defaultCategory.name} already exists.`);
        }
    }

    console.log('All default categories checked/added.');
    } catch (error) {
    console.error('Error adding default categories:', error);
    }
}


module.exports = { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory, addDefaultCategories };
