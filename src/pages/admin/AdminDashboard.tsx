import React, {useEffect, useState} from 'react';
import { RiBookShelfFill } from "react-icons/ri";
import { FaAddressBook, FaHome } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Book } from "../../types";
import { getBooks } from "../../api/api";
import adminApi from "../../api/adminApi";

const AdminDashboard: React.FC = () => {
    const [isHome, setIsHome] = useState(true);
    const [isBooks, setIsBooks] = useState(false);
    const [isReq, setIsReq] = useState(false);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<string>('home');
    const [books, setBooks] = useState<Book[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [showModal, setShowModal] = useState(false);

    const handleNavClick = (tab: string) => setActiveTab(tab);

    const HomeToggle = () => {
        setIsHome(true); setIsBooks(false); setIsReq(false);
    };
    const BooksToggle = () => {
        setIsHome(false); setIsBooks(true); setIsReq(false);
    };
    const ReqToggle = () => {
        setIsHome(false); setIsBooks(false); setIsReq(true);
    };

    const fetchBooks = async (page = 1) => {
        try {
            const response = await getBooks({ page, limit: 4 });
            setBooks(response.data.books);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    useEffect(() => { fetchBooks(currentPage); }, [currentPage]);

    const openEditModal = (book: Book) => {
        setSelectedBook(book);
        setShowModal(true);
    };

    const closeEditModal = () => {
        setShowModal(false);
        setSelectedBook(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedBook) {
            setSelectedBook({ ...selectedBook, [e.target.name]: e.target.value });
        }
    };

    const handleSave = async () => {
        if (selectedBook) {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found, cannot update book");
                    alert("Unauthorized: Please log in again.");
                    navigate("/login"); // Or redirect
                    return;
                }

                console.log("Sending update request with token:", token);
                await adminApi.updateBook(selectedBook.book_id, selectedBook, token);

                closeEditModal();
                fetchBooks(currentPage); // Refresh book list
            } catch (error) {
                console.error("Failed to update book:", error);
                alert("Failed to update book. Please check your permissions.");
            }
        }
    };


    return (
        <div className="bg-brown-0 min-h-screen flex items-center justify-center">
            <div className="bg-cream-0 flex-1 flex space-y-5 flex-row lg:space-x-10 max-w-6xl sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl h-full">

            {/* Navigation */}
                <div className="bg-brown-0 px-2 lg:px-4 py-2 lg:py-10 sm:rounded-xl flex lg:flex-col justify-between">
                    <nav className="flex items-center flex-row space-x-2 lg:space-x-0 lg:flex-col lg:space-y-2">
                        <a
                            className={`text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-darkBR-0 hover:text-white smooth-hover ${activeTab === 'home' ? 'bg-darkBR-0 text-white' : ''}`}
                            href="#"
                            onClick={() => {
                                handleNavClick('home');
                                HomeToggle();}}
                        >
                            <FaHome className="h-8 w-8" />
                        </a>

                        <a
                            className={`text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-darkBR-0 hover:text-white smooth-hover ${activeTab === 'books' ? 'bg-darkBR-0 text-white' : ''}`}
                            href="#"
                            onClick={() => {
                                handleNavClick('books');
                                BooksToggle();}}
                        >
                            <RiBookShelfFill className="h-8 w-8" />
                        </a>
                    </nav>

                    <div className="flex items-center flex-row space-x-2 lg:space-x-0 lg:flex-col lg:space-y-2">
                        <a
                            className={`text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-darkBR-0 hover:text-white smooth-hover ${activeTab === 'requests' ? 'bg-darkBR-0 text-white' : ''}`}
                            href="#"
                            onClick={() => {
                                handleNavClick('requests');
                                ReqToggle();
                            }}
                        >
                            <FaAddressBook className="h-8 w-8" />
                        </a>

                        <a
                            className="text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-darkBR-0 hover:text-white smooth-hover"
                            href="#"
                            onClick={() => navigate("/")}
                        >
                            <RiLogoutCircleLine className="h-8 w-8" />
                        </a>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 px-2 sm:px-0 h-full flex flex-col">
                <div className="flex justify-between items-center flex-grow">
                        {isHome && (
                            <div className="flex flex-col w-full h-full flex-grow">
                                <h3 className="text-3xl font-extralight text-brown-0">Admin Dashboard</h3>

                                <h4 className="text-xl font-extralight text-brown-0 text-center mt-12">What would you like to do?</h4>

                                <div className="grid grid-cols-2 w-full h-full flex-grow items-center justify-center">
                                    <div className="pb-2 px-4 pt-4 w-full h-full flex cursor-pointer" onClick={() => {
                                        handleNavClick('books');
                                        BooksToggle();
                                    }}>
                                        <label className="flex flex-col justify-center items-center p-4 border-2 border-brown-0 cursor-pointer w-full h-full hover:bg-darkBR-0 hover:text-cream-0"
                                               htmlFor="radio_1">
                                            <span className="text-xs font-semibold uppercase font-pd">Add / Edit / Delete Books</span>
                                            <span className="text-xl font-bold mt-2">Manage book inventory</span>
                                        </label>
                                    </div>

                                    <div className="pb-2 px-4 pt-4 w-full h-full flex cursor-pointer" onClick={() => {
                                        handleNavClick('requests');
                                        ReqToggle();
                                    }}>
                                        <label className="flex flex-col justify-center items-center p-4 border-2 border-brown-0 cursor-pointer w-full h-full
                                        hover:bg-darkBR-0 hover:text-cream-0"
                                               htmlFor="radio_2">
                                            <span className="text-xs font-semibold uppercase font-pd">Approve / Deny Book Requests</span>
                                            <span className="text-xl font-bold mt-2">View book requests</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {isBooks && (
                            <div className="w-full flex flex-col">
                                <div className="flex flex-col">
                                    <div className="overflow-x-auto shadow-md sm:rounded-lg">
                                        <div className="inline-block min-w-full align-middle">
                                            <div className="overflow-hidden">
                                                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-darkBR-0">
                                                    <thead className="bg-gray-100 dark:bg-brown-0">
                                                    <tr>
                                                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                            Book Title
                                                        </th>
                                                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                            Genre
                                                        </th>
                                                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                            Author
                                                        </th>
                                                        <th scope="col" className="p-4">
                                                            <span className="sr-only">Edit</span>
                                                        </th>
                                                        <th scope="col" className="p-4">
                                                            <span className="sr-only">Delete</span>
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-brown-0 dark:divide-darkBR-0">
                                                    {books.map((book) => (
                                                        <tr key={book.book_id} className="hover:bg-gray-100 dark:hover:bg-darkBR-0">
                                                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {book.title}
                                                            </td>
                                                            <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                                                                {book.genre}
                                                            </td>
                                                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {book.author}
                                                            </td>
                                                            <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap" onClick={() => openEditModal(book)} >
                                                                <a href="#" className="text-yellow-0 hover:underline">Edit</a>
                                                            </td>
                                                            <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                                                <a href="#" className="text-red-600 hover:underline">Delete</a>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pagination Placeholder (Optional) */}
                                    <div className="mt-4">
                                        <button
                                            className="px-4 py-2 bg-gray-300 rounded"
                                            disabled={currentPage <= 1}
                                            onClick={() => setCurrentPage(currentPage - 1)}
                                        >
                                            Previous
                                        </button>
                                        <span className="mx-2">Page {currentPage} of {totalPages}</span>
                                        <button
                                            className="px-4 py-2 bg-gray-300 rounded"
                                            disabled={currentPage >= totalPages}
                                            onClick={() => setCurrentPage(currentPage + 1)}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>

                                {showModal && selectedBook && (
                                    <div className="py-12 bg-cream-0 bg-opacity-50 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center">
                                        <div className="bg-white p-8 shadow-lg rounded w-1/2 h-1/2 overflow-y-auto">
                                            <h1 className="text-xl font-bold mb-4">Edit Book</h1>

                                            {/* Book ID - Read-only */}
                                            <label className="block text-sm font-bold">Book ID</label>
                                            <input name="book_id" value={selectedBook.book_id} readOnly
                                                   className="w-full p-2 border rounded mb-4 bg-gray-100 cursor-not-allowed" />

                                            {/* Title */}
                                            <label className="block text-sm font-bold">Title</label>
                                            <input name="title" value={selectedBook.title} onChange={handleInputChange}
                                                   className="w-full p-2 border rounded mb-4" />

                                            {/* Author */}
                                            <label className="block text-sm font-bold">Author</label>
                                            <input name="author" value={selectedBook.author} onChange={handleInputChange}
                                                   className="w-full p-2 border rounded mb-4" />

                                            {/* Genre */}
                                            <label className="block text-sm font-bold">Genre</label>
                                            <input name="genre" value={selectedBook.genre || ''} onChange={handleInputChange}
                                                   className="w-full p-2 border rounded mb-4" />

                                            {/* Publication Date */}
                                            <label className="block text-sm font-bold">Publication Date</label>
                                            <input name="publication_date" type="date" value={selectedBook.publication_date || ''}
                                                   onChange={handleInputChange} className="w-full p-2 border rounded mb-4" />

                                            {/* Cover Image URL */}
                                            <label className="block text-sm font-bold">Cover Image URL</label>
                                            <input name="cover_image" value={selectedBook.cover_image || ''} onChange={handleInputChange}
                                                   className="w-full p-2 border rounded mb-4" />

                                            {/* Synopsis - Textarea */}
                                            <label className="block text-sm font-bold">Synopsis</label>
                                            <textarea name="synopsis" value={selectedBook.synopsis || ''} onChange={handleInputChange}
                                                      rows={4} className="w-full p-2 border rounded mb-4"></textarea>

                                            {/* Owner ID - Read-only */}
                                            <label className="block text-sm font-bold">Owner ID</label>
                                            <input name="owner_id" value={selectedBook.owner_id} readOnly
                                                   className="w-full p-2 border rounded mb-4 bg-gray-100 cursor-not-allowed" />

                                            {/* Status */}
                                            <label className="block text-sm font-bold">Status</label>
                                            <select name="status" value={selectedBook.status} onChange={handleInputChange}
                                                    className="w-full p-2 border rounded mb-4">
                                                <option value="Available">Available</option>
                                                <option value="Borrowed">Borrowed</option>
                                                <option value="Requested">Requested</option>
                                            </select>

                                            {/* Borrowed Count */}
                                            <label className="block text-sm font-bold">Borrowed Count</label>
                                            <input name="borrowedCount" type="number" value={selectedBook.borrowedCount} onChange={handleInputChange}
                                                   className="w-full p-2 border rounded mb-4" />

                                            {/* Buttons */}
                                            <div className="flex justify-end space-x-3">
                                                <button onClick={handleSave} className="bg-brown-0 text-white px-4 py-2 rounded">Save</button>
                                                <button onClick={closeEditModal} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
