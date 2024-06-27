package lt.ad_mark.ad_mark.controller;

import lombok.AllArgsConstructor;
import lt.ad_mark.ad_mark.dto.JwtAuthResponse;
import lt.ad_mark.ad_mark.dto.LoginDto;
import lt.ad_mark.ad_mark.dto.RegisterDto;
import lt.ad_mark.ad_mark.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthService authService;

    //Build Register API

    @PostMapping("/register")
    public ResponseEntity<String> register (@RequestBody RegisterDto registerDto){
      String response = authService.register(registerDto);
        return  new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    //Build Login REST API

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login (@RequestBody LoginDto loginDto ){
        String token = authService.login(loginDto);
        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setAccessToken(token);

        return  new ResponseEntity<>(jwtAuthResponse, HttpStatus.OK);
    }
}
