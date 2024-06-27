package lt.ad_mark.ad_mark.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentDTO {
    private Long id;
    private String content;
    private Long cardId; // Pakeista iš bookId į cardId

    @Override
    public String toString() {
        return "CommentDTO{" +
                "id=" + id +
                ", content='" + content + '\'' +
                ", cardId=" + cardId + // Pakeista iš bookId į cardId
                '}';
    }
}
