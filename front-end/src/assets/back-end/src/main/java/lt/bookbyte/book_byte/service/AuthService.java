package lt.bookbyte.book_byte.service;

import lt.bookbyte.book_byte.dto.LoginDto;
import lt.bookbyte.book_byte.dto.RegisterDto;

public interface AuthService {
    String register (RegisterDto registerDto);

    String login(LoginDto loginDto);
}
