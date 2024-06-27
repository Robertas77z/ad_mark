package lt.bookbyte.book_byte.controller;

import lt.bookbyte.book_byte.dto.BookDTO;
import lt.bookbyte.book_byte.entity.Book;
import lt.bookbyte.book_byte.entity.Category;
import lt.bookbyte.book_byte.service.BookService;
import lt.bookbyte.book_byte.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;
    private final CategoryService categoryService;

    @Autowired
    public BookController(BookService bookService, CategoryService categoryService) {
        this.bookService = bookService;
        this.categoryService = categoryService;
    }

    @PostMapping
    public ResponseEntity<BookDTO> createBook(@RequestBody BookDTO bookDTO) {
        if (bookDTO.getCategoryId() != null) {
            Optional<Category> categoryOptional = categoryService.getCategoryById(bookDTO.getCategoryId());
            if (categoryOptional.isPresent()) {
                Category category = categoryOptional.get();
                Book book = new Book();
                book.setTitle(bookDTO.getTitle());
                book.setDescription(bookDTO.getDescription());
                book.setIsbn(bookDTO.getIsbn());
                book.setImageUrl(bookDTO.getImageUrl());
                book.setPageCount(bookDTO.getPageCount());
                book.setCategory(category);
                Book createdBook = bookService.saveBook(book);
                bookDTO.setId(createdBook.getId());
                return new ResponseEntity<>(bookDTO, HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookDTO> updateBook(@PathVariable Long id, @RequestBody BookDTO bookDTO) {
        Optional<Book> existingBook = bookService.getBookById(id);
        if (existingBook.isPresent()) {
            Book book = existingBook.get();
            book.setTitle(bookDTO.getTitle());
            book.setDescription(bookDTO.getDescription());
            book.setIsbn(bookDTO.getIsbn());
            book.setImageUrl(bookDTO.getImageUrl());
            book.setPageCount(bookDTO.getPageCount());
            if (bookDTO.getCategoryId() != null) {
                Optional<Category> categoryOptional = categoryService.getCategoryById(bookDTO.getCategoryId());
                if (categoryOptional.isPresent()) {
                    Category category = categoryOptional.get();
                    book.setCategory(category);
                } else {
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
            }
            Book updatedBook = bookService.saveBook(book);
            bookDTO.setId(updatedBook.getId());
            return new ResponseEntity<>(bookDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Optional<Book> book = bookService.getBookById(id);
        return book.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Book>> getBooksByCategoryId(@PathVariable Long categoryId) {
        List<Book> books = bookService.getBooksByCategoryId(categoryId);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }
}