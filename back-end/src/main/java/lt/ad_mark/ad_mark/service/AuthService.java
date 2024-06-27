package lt.ad_mark.ad_mark.service;

import lt.ad_mark.ad_mark.dto.LoginDto;
import lt.ad_mark.ad_mark.dto.RegisterDto;

public interface AuthService {
    String register (RegisterDto registerDto);

    String login(LoginDto loginDto);
}
