package lt.bookbyte.book_byte.repository;

import lt.bookbyte.book_byte.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByCategoryId(Long categoryId);

    Optional<Book> findByIsbn(String isbn);
}
