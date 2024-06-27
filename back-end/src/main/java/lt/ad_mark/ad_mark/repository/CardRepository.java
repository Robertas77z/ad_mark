package lt.ad_mark.ad_mark.repository;

import lt.ad_mark.ad_mark.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CardRepository extends JpaRepository<Card, Long> {
    List<Card> findByCategoryId(Long categoryId);

    Optional<Card> findByIsbn(String isbn);
}
