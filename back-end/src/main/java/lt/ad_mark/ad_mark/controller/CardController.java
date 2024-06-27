package lt.ad_mark.ad_mark.controller;

import lt.ad_mark.ad_mark.service.CardService;
import lt.ad_mark.ad_mark.service.CategoryService;
import lt.ad_mark.ad_mark.service.CommentService;
import lt.ad_mark.ad_mark.dto.CardDTO;
import lt.ad_mark.ad_mark.dto.CommentDTO;
import lt.ad_mark.ad_mark.entity.Card;
import lt.ad_mark.ad_mark.entity.Category;
import lt.ad_mark.ad_mark.entity.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/cards")
public class CardController {

    private final CardService cardService;
    private final CategoryService categoryService;

    private final CommentService commentService;

    @Autowired
    public CardController(CardService cardService, CategoryService categoryService, CommentService commentService) {
        this.cardService = cardService;
        this.categoryService = categoryService;
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity<CardDTO> createCard(@RequestBody CardDTO cardDTO) {
        if (cardDTO.getCategoryId() != null) {
            Optional<Category> categoryOptional = categoryService.getCategoryById(cardDTO.getCategoryId());
            if (categoryOptional.isPresent()) {
                Category category = categoryOptional.get();
                Card card = new Card();
                card.setTitle(cardDTO.getTitle());
                card.setDescription(cardDTO.getDescription());
                card.setIsbn(cardDTO.getIsbn());
                card.setImageUrl(cardDTO.getImageUrl());
                card.setPageCount(cardDTO.getPageCount());
                card.setPrice(cardDTO.getPrice());   // naujas laukas
                card.setCity(cardDTO.getCity());     // naujas laukas
                card.setCategory(category);
                Card createdCard = cardService.saveCard(card);
                cardDTO.setId(createdCard.getId());
                return new ResponseEntity<>(cardDTO, HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<CardDTO> updateCard(@PathVariable Long id, @RequestBody CardDTO cardDTO) {
        Optional<Card> existingCard = cardService.getCardById(id);
        if (existingCard.isPresent()) {
            Card card = existingCard.get();
            card.setTitle(cardDTO.getTitle());
            card.setDescription(cardDTO.getDescription());
            card.setIsbn(cardDTO.getIsbn());
            card.setImageUrl(cardDTO.getImageUrl());
            card.setPageCount(cardDTO.getPageCount());
            card.setPrice(cardDTO.getPrice());   // naujas laukas
            card.setCity(cardDTO.getCity());     // naujas laukas
            if (cardDTO.getCategoryId() != null) {
                Optional<Category> categoryOptional = categoryService.getCategoryById(cardDTO.getCategoryId());
                if (categoryOptional.isPresent()) {
                    Category category = categoryOptional.get();
                    card.setCategory(category);
                } else {
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
            }
            Card updatedCard = cardService.saveCard(card);
            cardDTO.setId(updatedCard.getId());
            return new ResponseEntity<>(cardDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public List<CardDTO> getAllCards() {
        List<Card> cards = cardService.getAllCards();
        return cards.stream()
                .map(card -> new CardDTO(
                        card.getId(),
                        card.getTitle(),
                        card.getDescription(),
                        card.getIsbn(),
                        card.getImageUrl(),
                        card.getPageCount(),
                        card.getPrice(),   // naujas laukas
                        card.getCity(),    // naujas laukas
                        card.getCategory().getId(),  // categoryId
                        card.getCategory().getName() // categoryName
                ))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Card> getCardById(@PathVariable Long id) {
        Optional<Card> card = cardService.getCardById(id);
        return card.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCard(@PathVariable Long id) {
        cardService.deleteCard(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Card>> getCardsByCategoryId(@PathVariable Long categoryId) {
        List<Card> cards = cardService.getCardsByCategoryId(categoryId);
        return new ResponseEntity<>(cards, HttpStatus.OK);
    }

    @GetMapping("/{cardId}/comments")
    public ResponseEntity<List<Comment>> getCommentsForCard(@PathVariable Long cardId) {
        Optional<Card> card = cardService.getCardById(cardId);
        if (card.isPresent()) {
            List<Comment> comments = card.get().getComments();
            return new ResponseEntity<>(comments, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{cardId}/comments")
    public ResponseEntity<Comment> addCommentToCard(@PathVariable Long cardId, @RequestBody CommentDTO commentDTO) {
        Optional<Card> cardOptional = cardService.getCardById(cardId);
        if (cardOptional.isPresent()) {
            Card card = cardOptional.get();

            // Sukuriame Comment objektą iš CommentDTO
            Comment comment = new Comment();
            comment.setContent(commentDTO.getContent());
            // Galite pridėti kitus laukus pagal poreikį

            // Pridedame komentarą prie kortelės
            card.addComment(comment);

            // Išsaugome komentarą
            Comment createdComment = commentService.saveComment(comment);

            // Grąžiname sukurtą komentarą ir HTTP statusą CREATED
            return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
        } else {
            // Grąžiname HTTP statusą NOT_FOUND, jei kortelė nerasta
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
