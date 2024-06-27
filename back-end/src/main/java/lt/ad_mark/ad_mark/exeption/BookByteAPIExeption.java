package lt.ad_mark.ad_mark.exeption;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class BookByteAPIExeption extends  RuntimeException{
    private HttpStatus status;
    private String message;
}
