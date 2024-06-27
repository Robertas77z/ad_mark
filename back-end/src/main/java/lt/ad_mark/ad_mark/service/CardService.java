package lt.ad_mark.ad_mark.service;

import lt.ad_mark.ad_mark.repository.CardRepository;
import lt.ad_mark.ad_mark.entity.Card;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CardService {

    private final CardRepository cardRepository;

    @Autowired
    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    public Card saveCard(Card card) {
        return cardRepository.save(card);
    }

    public Optional<Card> getCardById(Long id) {
        return cardRepository.findById(id);
    }

    public List<Card> getAllCards() {
        return cardRepository.findAll();
    }

    public void deleteCard(Long id) {
        cardRepository.deleteById(id);
    }

    public List<Card> getCardsByCategoryId(Long categoryId) {
        return cardRepository.findByCategoryId(categoryId);
    }
}
